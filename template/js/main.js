import initMobileMenu from "./Menu.js";
import initSpaceAnimation from "./SpaceAnimation.js";
import initPlanetsAnimation from "./PlanetsAnimation.js";
import initToursButtons from "./ToursButtons.js";
import initArrowUp from "./ArrowUp.js";
import initTelInput from "./telInput.js";
import initMeteor from "./Meteors.js";
import initScrollNumberAnimation from "./NumberAnimation.js";

initMobileMenu();
initSpaceAnimation();
initPlanetsAnimation();
initToursButtons();
initArrowUp();
initTelInput("#phone");
initMeteor();
initScrollNumberAnimation();

const slider = document.querySelector(".slider");
const scrollbarThumb = document.querySelector(".scrollbar-thumb");

slider.addEventListener("scroll", () => {
    const scrollPercentage =
        slider.scrollLeft / (slider.scrollWidth - slider.clientWidth);
    scrollbarThumb.style.transform = `translateX(${scrollPercentage * 100}%)`;
});

// Поддержка скролла колесом мыши
slider.addEventListener("wheel", (e) => {
    e.preventDefault();
    slider.scrollLeft += e.deltaY;
});
