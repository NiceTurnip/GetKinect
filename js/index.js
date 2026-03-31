// main.js
import { animate } from "animejs";

document.addEventListener("DOMContentLoaded", () => {
  const mainNavbar = document.querySelector(".main-nav");
  const headerContent = document.querySelector(".header");
  const pageHeader = document.querySelector(".pageHeader");

  const mobileNav = document.querySelector(".mobile-nav");
  const mobileBtn = document.querySelector(".mobile-button");
  const mobileOptions = document.querySelectorAll(".mobile-option");
  const xIcon = document.querySelector(".x-icon");


  // Grab any page wrappers that exist on this page, then drop nulls
  const pages = [
    document.querySelector(".indexPage"),
    document.querySelector(".pricingPage"),
    document.querySelector(".contactPage"),
    document.querySelector(".bookingPage"),
    document.querySelector(".featuresPage"),
    document.querySelector(".blogPage"),
    document.querySelector(".blogCategories"),
    document.querySelector(".post"),
    document.querySelector(".legal"),
  ].filter(Boolean);

  const fadeIn = (el, { delay = 500, duration = 1500 } = {}) => {

    if (!el) return;
    
    if (el.dataset.animated === "true") return;
    el.dataset.animated = "true";

    // Make visible before animating
    el.style.visibility = "visible";

    animate(el, {
      opacity: [0, 1],
      delay,
      duration,
      easing: "easeInSine",
    });
  };

  const animateNav = (open = true) => {
    if (!mobileNav) return;

    animate(mobileNav, {
      opacity: open ? [0, 1] : [1, 0],
      translateX: open ? ["100%", 0] : [0, "100%"],
      duration: 150,
      easing: open ? "easeOutSine" : "easeInSine",
    });
  };

  const scaleFadeOut = (el) => {
    if (!el) return;

    // hide at the start of the animation (matches what you wrote)
    el.style.display = "none";

    animate(el, {
      opacity: [1, 0],
      scale: ["100%", 0],
      duration: 300,
      easing: "easeOutSine",
    });
  };

  const scaleFadeIn = (el, display = "flex") => {
    if (!el) return;

    el.style.display = display;

    animate(el, {
      scale: [0, "100%"],
      opacity: [0, 1],
      duration: 300,
      easing: "easeInSine",
    });
  };

  if (mobileNav && mobileBtn && xIcon) {
    mobileBtn.addEventListener("click", () => {
      mobileNav.style.display = "flex";
      animateNav(true);
      scaleFadeOut(mobileBtn);
      scaleFadeIn(xIcon, "flex");
    });

    xIcon.addEventListener("click", () => {
      animateNav(false);
      scaleFadeOut(xIcon);
      scaleFadeIn(mobileBtn, "flex");
      setTimeout(() => (mobileNav.style.display = "none"), 150);
    });

    mobileOptions.forEach((el) => {
      el.addEventListener("click", () => {
        animateNav(false);
        scaleFadeOut(xIcon);
        scaleFadeIn(mobileBtn, "flex");
        setTimeout(() => (mobileNav.style.display = "none"), 150);
      });
    });
  }

  pages.forEach((page) => fadeIn(page));
  fadeIn(mainNavbar);
  fadeIn(headerContent || pageHeader);
});
