document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.querySelector(".header__menu-btn");
    const mobileMenu = document.getElementById("header-menu");

    menuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("active");
    });
});
