import initSlider from "./Slider.js";

export default function initModal() {
    document.addEventListener("DOMContentLoaded", () => {
        const body = document.body;
        const initializedModals = new Set();

        function setupModalClose(modal) {
            if (initializedModals.has(modal)) return;

            // Закрыть по клику на фон
            modal.addEventListener("click", (event) => {
                if (event.target === modal) {
                    modal.classList.remove("active");
                    document.body.classList.remove("modal-open");
                }
            });

            // Закрыть по кнопке
            const closeBtns = modal.querySelectorAll(".modal-close-btn");
            closeBtns.forEach((btn) => {
                btn.addEventListener("click", () => {
                    modal.classList.remove("active");
                    document.body.classList.remove("modal-open");
                });
            });

            initializedModals.add(modal);
        }

        // Subscribe  modal
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

            // Phone input mask
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

        // More modals
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

                    // Инициализировать слайдер
                    requestAnimationFrame(() => {
                        if (!modal.dataset.sliderInitialized) {
                            const sliderEl =
                                modal.querySelector(".card-more__slider");
                            if (sliderEl) {
                                initSlider(sliderEl); // Вызвать слайдер
                                modal.dataset.sliderInitialized = "true";
                            }
                        }
                    });
                }
            });
        });

        // Закрыть по esc
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                const activeModal = document.querySelector(".overlay.active");
                if (activeModal) {
                    activeModal.classList.remove("active");
                    document.body.classList.remove("modal-open");
                }
            }
        });

        // Zoom modal
        document
            .querySelectorAll(".slider__slide .slider__img")
            .forEach((img) => {
                img.addEventListener("click", () => {
                    const zoomModal = document.getElementById("overlay-zoom");
                    if (zoomModal) {
                        zoomModal.classList.add("active");
                        document.body.classList.add("modal-open");
                        setupModalClose(zoomModal);
                        setupZoomControls();
                    }
                });
            });

        function setupZoomControls() {
            const zoomSlides = document.querySelector(".slider__slides--zoom");
            const increaseBtn = document.querySelector(".icon-increase");
            const decreaseBtn = document.querySelector(".icon-decrease");

            let isZoomed = false;
            const isMobile = window.innerWidth < 960;

            const applyZoomState = () => {
                if (!isMobile) {
                    zoomSlides.style.width = "";
                    zoomSlides.style.height = "";
                    zoomSlides.style.maxWidth = "1000px";
                    zoomSlides.style.overflow = "hidden";
                    zoomSlides.style.cursor = "default";

                    zoomSlides.querySelectorAll("img").forEach((img) => {
                        img.style.width = "100%";
                        img.style.height = "100%";
                        img.style.objectFit = "cover";
                        img.style.cursor = "default";
                    });

                    increaseBtn?.classList.remove("active");
                    decreaseBtn?.classList.remove("active");
                    return;
                }

                if (isZoomed) {
                    zoomSlides.style.width = "1000px";
                    zoomSlides.style.height = "560px";
                    zoomSlides.style.maxWidth = "none";
                    zoomSlides.style.overflow = "hidden";

                    zoomSlides.querySelectorAll("img").forEach((img) => {
                        img.style.width = "1000px";
                        img.style.height = "560px";
                        img.style.objectFit = "contain";
                        img.style.cursor = "zoom-out";
                    });

                    increaseBtn?.classList.remove("active");
                    decreaseBtn?.classList.add("active");
                } else {
                    zoomSlides.style.width = "";
                    zoomSlides.style.height = "";
                    zoomSlides.style.maxWidth = "100%";
                    zoomSlides.style.overflow = "hidden";

                    zoomSlides.querySelectorAll("img").forEach((img) => {
                        img.style.width = "100%";
                        img.style.height = "100%";
                        img.style.objectFit = "cover";
                        img.style.cursor = "zoom-in";
                    });

                    increaseBtn?.classList.add("active");
                    decreaseBtn?.classList.remove("active");
                }
            };

            // Кнопки зума
            if (isMobile) {
                increaseBtn?.addEventListener("click", () => {
                    isZoomed = true;
                    applyZoomState();
                });

                decreaseBtn?.addEventListener("click", () => {
                    isZoomed = false;
                    applyZoomState();
                });

                zoomSlides.addEventListener("click", (e) => {
                    if (e.target.tagName === "IMG") {
                        isZoomed = !isZoomed;
                        applyZoomState();
                    }
                });

                // Drag-to-scroll при увеличении
                let isDragging = false;
                let startX, startY, scrollLeft, scrollTop;

                zoomSlides.addEventListener("mousedown", (e) => {
                    if (!isZoomed) return;
                    isDragging = true;
                    startX = e.pageX - zoomSlides.offsetLeft;
                    startY = e.pageY - zoomSlides.offsetTop;
                    scrollLeft = zoomSlides.scrollLeft;
                    scrollTop = zoomSlides.scrollTop;
                });

                zoomSlides.addEventListener("mouseleave", () => {
                    isDragging = false;
                });

                zoomSlides.addEventListener("mouseup", () => {
                    isDragging = false;
                });

                zoomSlides.addEventListener("mousemove", (e) => {
                    if (!isDragging || !isZoomed) return;
                    e.preventDefault();
                    const x = e.pageX - zoomSlides.offsetLeft;
                    const y = e.pageY - zoomSlides.offsetTop;
                    zoomSlides.scrollLeft = scrollLeft - (x - startX);
                    zoomSlides.scrollTop = scrollTop - (y - startY);
                });

                // Touch events
                zoomSlides.addEventListener("touchstart", (e) => {
                    if (!isZoomed) return;
                    const touch = e.touches[0];
                    isDragging = true;
                    startX = touch.pageX - zoomSlides.offsetLeft;
                    startY = touch.pageY - zoomSlides.offsetTop;
                    scrollLeft = zoomSlides.scrollLeft;
                    scrollTop = zoomSlides.scrollTop;
                });

                zoomSlides.addEventListener("touchend", () => {
                    isDragging = false;
                });

                zoomSlides.addEventListener("touchmove", (e) => {
                    if (!isDragging || !isZoomed) return;
                    const touch = e.touches[0];
                    const x = touch.pageX - zoomSlides.offsetLeft;
                    const y = touch.pageY - zoomSlides.offsetTop;
                    zoomSlides.scrollLeft = scrollLeft - (x - startX);
                    zoomSlides.scrollTop = scrollTop - (y - startY);
                });
            }

            applyZoomState();
        }
    });
}
