export default function initSpaceAnimation() {
    document.addEventListener("DOMContentLoaded", () => {
        if (window.innerWidth < 1200) return;

        const img = document.querySelector(".space__img");
        const spaceBg = document.querySelector(".space__bg");

        const startSize = { width: 1299, height: 895 };
        const endSize = { width: 623, height: 430 };

        const startAfterSize = { width: 68, height: 326 };
        const endAfterSize = { width: 10, height: 48 };

        let isAnimating = false;

        function updateSize() {
            if (!isAnimating) return;

            const rect = spaceBg.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // Прогресс анимации от 0 до 1
            let progress = Math.min(
                Math.max((viewportHeight - rect.top) / viewportHeight, 0),
                1
            );

            // Скролл вниз: анимация должна начинаться, когда верх картинки входит на 50% в зоне видимости - похоже, не работает(
            if (rect.top <= viewportHeight * 0.5) {
                isAnimating = true;
            }

            // Скролл вверх: анимация должна начинаться, когда нижний край картинки входит в зону видимости на 1% - похоже, не работает(
            if (rect.bottom >= viewportHeight * 0.01) {
                isAnimating = true;
            }

            if (!isAnimating) return;

            // Изменить размеры картинки
            let newWidth =
                startSize.width - (startSize.width - endSize.width) * progress;
            let newHeight =
                startSize.height -
                (startSize.height - endSize.height) * progress;

            img.style.width = `${newWidth}px`;
            img.style.height = `${newHeight}px`;

            // Изменить размеры псевдоэлемента через CSS-переменные
            let afterWidth =
                startAfterSize.width -
                (startAfterSize.width - endAfterSize.width) * progress;
            let afterHeight =
                startAfterSize.height -
                (startAfterSize.height - endAfterSize.height) * progress;

            spaceBg.style.setProperty("--after-width", `${afterWidth}px`);
            spaceBg.style.setProperty("--after-height", `${afterHeight}px`);
        }

        // Отследить, когда элемент пересекает вьюпорт - работает ли?
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const rect = spaceBg.getBoundingClientRect();
                    const viewportHeight = window.innerHeight;

                    // Скролл вниз: начинается когда верх картинки входит в зону видимости на 50% - похоже, не работает(
                    if (
                        entry.isIntersecting &&
                        rect.top <= viewportHeight * 0.5
                    ) {
                        isAnimating = true;
                        window.addEventListener("scroll", updateSize);
                        updateSize();
                    }

                    // Скролл вверх: начинается когда нижний край картинки входит в зону видимости на 1% - похоже, не работает(
                    if (
                        entry.isIntersecting &&
                        rect.bottom >= viewportHeight * 0.01
                    ) {
                        isAnimating = true;
                        window.addEventListener("scroll", updateSize);
                        updateSize();
                    }

                    // Если элемент не в зоне видимости, остановить анимацию
                    else {
                        isAnimating = false;
                        window.removeEventListener("scroll", updateSize);
                    }
                });
            },
            {
                // threshold: 0 - отследить когда элемент появляется на 1% в зоне видимости
                threshold: [0.01, 0.5], // Обработать 1% и 50%
            }
        );

        observer.observe(spaceBg);
    });
}
