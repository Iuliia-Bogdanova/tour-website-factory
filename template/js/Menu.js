export default function initMobileMenu() {
    document.addEventListener("DOMContentLoaded", () => {
        const menuBtn = document.querySelector(".header__menu-btn"); // Статичная кнопка
        const scrollMenuBtn = document.getElementById("scroll-menu-btn"); // Фиксированная кнопка
        const closeBtn = document.querySelector(".header__menu-close");
        const mobileMenu = document.getElementById("menu-mobile");
        const overlay = document.getElementById("overlay");
        const body = document.body;
        const menuLinks = mobileMenu.querySelectorAll("a");

        if (
            !menuBtn ||
            !scrollMenuBtn ||
            !mobileMenu ||
            !closeBtn ||
            !overlay ||
            !menuLinks
        )
            return;

        // Закрыть меню
        function closeMenu() {
            mobileMenu.classList.remove("active");
            overlay.classList.remove("active");
            body.classList.remove("menu-open");
        }

        // Открыть меню
        function openMenu() {
            mobileMenu.classList.add("active");
            overlay.classList.add("active");
            body.classList.add("menu-open");
        }

        // Добавляем обработчики для обеих кнопок
        menuBtn.addEventListener("click", openMenu);
        scrollMenuBtn.addEventListener("click", openMenu);

        // Закрытие меню
        closeBtn.addEventListener("click", closeMenu);
        overlay.addEventListener("click", closeMenu);

        // Закрытие при клике по ссылке
        menuLinks.forEach((link) => {
            link.addEventListener("click", (event) => {
                if (link.getAttribute("href").startsWith("#")) {
                    event.preventDefault();
                    const targetElement = document.querySelector(
                        link.getAttribute("href")
                    );
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

        // Логика появления и исчезновения кнопки при скролле
        window.addEventListener("scroll", () => {
            const scrollTop = window.scrollY;
            const windowHeight = window.innerHeight;
            const totalHeight = document.body.scrollHeight;

            if (
                scrollTop > 350 &&
                scrollTop + windowHeight < totalHeight - 350
            ) {
                scrollMenuBtn.classList.add("visible");
            } else {
                scrollMenuBtn.classList.remove("visible");
            }
        });
    });
}
