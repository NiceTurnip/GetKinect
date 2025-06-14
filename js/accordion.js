document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".accordion__items__item");
  items.forEach(item => {
    const container = item.querySelector(".accordion__items__item__question");
    const button = item.querySelector(".accordion__items__item__question-button");
    const answer = item.querySelector(".accordion__items__item-answer");
    const plusIcon = item.querySelector(".icon-plus");
    const minusIcon = item.querySelector(".icon-minus");

    container.addEventListener("click", () => {
      const isExpanded = container.getAttribute("aria-expanded") === "true";

      // Collapse all items (optional)
      document.querySelectorAll(".accordion__items__item").forEach(el => {
        el.querySelector(".accordion__items__item__question").setAttribute("aria-expanded", "false");
        //el.querySelector(".accordion__items__item__question-button").setAttribute("aria-expanded", "false");
        el.querySelector(".accordion__items__item-answer").setAttribute("hidden", true);
        el.querySelector(".icon-plus").hidden = false;
        el.querySelector(".icon-minus").hidden = true;
      });

      // Toggle current item
      if (!isExpanded) {
        container.setAttribute("aria-expanded", "true");
        answer.removeAttribute("hidden");
        plusIcon.hidden = true;
        minusIcon.hidden = false;
      }
    });
  });
});

