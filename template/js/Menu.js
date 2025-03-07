export default function initMobileMenu() {
    document.addEventListener("DOMContentLoaded", () => {
        const menuBtn = document.querySelector(".header__menu-btn");
        const closeBtn = document.querySelector(".header__menu-close");
        const mobileMenu = document.getElementById("menu-mobile");
        const overlay = document.getElementById("overlay");
        const body = document.body;
        const menuLinks = mobileMenu.querySelectorAll("a"); // Все ссылки в меню

        if (!menuBtn || !mobileMenu || !closeBtn || !overlay || !menuLinks)
            return;

        // Закрыть меню
        function closeMenu() {
            mobileMenu.classList.remove("active");
            overlay.classList.remove("active");
            body.classList.remove("menu-open");
        }

        // Открыть меню
        menuBtn.addEventListener("click", () => {
            mobileMenu.classList.add("active");
            overlay.classList.add("active");
            body.classList.add("menu-open");
        });

        // Закрыть кнопкой
        closeBtn.addEventListener("click", closeMenu);

        // Закрыть оверлеем
        overlay.addEventListener("click", closeMenu);

        // Закрыть кликом по ссылке
        menuLinks.forEach((link) => {
            link.addEventListener("click", (event) => {
                // Проверить является ли якорной
                if (link.getAttribute("href").startsWith("#")) {
                    event.preventDefault(); // Отменить стандартный переход для плавного скролла
                    const targetId = link.getAttribute("href");
                    const targetElement = document.querySelector(targetId);

                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop,
                            behavior: "smooth",
                        });
                    }
                }
                closeMenu();
            });
        });
    });
}
