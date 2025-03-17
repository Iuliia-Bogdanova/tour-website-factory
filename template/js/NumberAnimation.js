export default function initScrollNumberAnimation() {
    const sectionNumbers = document.querySelectorAll(".section-number");

    if (window.innerWidth >= 1200) {
        let lastScrollY = window.scrollY;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const currentScrollY = window.scrollY;
                    let opacity;

                    // Скролл вниз (opacity от 0 до 1)
                    if (currentScrollY > lastScrollY) {
                        opacity = entry.isIntersecting
                            ? entry.intersectionRatio
                            : 1;
                    } else {
                        // Скролл вверх (opacity от 1 до 0)
                        opacity = entry.isIntersecting
                            ? 1 - entry.intersectionRatio
                            : 0;
                    }

                    // Плавная анимация изменения opacity
                    entry.target.style.transition = "opacity 1s ease-in-out";
                    entry.target.style.opacity = opacity;

                    // Обновить положение последнего скролла
                    lastScrollY = currentScrollY;
                });
            },
            { threshold: [0, 0.2, 0.5, 0.8, 1] }
        );

        // Установить изначально opacity 0
        sectionNumbers.forEach((section) => {
            section.style.opacity = 0; // Элементы скрыты
            observer.observe(section); // Начать отслеживание
        });
    }
}

// Более простой код с opacity 0 - 1 - если будут влиять другие анимации
// export default function initScrollNumberAnimation() {
//     const sectionNumbers = document.querySelectorAll(".section-number");

//     if (window.innerWidth >= 1200) {
//         const observer = new IntersectionObserver(
//             (entries) => {
//                 entries.forEach((entry) => {
//                     let opacity = entry.intersectionRatio;
//                     entry.target.style.transition = "opacity 1s ease-in-out";
//                     entry.target.style.opacity = opacity;
//                 });
//             },
//             { threshold: Array.from({ length: 11 }, (_, i) => i * 0.1) }
//         );

//         sectionNumbers.forEach((section) => {
//             section.style.opacity = 0; // Изначально устанавливаем прозрачность в 0
//             observer.observe(section); // Начинаем отслеживание для каждого элемента
//         });
//     }
// }
