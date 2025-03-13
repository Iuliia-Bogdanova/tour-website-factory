export default function initPlanetsAnimation() {
    document.addEventListener("DOMContentLoaded", () => {
        const aboutSection = document.querySelector(".about");
        const whyAsSection = document.querySelector(".why-us");
        let lastScrollY = window.scrollY;

        window.addEventListener("scroll", () => {
            if (window.innerWidth >= 640) {
                const currentScrollY = window.scrollY;
                if (currentScrollY > lastScrollY) {
                    // Скролл вниз
                    aboutSection.classList.add("scrolling-down");
                    aboutSection.classList.remove("scrolling-up");
                    whyAsSection.classList.add("scrolling-down");
                    whyAsSection.classList.remove("scrolling-up");
                } else {
                    // Скролл вверх
                    aboutSection.classList.add("scrolling-up");
                    aboutSection.classList.remove("scrolling-down");
                    whyAsSection.classList.add("scrolling-up");
                    whyAsSection.classList.remove("scrolling-down");
                }
                lastScrollY = currentScrollY;
            }
        });
    });
}
