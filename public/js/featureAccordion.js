document.addEventListener("DOMContentLoaded", () => {
    const featureAccordions = document.querySelectorAll(".feature-accordion");
  
    featureAccordions.forEach(accordion => {
      const items = accordion.querySelectorAll(".accordion__item");
  
      items.forEach(item => {
        const button = item.querySelector(".accordion__item__header");
        const content = item.querySelector(".accordion__item__content");
        const plusIcon = item.querySelector(".icon-plus");
        const minusIcon = item.querySelector(".icon-minus");
  
        button.addEventListener("click", () => {
          const isExpanded = button.getAttribute("aria-expanded") === "true";
  
          // Collapse all items in this accordion
          items.forEach(el => {
            el.querySelector(".accordion__item__header").setAttribute("aria-expanded", "false");
            el.querySelector(".accordion__item__content").setAttribute("hidden", true);
            el.querySelector(".icon-plus").hidden = false;
            el.querySelector(".icon-minus").hidden = true;
          });
  
          // Expand the clicked one (if it wasn't already open)
          if (!isExpanded) {
            button.setAttribute("aria-expanded", "true");
            content.removeAttribute("hidden");
            plusIcon.hidden = true;
            minusIcon.hidden = false;
          }
        });
      });
    });
  });
  