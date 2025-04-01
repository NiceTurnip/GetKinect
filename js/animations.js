const allButtons = document.querySelectorAll(".spinButton");

let buttons = [];

class button {
    constructor(targetBtn, text, icon, btnWrap) {
        this.targetBtn = targetBtn;
        this.text = text;
        this.icon = icon;     
        this.btnWrap = btnWrap
    }
}

allButtons.forEach( btn => {   
    const btnWrap = btn.querySelector('.button-wrap-button')
    const btnText = btn.querySelector('.button-wrap-button-text');
    const btnIcon = btn.querySelector('.button-wrap-button-image');
        
    //I had to invert the btnWrap and btn variables that are passed
    //into the constructor to solve the hover issue.
    newButton = new button(btnWrap, btnText, btnIcon, btn);
    buttons.push(newButton);
});

buttons.forEach(btn => {
    btn.btnWrap.addEventListener('mouseenter', e =>  {
        setTimeout(() => {
            btnHover(btn);
        }, 200);   
    });
    btn.btnWrap.addEventListener('touchstart', e => {
        setTimeout(() => {
            btnHover(btn);
        }, 200)  ; 
    }, {passive: true});
    btn.btnWrap.addEventListener('mouseleave', e =>  {
        setTimeout(() => {
            btnLeave(btn);
        }, 200);
    });
});

function btnHover(target) {
    target.icon.style.removeProperty('transform');

    let tl = anime.timeline({
        easing: 'easeOutElastic',
        duration: 1000,
    });
    
    target.text.style.display = "none";
    target.icon.style.display = "block";

    tl.add({
        targets: target.targetBtn,
        width: '5rem',
    }, 0)
    .add({
        targets: target.icon,
        rotate: 360,
    }, 0);

    tl.restart();
}

function btnLeave(target) {
    target.icon.style.removeProperty('transform');

    let tl = anime.timeline({
        easing: 'easeOutElastic',
        duration: 1000,
    });


    tl.add({
        targets: target.icon,
        rotate: 360,
        complete: function() {
            target.icon.style.display = 'none';
        }
    }, 0)
    .add({
        targets: target.targetBtn,
        width: '17rem',
    }, 0)
    .add({
        targets: target.text,
        opacity: [0, 1],
        begin: function() {
            target.text.style.display = 'block';
        }
    }, 1000);

    tl.restart();
}