// main.js
import { animate } from "animejs";

document.addEventListener("DOMContentLoaded", () => {
  const mainNavbar = document.querySelector(".main-nav");
  const headerContent = document.querySelector(".header");
  const pageHeader = document.querySelector(".pageHeader");

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

  pages.forEach((page) => fadeIn(page));
  fadeIn(mainNavbar);
  fadeIn(headerContent || pageHeader);
});
