import { animate } from "animejs";

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isMobile = window.matchMedia("(max-width: 768px)").matches;

const getFinalOpacity = (el) => {
  // Prefer explicit attributes if provided
  const mobileVal = el.dataset.opacMobile;
  const desktopVal = el.dataset.opac;

  // Choose based on breakpoint
  const chosen = (isMobile && mobileVal != null) ? mobileVal : (desktopVal ?? "1");

  const num = Number(chosen);
  return Number.isFinite(num) ? num : 1;
};

const runAnimation = (el) => {
  const type = el.dataset.animate || "slide-up";
  const finalOpacity = getFinalOpacity(el);

  if (el.dataset.animated === "true") return;
  el.dataset.animated = "true";

  const base = {
    opacity: [0, finalOpacity],
    duration: 900,
    easing: "easeOutCubic",
  };

  switch (type) {
    case "fade-in":
      animate(el, { ...base });
      break;
    case "slide-left":
      animate(el, { ...base, translateX: [-64, 0] });
      break;
    case "slide-right":
      animate(el, { ...base, translateX: [64, 0] });
      break;
    case "slide-up":
    default:
      animate(el, { ...base, translateY: [32, 0] });
      break;
  }
};

export const initScrollAnimations = () => {
  const targets = document.querySelectorAll("[data-animate]");
  if (!targets.length) return;

  if (prefersReducedMotion) {
    targets.forEach((el) => {
      // respect mobile/desktop final opacity even in reduced motion
      el.style.opacity = String(getFinalOpacity(el));
      el.style.transform = "none";
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        runAnimation(entry.target);
        obs.unobserve(entry.target);
      });
    },
    { root: null, threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
  );

  targets.forEach((el) => observer.observe(el));
};

document.addEventListener("DOMContentLoaded", () => {
  initScrollAnimations();

  const slideInLeft = (el, { delay = 500, duration = 1500, offset = "-100%" } = {}) => {
    if (!el) return;
    animate(el, { translateX: [offset, 0], delay, duration, easing: "easeInSine" });
  };

  const headerContentsH1 = document.querySelector(".header__contents__text-h1");
  const headerContentsBlurb = document.querySelector(".header__contents__text-blurb");
  const headerContentsButton = document.querySelector(".header__contents-button");

  slideInLeft(headerContentsH1);
  slideInLeft(headerContentsBlurb, { delay: 750 });
  slideInLeft(headerContentsButton, { delay: 1000 });
});
