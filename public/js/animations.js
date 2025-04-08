const allButtons = document.querySelectorAll(".spinButton");

let buttons = [];

class Button {
  constructor(targetBtn, text, icon, btnWrap) {
    this.targetBtn = targetBtn;
    this.text = text;
    this.icon = icon;
    this.btnWrap = btnWrap;
    this.timeline = null; // Store animation timeline here
  }
}

allButtons.forEach(btn => {
  const btnWrap = btn.querySelector('.button-wrap-button');
  const btnText = btn.querySelector('.button-wrap-button-text');
  const btnIcon = btn.querySelector('.button-wrap-button-image');

  const newButton = new Button(btnWrap, btnText, btnIcon, btn);
  btnText.classList.add("visible"); // Start with text visible
  buttons.push(newButton);
});

buttons.forEach(btn => {
  btn.btnWrap.addEventListener('mouseenter', () => {
    clearTimeout(btn.leaveTimeout); // Prevent leave delay if hovering again
    btn.enterTimeout = setTimeout(() => btnHover(btn), 200);
  });

  btn.btnWrap.addEventListener('touchstart', () => {
    btnHover(btn);
  }, { passive: true });

  btn.btnWrap.addEventListener('mouseleave', () => {
    clearTimeout(btn.enterTimeout); // Cancel enter animation if leaving early
    btn.leaveTimeout = setTimeout(() => btnLeave(btn), 200);
  });
});

function btnHover(target) {
  // Cancel ongoing animation
  if (target.timeline) target.timeline.pause();

  target.icon.classList.add('visible');
  target.text.classList.remove('visible');
  target.icon.style.removeProperty('transform');

  const tl = anime.timeline({
    easing: 'easeOutElastic',
    duration: 1000,
  });

  tl.add({
    targets: target.targetBtn,
    width: '5rem',
  }, 0)
    .add({
      targets: target.icon,
      rotate: 360,
    }, 0);

  target.timeline = tl;
}

function btnLeave(target) {
  if (target.timeline) target.timeline.pause();

  target.icon.style.removeProperty('transform');

  const tl = anime.timeline({
    easing: 'easeOutElastic',
    duration: 1000,
  });

  tl.add({
    targets: target.icon,
    rotate: 360,
    complete: function () {
      target.icon.classList.remove('visible');
    }
  }, 0)
    .add({
      targets: target.targetBtn,
      width: '17rem',
    }, 0)
    .add({
      targets: target.text,
      opacity: [0, 1],
      begin: function () {
        target.text.classList.add('visible');
      }
    }, 1000);

  target.timeline = tl;
}
