//Menu-burger

const menuBurger = document.querySelector(".menu-burger");
const menu = document.querySelector(".header__menu");
const menuLinks = document.querySelectorAll(".menu__link");
const header = document.querySelector(".header");
const buttonsMoved = document.querySelector(".buttons__moved");
const headerButtons = document.querySelector(".header__buttons");

const body = document.body;

let interval;

menuBurger.addEventListener("click", () => {
  menuBurger.classList.toggle("active");
  menu.classList.toggle("active");
  body.classList.toggle("active");
});

function closeMenu() {
  menuBurger.classList.remove("active");
  menu.classList.remove("active");
  body.classList.remove("active");
}

function moveHeaderButtons() {
  if (window.innerWidth < 560) {
    if (!menu.contains(headerButtons)) {
      menu.appendChild(headerButtons);
    }
  } else {
    if (!buttonsMoved.contains(headerButtons)) {
      buttonsMoved.appendChild(headerButtons);
    }
  }
}

menuLinks.forEach((menuLink) => {
  menuLink.addEventListener("click", closeMenu);
});

window.addEventListener("scroll", () => {
  clearInterval(interval);

  interval = setInterval(() => {
    if (window.scrollY > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }, 10);
});

window.addEventListener("resize", moveHeaderButtons);
moveHeaderButtons();

//==================================================================

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".section-one");
  const image = document.querySelector(".section-one__image img");
  const maxTranslate = 70;

  image.style.transform = "translateY(0%)";
  image.style.transition = "transform 0.3s ease-out";

  let lastScrollY = window.scrollY;
  let isInitial = true;

  const updateImagePosition = () => {
    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const currentScrollY = window.scrollY;

    const scrollingDown = currentScrollY > lastScrollY;
    lastScrollY = currentScrollY;

    if (isInitial && currentScrollY === 0) {
      image.style.transform = "translateY(0%)";
      isInitial = false;
      return;
    }

    if (rect.bottom < 0) {
      image.style.transform = "translateY(0%)";
      return;
    }

    if (rect.top > windowHeight) {
      image.style.transform = `translateY(-${maxTranslate}%)`;
      return;
    }

    const visibleTop = Math.max(rect.top, 0);
    const visibleBottom = Math.min(rect.bottom, windowHeight);
    const visibleHeight = visibleBottom - visibleTop;
    const visibility = visibleHeight / rect.height;

    if (!scrollingDown) {
      const returnToZero = 1 - visibility;
      const translateY = -maxTranslate * returnToZero;
      image.style.transform = `translateY(${translateY}%)`;
    } else {
      const progress = 1 - visibility;
      const translateY = -maxTranslate * progress;
      image.style.transform = `translateY(${translateY}%)`;
    }
  };

  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateImagePosition();
        ticking = false;
      });
      ticking = true;
    }
  });

  setTimeout(() => {
    image.style.transform = "translateY(0%)";
    updateImagePosition();
  }, 100);

  window.addEventListener("load", () => {
    image.style.transform = "translateY(0%)";
    isInitial = true;
    lastScrollY = window.scrollY;
    updateImagePosition();
  });
});
