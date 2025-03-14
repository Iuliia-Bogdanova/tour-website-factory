export default function initPlanetsAnimation() {
    document.addEventListener("DOMContentLoaded", () => {
        const aboutSection = document.querySelector(".about");
        const toursSection = document.querySelector(".tours");
        const whyAsSection = document.querySelector(".why-us");
        const historySection = document.querySelector(".history");
        const historyWrapperSection =
            document.querySelector(".history__wrapper");
        const startSection = document.querySelector(".start");
        let lastScrollY = window.scrollY;

        window.addEventListener("scroll", () => {
            if (window.innerWidth >= 640) {
                const currentScrollY = window.scrollY;
                if (currentScrollY > lastScrollY) {
                    // Скролл вниз
                    aboutSection.classList.add("scrolling-down");
                    aboutSection.classList.remove("scrolling-up");
                    toursSection.classList.add("scrolling-down");
                    toursSection.classList.remove("scrolling-up");
                    whyAsSection.classList.add("scrolling-down");
                    whyAsSection.classList.remove("scrolling-up");
                    historySection.classList.add("scrolling-down");
                    historySection.classList.remove("scrolling-up");
                    historyWrapperSection.classList.add("scrolling-down");
                    historyWrapperSection.classList.remove("scrolling-up");
                    startSection.classList.add("scrolling-down");
                    startSection.classList.remove("scrolling-up");
                } else {
                    // Скролл вверх
                    aboutSection.classList.add("scrolling-up");
                    aboutSection.classList.remove("scrolling-down");
                    toursSection.classList.add("scrolling-up");
                    toursSection.classList.remove("scrolling-down");
                    whyAsSection.classList.add("scrolling-up");
                    whyAsSection.classList.remove("scrolling-down");
                    historySection.classList.add("scrolling-up");
                    historySection.classList.remove("scrolling-down");
                    historyWrapperSection.classList.add("scrolling-up");
                    historyWrapperSection.classList.remove("scrolling-down");
                    startSection.classList.add("scrolling-up");
                    startSection.classList.remove("scrolling-down");
                }
                lastScrollY = currentScrollY;
            }
        });
    });
}
