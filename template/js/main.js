import initMobileMenu from "./Menu.js";
import initSpaceAnimation from "./SpaceAnimation.js";
import initPlanetsAnimation from "./PlanetsAnimation.js";

initMobileMenu();
initSpaceAnimation();
initPlanetsAnimation();

// document.addEventListener("DOMContentLoaded", () => {
//     const aboutSection = document.querySelector(".about");
//     let lastScrollY = window.scrollY;

//     window.addEventListener("scroll", () => {
//         if (window.innerWidth >= 640) {
//             const currentScrollY = window.scrollY;
//             if (currentScrollY > lastScrollY) {
//                 // Скроллим вниз
//                 aboutSection.classList.add("scrolling-down");
//                 aboutSection.classList.remove("scrolling-up");
//             } else {
//                 // Скроллим вверх
//                 aboutSection.classList.add("scrolling-up");
//                 aboutSection.classList.remove("scrolling-down");
//             }
//             lastScrollY = currentScrollY;
//         }
//     });
// });

//
