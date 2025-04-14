// export default function initModal() {
//     document.addEventListener("DOMContentLoaded", () => {
//         const body = document.body;

//         // Сохранить модалки с обработчиками
//         const initializedModals = new Set();

//         function setupModalClose(modal) {
//             if (initializedModals.has(modal)) return;

//             // Закрыть по фону
//             modal.addEventListener("click", (event) => {
//                 if (event.target === modal) {
//                     modal.classList.remove("active");
//                     document.body.classList.remove("modal-open");
//                 }
//             });

//             // Закрыть по кнопке
//             const closeBtns = modal.querySelectorAll(".modal-close-btn");
//             closeBtns.forEach((btn) => {
//                 btn.addEventListener("click", () => {
//                     modal.classList.remove("active");
//                     document.body.classList.remove("modal-open");
//                 });
//             });

//             initializedModals.add(modal); // отметить как инициализированную
//         }

//         // Subscribe Modal
//         const subscribeButtons = document.querySelectorAll(
//             ".trip-btn-subscribe"
//         );
//         const subscribeOverlay = document.getElementById("overlay-subscribe");
//         const subscribeModalCard =
//             subscribeOverlay?.querySelector(".modal__card");

//         if (subscribeButtons.length && subscribeOverlay && subscribeModalCard) {
//             subscribeButtons.forEach((btn) => {
//                 btn.addEventListener("click", () => {
//                     subscribeOverlay.classList.add("active");
//                     body.classList.add("modal-open");

//                     setupModalClose(subscribeOverlay);
//                 });
//             });

//             // Маска телефона
//             const phoneInput = subscribeModalCard.querySelector(
//                 ".modal-tel-input input"
//             );
//             if (phoneInput) {
//                 const maskTemplate = "+7 (___) ___-__-__";

//                 const applyMask = (digits) => {
//                     let masked = maskTemplate;
//                     for (let digit of digits) {
//                         masked = masked.replace("_", digit);
//                     }
//                     return masked;
//                 };

//                 const getDigits = (value) => {
//                     return value.replace(/\D/g, "").replace(/^7/, "");
//                 };

//                 phoneInput.addEventListener("focus", () => {
//                     if (phoneInput.value.trim() === "") {
//                         phoneInput.value = maskTemplate;
//                         setTimeout(() => {
//                             phoneInput.setSelectionRange(4, 4);
//                         }, 0);
//                     }
//                 });

//                 phoneInput.addEventListener("input", () => {
//                     const digits = getDigits(phoneInput.value).substring(0, 10);
//                     phoneInput.value = applyMask(digits);

//                     const nextUnderscore = phoneInput.value.indexOf("_");
//                     if (nextUnderscore !== -1) {
//                         phoneInput.setSelectionRange(
//                             nextUnderscore,
//                             nextUnderscore
//                         );
//                     }
//                 });

//                 phoneInput.addEventListener("keydown", (event) => {
//                     if (event.key === "Backspace") {
//                         event.preventDefault();

//                         const pos = phoneInput.selectionStart;
//                         const value = phoneInput.value;
//                         const digits = getDigits(value);

//                         const digitPositions = [...value].reduce(
//                             (acc, char, index) => {
//                                 if (/\d/.test(char)) acc.push(index);
//                                 return acc;
//                             },
//                             []
//                         );

//                         const prevDigitIndex = digitPositions
//                             .reverse()
//                             .find((i) => i < pos);

//                         if (prevDigitIndex !== undefined) {
//                             const charToDelete = value[prevDigitIndex];
//                             const updatedDigits = digits.replace(
//                                 new RegExp(
//                                     charToDelete + "(?!.*" + charToDelete + ")"
//                                 ),
//                                 ""
//                             );

//                             phoneInput.value = applyMask(updatedDigits);
//                             phoneInput.setSelectionRange(
//                                 prevDigitIndex,
//                                 prevDigitIndex
//                             );
//                         }
//                     }
//                 });

//                 phoneInput.addEventListener("blur", () => {
//                     const digits = getDigits(phoneInput.value);
//                     if (digits.length < 10) {
//                         phoneInput.value = "";
//                     }
//                 });
//             }
//         }

//         // More Modals
//         const openMoreButtons = document.querySelectorAll(
//             "[data-modal^='overlay-more']"
//         );

//         openMoreButtons.forEach((btn) => {
//             btn.addEventListener("click", (e) => {
//                 e.preventDefault(); // для <a>
//                 const modalId = btn.dataset.modal;
//                 const modal = document.getElementById(modalId);
//                 if (modal) {
//                     modal.classList.add("active");
//                     body.classList.add("modal-open");

//                     setupModalClose(modal);
//                 }
//             });
//         });

//         document.addEventListener("keydown", (e) => {
//             if (e.key === "Escape") {
//                 const activeModal = document.querySelector(".overlay.active");
//                 if (activeModal) {
//                     activeModal.classList.remove("active");
//                     document.body.classList.remove("modal-open");
//                 }
//             }
//         });
//     });
// }

import initSlider from "./Slider.js";

export default function initModal() {
    document.addEventListener("DOMContentLoaded", () => {
        const body = document.body;
        const initializedModals = new Set();

        function setupModalClose(modal) {
            if (initializedModals.has(modal)) return;

            // Закрытие по клику на фон
            modal.addEventListener("click", (event) => {
                if (event.target === modal) {
                    modal.classList.remove("active");
                    document.body.classList.remove("modal-open");
                }
            });

            // Закрытие по кнопке
            const closeBtns = modal.querySelectorAll(".modal-close-btn");
            closeBtns.forEach((btn) => {
                btn.addEventListener("click", () => {
                    modal.classList.remove("active");
                    document.body.classList.remove("modal-open");
                });
            });

            initializedModals.add(modal);
        }

        // === Модалка "Записаться" ===
        const subscribeButtons = document.querySelectorAll(
            ".trip-btn-subscribe"
        );
        const subscribeOverlay = document.getElementById("overlay-subscribe");
        const subscribeModalCard =
            subscribeOverlay?.querySelector(".modal__card");

        if (subscribeButtons.length && subscribeOverlay && subscribeModalCard) {
            subscribeButtons.forEach((btn) => {
                btn.addEventListener("click", () => {
                    subscribeOverlay.classList.add("active");
                    body.classList.add("modal-open");
                    setupModalClose(subscribeOverlay);
                });
            });

            // Маска телефона (оставим без изменений)
            const phoneInput = subscribeModalCard.querySelector(
                ".modal-tel-input input"
            );
            if (phoneInput) {
                const maskTemplate = "+7 (___) ___-__-__";

                const applyMask = (digits) => {
                    let masked = maskTemplate;
                    for (let digit of digits) {
                        masked = masked.replace("_", digit);
                    }
                    return masked;
                };

                const getDigits = (value) =>
                    value.replace(/\D/g, "").replace(/^7/, "");

                phoneInput.addEventListener("focus", () => {
                    if (phoneInput.value.trim() === "") {
                        phoneInput.value = maskTemplate;
                        setTimeout(() => phoneInput.setSelectionRange(4, 4), 0);
                    }
                });

                phoneInput.addEventListener("input", () => {
                    const digits = getDigits(phoneInput.value).substring(0, 10);
                    phoneInput.value = applyMask(digits);

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
                        const digitPositions = [...value].reduce(
                            (acc, char, index) => {
                                if (/\d/.test(char)) acc.push(index);
                                return acc;
                            },
                            []
                        );
                        const prevDigitIndex = digitPositions
                            .reverse()
                            .find((i) => i < pos);
                        if (prevDigitIndex !== undefined) {
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
                    if (digits.length < 10) phoneInput.value = "";
                });
            }
        }

        // === Модалки "Подробнее" ===
        const openMoreButtons = document.querySelectorAll(
            "[data-modal^='overlay-more']"
        );

        openMoreButtons.forEach((btn) => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                const modalId = btn.dataset.modal;
                const modal = document.getElementById(modalId);

                if (modal) {
                    modal.classList.add("active");
                    body.classList.add("modal-open");
                    setupModalClose(modal);

                    // ✅ Инициализация слайдера после открытия
                    requestAnimationFrame(() => {
                        if (!modal.dataset.sliderInitialized) {
                            const sliderEl =
                                modal.querySelector(".card-more__slider");
                            if (sliderEl) {
                                initSlider(sliderEl); // вызов твоей функции
                                modal.dataset.sliderInitialized = "true";
                            }
                        }
                    });
                }
            });
        });

        // === Закрытие Escape ===
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                const activeModal = document.querySelector(".overlay.active");
                if (activeModal) {
                    activeModal.classList.remove("active");
                    document.body.classList.remove("modal-open");
                }
            }
        });
    });
}
