import Countdown from "./lib/countDown-ts";
const Swiper = require("swiper");
const WOW = require("wowjs");
const Blazy = require("blazy");
import "../node_modules/swiper/css/swiper.css";
import "./scss/index.scss";
import "./scss/lib/countDown.scss";

(window as any).global = window;

new Swiper.default(".swiper0-container", {
  loop: true,
  autoHeight: true,
  autoplay: {
    delay: 20000
  },
  slidesPerView: 1,
  pagination: {
    el: ".swiper0-pagination",
    clickable: true
  },
  navigation: {
    nextEl: ".swiper0-button-next",
    prevEl: ".swiper0-button-prev"
  }
});
new Swiper.default(".swiper1-container", {
  loop: true,
  utoHeight: false,
  autoplay: {
    delay: 5000
  },
  pagination: {
    el: ".swiper1-pagination",
    clickable: true
  },
  navigation: {
    nextEl: ".swiper1-button-next",
    prevEl: ".swiper1-button-prev"
  }
});
const cd = new Countdown({
  cont: document.querySelector(".container-timer"),
  date: window["SETDATE"],
  endCallback: null,
  outputFormat: "day|hour|minute|second"
});
cd.start();

const wow = new WOW.WOW({
  live: false
});
wow.init();

const modalTriggers = document.querySelectorAll(".popup-trigger");
const modalCloseTrigger = document.querySelector(".js-close-modal");
// const bodyBlackout = document.querySelector(".body-blackout");

modalTriggers.forEach(trigger => {
  trigger.addEventListener("click", () => {
    const { popupTrigger } = (trigger as HTMLElement).dataset;

    const popupModal = document.querySelector(
      `[data-popup-modal="${popupTrigger}"]`
    );
    const bodyBlackout = popupModal.querySelector(".body-blackout");
    popupModal.classList.add("active");
    bodyBlackout.classList.add("active");

    if (popupTrigger === "one") {
      document.querySelector("#modal-form").children[0].textContent =
        trigger.parentElement.parentElement.children[0].textContent;
      const p: HTMLInputElement = <HTMLInputElement>(
        document.querySelector("#modal-form").children[1]
      );
      p.value = trigger.parentElement.parentElement.children[0].textContent;
    }

    popupModal
      .querySelector(".js-close-modal")
      .addEventListener("click", () => {
        popupModal.classList.remove("active");
        bodyBlackout.classList.remove("active");
      });

    bodyBlackout.addEventListener("click", () => {
      // TODO: Turn into a function to close modal
      popupModal.classList.remove("active");
      bodyBlackout.classList.remove("active");
    });
  });
});

const anchors = document.querySelectorAll('a[href*="#"]');

for (let anchor of anchors) {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();

    const blockID = anchor.getAttribute("href").substr(1);

    document.getElementById(blockID).scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
}
window.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector(".menu"),
    menuItem = document.querySelectorAll(".menu__item"),
    hamburger = document.querySelector(".hamburger"),
    form = document.querySelector("#consultation-form");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("hamburger_active");
    menu.classList.toggle("menu_active");
  });
  form.addEventListener("click", () => {
    hamburger.classList.toggle("hamburger_active");
    menu.classList.toggle("menu_active");
  });
  function addListenerMulti(element, eventNames, listener) {
    let events = eventNames.split(" ");
    for (let i = 0, iLen = events.length; i < iLen; i++) {
      element.addEventListener(events[i], listener, false);
    }
  }

  addListenerMulti(window, "scroll touchmove", function() {
    if (hamburger.classList.contains("hamburger_active")) {
      hamburger.classList.remove("hamburger_active");
    }
    if (menu.classList.contains("menu_active")) {
      menu.classList.remove("menu_active");
    }
  });

  menuItem.forEach(item => {
    item.addEventListener("click", () => {
      hamburger.classList.toggle("hamburger_active");
      menu.classList.toggle("menu_active");
    });
  });
});

new Blazy({
  loadInvisible: true,
  success: function(element) {
    setTimeout(function() {
      // We want to remove the loader gif now.
      // First we find the parent container
      // then we remove the "loading" class which holds the loader image
      var parent = element.parentNode;
      parent.className = parent.className.replace(/\bloading\b/, "");
    }, 200);
  }
});
