import { animate } from "animejs";

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isMobile = window.matchMedia("(max-width: 768px)").matches;

const getFinalOpacity = (el) => {
  const mobileVal = el.dataset.opacMobile;
  const desktopVal = el.dataset.opac;

  const chosen = (isMobile && mobileVal != null) ? mobileVal : (desktopVal ?? "1");
  const num = Number(chosen);
  return Number.isFinite(num) ? num : 1;
};

const runAnimation = (el) => {
  if (!el) return;

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
      el.style.opacity = String(getFinalOpacity(el));
      // Don't force transform none unless you 100% never rely on transforms for layout.
      // el.style.transform = "none";
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

const bounceForever = (el, { height = 12 } = {}) => {
  if (!el) return;
  if (prefersReducedMotion) return;
  if (el.dataset.bouncing === "true") return;
  el.dataset.bouncing = "true";

  // This format matches the error you're seeing (library expects params.keyframes)
  animate(el, {
    keyframes: [
      { translateY: -12, duration: 500, easing: "easeOutQuad" },
      { translateY: -12, duration: 180, easing: "linear" },
      { translateY: 0, duration: 750, easing: "easeInQuad" }
    ],
    loop: true
  });




};

document.addEventListener("DOMContentLoaded", () => {
  initScrollAnimations();

  const downtrendBox = document.querySelector(".downtrend-box");
  bounceForever(downtrendBox, { height: 12 });
});
