// Mobile Menu Functionality
const mainNavbar = document.querySelector(".main-nav");
const mobileNav = document.querySelector(".mobile-nav");
const mobileBtn = document.querySelector(".mobile-button");
const xIcon = document.querySelector(".x-icon");

// Pages / Headers for Animation
const indexPage = document.querySelector(".indexPage");

const headerContent = document.querySelector(".header");
const pageHeader = document.querySelector(".pageHeader");

const pageList = [indexPage];

if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('data-theme', 'normal');
} else {
    document.documentElement.setAttribute('data-theme', 'normal');
}

function fadeInFunction(element) {
    anime({
        targets: [element],
        opacity: [0, 1],
        delay: 500,
        duration: 1500,
        easing: 'easeInSine',
    });
}

function openMobileNav() {
    anime({
        targets: [mobileNav],
        opacity: [0, 1],
        scale: [0, 1],
        duration: 150,
        easing: 'easeOutSine', 
    })
}
function closeMobileNav() {
    anime({
        targets: [mobileNav],
        opacity: [1, 0],
        scale: [1, 0],
        duration: 150,
        easing: 'easeInSine', 
    })
}

if(xIcon) {
    xIcon.addEventListener("click", e => {
        closeMobileNav();
        setTimeout(() => {
            mobileNav.style.display = "none";
        }, 150);
    });
    mobileBtn.addEventListener("click", e => {
        mobileNav.style.display = "flex";
        openMobileNav();
    });
}

window.onload = () => {
    for(let i = 0; i < pageList.length; i++) {
        if(pageList[i]) {
            pageList[i].style.visibility = 'visible';
            fadeInFunction(pageList[i]);

            if(mainNavbar) {
                mainNavbar.style.visibility = "visible";
                fadeInFunction(mainNavbar);     
            }

            if(headerContent) {
                headerContent.style.visibility = "visible";
                fadeInFunction(headerContent);
            } else if(pageHeader) {
                pageHeader.style.visibility = "visible";
                fadeInFunction(pageHeader);
            }
        }
    }

    console.log("PAGE LOAD");
}
