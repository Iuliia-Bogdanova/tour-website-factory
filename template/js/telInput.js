export default function initTelInput(inputSelector) {
    const input = document.querySelector(inputSelector);
    if (input) {
        const iti = window.intlTelInput(input, {
            initialCountry: "ru", // Страна по умолчанию
            separateDialCode: true, // Показать код страны отдельно
            preferredCountries: ["ru", "us", "gb"], // Предпочтительные страны (первые в списке) - не работает
            utilsScript: "/template/js/utils.js", // Скрипт утилит
            formatOnDisplay: true, // Автоматическое форматирование
            nationalMode: false, // Использовать международный формат
            autoPlaceholder: "polite", // Автоформат плейсхолдера - не работает, ниже обработчик номера для рф
        });

        function updatePlaceholder() {
            const countryData = iti.getSelectedCountryData();
            if (countryData.iso2 === "ru") {
                input.setAttribute("placeholder", "(999) 999-99-99");
            } else {
                input.setAttribute("placeholder", "Введите номер");
            }
        }

        function resetInput() {
            input.value = ""; // Очистить поле при смене страны
            updatePlaceholder(); // Обновить плейсхолдер
        }

        updatePlaceholder(); // Установить плейсхолдер при загрузке страницы

        input.addEventListener("countrychange", resetInput); // Сбросить номер при смене страны

        // Обработчик ввода номера для рф
        input.addEventListener("input", () => {
            const countryData = iti.getSelectedCountryData();
            let value = input.value.replace(/\D/g, ""); // Очистить от всего, кроме цифр

            if (countryData.iso2 === "ru") {
                // Применить маску для номера рф без +7
                if (value.length <= 3) {
                    value = value.replace(/(\d{1,3})/, "($1)");
                } else if (value.length <= 6) {
                    value = value.replace(/(\d{3})(\d{1,3})/, "($1) $2");
                } else if (value.length <= 8) {
                    value = value.replace(
                        /(\d{3})(\d{3})(\d{1,2})/,
                        "($1) $2-$3"
                    );
                } else {
                    value = value.replace(
                        /(\d{3})(\d{3})(\d{2})(\d{2})/,
                        "($1) $2-$3-$4"
                    );
                }
            }

            input.value = value; // Устанавить отформатированное значение
        });
    }
}
