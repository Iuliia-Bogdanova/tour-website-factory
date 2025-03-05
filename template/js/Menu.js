export default function initMobileMenu() {
    document.addEventListener("DOMContentLoaded", () => {
        const menuBtn = document.querySelector(".header__menu-btn");
        const closeBtn = document.querySelector(".header__menu-close");
        const mobileMenu = document.getElementById("header-menu");
        const overlay = document.getElementById("overlay");
        const body = document.body;

        if (!menuBtn || !mobileMenu || !closeBtn || !overlay) return;

        // Открыть меню
        menuBtn.addEventListener("click", () => {
            mobileMenu.classList.add("active");
            overlay.classList.add("active");
            body.classList.add("menu-open");

            setTimeout(() => {
                overlay.style.opacity = "1";
            }, 10);
        });

        // Закрыть кнопкой
        closeBtn.addEventListener("click", () => {
            mobileMenu.classList.remove("active");
            overlay.style.opacity = "0";

            setTimeout(() => {
                overlay.classList.remove("active");
                body.classList.remove("menu-open");
            }, 400);
        });

        // Закрыть оверлеем
        overlay.addEventListener("click", () => {
            mobileMenu.classList.remove("active");
            overlay.style.opacity = "0";

            setTimeout(() => {
                overlay.classList.remove("active");
                body.classList.remove("menu-open");
            }, 400);
        });
    });
}
