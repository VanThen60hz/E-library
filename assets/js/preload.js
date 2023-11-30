'use strict';

// Preload
const preloader = document.querySelector("[data-preaload]");

window.addEventListener("load", function () {
  preloader.classList.add("loaded");
  this.document.body.classList.add("loaded");
});

// add event listener on multiple elements

const addEventOnElement = function (elements, eventType, callBack) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callBack);
  }
}

// Navbar
const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElement(navTogglers, "click", toggleNavbar);


// Header & Back top btn
const header = document.querySelector("[data-header]");
const backToBtn = document.querySelector("[data-back-to-btn]");

let lastScrollPos = 0;

const hideHeader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;
  
  if (isScrollBottom) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  lastScrollPos = window.scrollY;
}

window.addEventListener("scroll", function () {
  if (this.window.scrollY >= 50) {
    header.classList.add("active");
    backToBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backToBtn.classList.remove("active");
  }
});