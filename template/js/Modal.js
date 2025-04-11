export default function initModal() {
    document.addEventListener("DOMContentLoaded", () => {
        const subscribeButtons = document.querySelectorAll(
            ".trip-btn-subscribe"
        );
        const overlay = document.getElementById("overlay-subscribe");
        const modalCard = overlay.querySelector(".modal__card");
        const body = document.body;

        if (!subscribeButtons.length || !overlay || !modalCard) return;

        // Открыть
        subscribeButtons.forEach((btn) => {
            btn.addEventListener("click", () => {
                overlay.classList.add("active");
                body.classList.add("modal-open");
            });
        });

        // Закрыть по фону
        overlay.addEventListener("click", (e) => {
            if (e.target === overlay) {
                overlay.classList.remove("active");
                body.classList.remove("modal-open");
            }
        });

        // Закрыть по кнопке
        const closeBtn = overlay.querySelector(".modal-close-btn");
        if (closeBtn) {
            closeBtn.addEventListener("click", () => {
                overlay.classList.remove("active");
                body.classList.remove("modal-open");
            });
        }

        // Маска номера телефона
        const phoneInput = modalCard.querySelector(".modal-tel-input input");

        if (phoneInput) {
            const maskTemplate = "+7 (___) ___-__-__";

            const applyMask = (digits) => {
                let masked = maskTemplate;
                for (let digit of digits) {
                    masked = masked.replace("_", digit);
                }
                return masked;
            };

            const getDigits = (value) => {
                return value.replace(/\D/g, "").replace(/^7/, "");
            };

            phoneInput.addEventListener("focus", () => {
                if (phoneInput.value.trim() === "") {
                    phoneInput.value = maskTemplate;
                    setTimeout(() => {
                        phoneInput.setSelectionRange(4, 4);
                    }, 0);
                }
            });

            phoneInput.addEventListener("input", (e) => {
                const digits = getDigits(phoneInput.value).substring(0, 10);
                phoneInput.value = applyMask(digits);

                // Установить курсор в начальное положение
                const nextUnderscore = phoneInput.value.indexOf("_");
                if (nextUnderscore !== -1) {
                    phoneInput.setSelectionRange(
                        nextUnderscore,
                        nextUnderscore
                    );
                }
            });

            phoneInput.addEventListener("keydown", (event) => {
                if (event.key === "Backspace") {
                    event.preventDefault();

                    const pos = phoneInput.selectionStart;
                    const value = phoneInput.value;
                    const digits = getDigits(value);

                    // Получить индексы цифр в маске
                    const digitPositions = [...value].reduce(
                        (acc, char, index) => {
                            if (/\d/.test(char)) acc.push(index);
                            return acc;
                        },
                        []
                    );

                    // Найти индекс последней цифры до курсора
                    const prevDigitIndex = digitPositions
                        .reverse()
                        .find((i) => i < pos);

                    if (prevDigitIndex !== undefined) {
                        // Удалить эту цифру при ошибке ввода
                        const charToDelete = value[prevDigitIndex];
                        const updatedDigits = digits.replace(
                            new RegExp(
                                charToDelete + "(?!.*" + charToDelete + ")"
                            ),
                            ""
                        );

                        phoneInput.value = applyMask(updatedDigits);
                        phoneInput.setSelectionRange(
                            prevDigitIndex,
                            prevDigitIndex
                        );
                    }
                }
            });

            phoneInput.addEventListener("blur", () => {
                const digits = getDigits(phoneInput.value);
                if (digits.length < 10) {
                    phoneInput.value = "";
                }
            });
        }
    });
}
