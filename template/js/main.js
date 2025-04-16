import initMobileMenu from "./Menu.js";
import initModal from "./Modal.js";
// import initSlider from "./Slider.js";
import initSpaceAnimation from "./SpaceAnimation.js";
import initArrowUp from "./ArrowUp.js";
import initTelInput from "./telInput.js";
import initMeteor from "./Meteors.js";
import initPlanetsAnimation from "./PlanetsAnimation.js";
import initScrollNumberAnimation from "./NumberAnimation.js";
import initToursButtons from "./ToursButtons.js";

initMobileMenu();
initModal();
// initSlider(); вызываем из Modal.js
initSpaceAnimation();
initArrowUp();
initTelInput("input[type='tel']");
initMeteor();
initPlanetsAnimation();
initScrollNumberAnimation();
initToursButtons();
