export default function initToursButtons() {
    const btnManned = document.getElementById("btn-manned");
    const btnCargo = document.getElementById("btn-cargo");
    const btnPeriod = document.getElementById("btn-period");

    const toursManned = document.getElementById("tours-manned");
    const toursCargo = document.getElementById("tours-cargo");
    const toursPeriod = document.getElementById("tours-period");

    function setActiveTab(button, block) {
        // Убрать класс активности с других кнопок
        btnManned.classList.remove("btn-active");
        btnCargo.classList.remove("btn-active");
        btnPeriod.classList.remove("btn-active");

        // Скрыть все блоки
        toursManned.classList.remove("active");
        toursCargo.classList.remove("active");
        toursPeriod.classList.remove("active");

        // Добавить класс активной кнопки
        button.classList.add("btn-active");

        // Отобразить соответствующий блок
        block.classList.add("active");
    }

    // Активировать btn-manned и tours__manned
    window.onload = function () {
        setActiveTab(btnManned, toursManned);
    };

    // Обработать события для кнопок
    btnManned.addEventListener("click", function (event) {
        event.preventDefault(); // Предотвратить стандартное поведение ссылки
        setActiveTab(btnManned, toursManned);
    });

    btnCargo.addEventListener("click", function (event) {
        event.preventDefault(); // Предотвратить стандартное поведение ссылки
        setActiveTab(btnCargo, toursCargo);
    });

    btnPeriod.addEventListener("click", function (event) {
        event.preventDefault(); // Предотвратить стандартное поведение ссылки
        setActiveTab(btnPeriod, toursPeriod);
    });
}
