// // не отображаются слайды кроме первого, но нет резких скачков от последнего к первому - есть зацикленность?

// export default function initSlider(sliderEl) {
//     const slides = sliderEl.querySelectorAll(".slider__slide");
//     const thumbs = sliderEl.querySelectorAll(".slider__thumb");
//     const prevBtn = sliderEl.querySelector(".slider__btn--prev");
//     const nextBtn = sliderEl.querySelector(".slider__btn--next");

//     let currentIndex = 0;

//     function showSlide(index) {
//         slides.forEach((slide, i) => {
//             slide.classList.toggle("is-active", i === index);
//         });
//         thumbs.forEach((thumb, i) => {
//             thumb.classList.toggle("is-active", i === index);
//         });
//         currentIndex = index;
//     }

//     thumbs.forEach((thumb, i) => {
//         thumb.addEventListener("click", () => showSlide(i));
//     });

//     prevBtn?.addEventListener("click", () => {
//         const newIndex = (currentIndex - 1 + slides.length) % slides.length;
//         showSlide(newIndex);
//     });

//     nextBtn?.addEventListener("click", () => {
//         const newIndex = (currentIndex + 1) % slides.length;
//         showSlide(newIndex);
//     });

//     showSlide(currentIndex);
// }

// от последнего к первому резко скачут, не зациклены

export default function initSlider(sliderEl) {
    const slides = sliderEl.querySelectorAll(".slider__slide");
    const thumbs = sliderEl.querySelectorAll(".slider__thumb");
    const prevBtn = sliderEl.querySelector(".slider__btn--prev");
    const nextBtn = sliderEl.querySelector(".slider__btn--next");

    let currentIndex = 0;

    // Функция для отображения слайда
    function showSlide(index) {
        // Вычисляем сдвиг для контейнера слайдов
        const offset = -100 * index; // Сдвигаем на 100% влево
        const slidesContainer = sliderEl.querySelector(".slider__slides");

        // Плавно сдвигаем контейнер
        slidesContainer.style.transition = "transform 0.5s ease"; // Включаем анимацию

        slidesContainer.style.transform = `translateX(${offset}%)`;

        // Обновляем активный слайд
        slides.forEach((slide, i) => {
            slide.classList.remove("is-active");
            slide.style.opacity = "0"; // Убираем видимость для всех слайдов
        });
        slides[index].classList.add("is-active");
        slides[index].style.opacity = "1"; // Делаем активный слайд видимым

        // Обновляем миниатюры
        thumbs.forEach((thumb, i) => {
            thumb.classList.toggle("is-active", i === index);
        });

        currentIndex = index;
    }

    // Обработчики для миниатюр
    thumbs.forEach((thumb, i) => {
        thumb.addEventListener("click", () => showSlide(i));
    });

    // Обработчики для кнопок переключения
    prevBtn?.addEventListener("click", () => {
        // Зацикливание слайдов при нажатии на prev
        const newIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(newIndex);
    });

    nextBtn?.addEventListener("click", () => {
        // Зацикливание слайдов при нажатии на next
        const newIndex = (currentIndex + 1) % slides.length;
        showSlide(newIndex);
    });

    // Инициализация с первым слайдом
    showSlide(currentIndex);
}

// прокрутка правильная с дополнительными клонами, картинки мелькают при прокрутке, не отображаются
// export default function initSlider(sliderEl) {
//     const slidesContainer = sliderEl.querySelector(".slider__slides");
//     const slides = Array.from(sliderEl.querySelectorAll(".slider__slide"));
//     const thumbs = sliderEl.querySelectorAll(".slider__thumb");
//     const prevBtn = sliderEl.querySelector(".slider__btn--prev");
//     const nextBtn = sliderEl.querySelector(".slider__btn--next");

//     let currentIndex = 1; // начинаем с первого реального слайда

//     // Клонируем слайды
//     const firstClone = slides[0].cloneNode(true);
//     const lastClone = slides[slides.length - 1].cloneNode(true);
//     firstClone.classList.add("clone");
//     lastClone.classList.add("clone");

//     slidesContainer.appendChild(firstClone); // клон первого в конец
//     slidesContainer.insertBefore(lastClone, slides[0]); // клон последнего в начало

//     const allSlides = Array.from(sliderEl.querySelectorAll(".slider__slide"));

//     // Устанавливаем ширину контейнера: N * 100%
//     slidesContainer.style.width = `${allSlides.length * 100}%`;

//     // Каждый слайд: 100% ширины .slider__wrap
//     allSlides.forEach((slide) => {
//         slide.style.flex = "0 0 100%";
//         slide.style.maxWidth = "100%";
//     });

//     // Начальное положение
//     slidesContainer.style.transform = `translateX(-${100 * currentIndex}%)`;

//     let isTransitioning = false;

//     function updateThumbs(index) {
//         thumbs.forEach((thumb, i) => {
//             thumb.classList.toggle("is-active", i === index);
//         });
//     }

//     function goToSlide(index) {
//         if (isTransitioning) return;

//         isTransitioning = true;
//         slidesContainer.style.transition = "transform 0.5s ease";
//         slidesContainer.style.transform = `translateX(-${100 * index}%)`;
//         currentIndex = index;

//         slidesContainer.addEventListener("transitionend", handleTransitionEnd, {
//             once: true,
//         });
//     }

//     function handleTransitionEnd() {
//         slidesContainer.style.transition = "none";

//         // Если находимся на клоне первого (последний настоящий)
//         if (currentIndex === allSlides.length - 1) {
//             currentIndex = 1;
//             slidesContainer.style.transform = `translateX(-${
//                 100 * currentIndex
//             }%)`;
//         }

//         // Если находимся на клоне последнего (первый настоящий)
//         if (currentIndex === 0) {
//             currentIndex = allSlides.length - 2;
//             slidesContainer.style.transform = `translateX(-${
//                 100 * currentIndex
//             }%)`;
//         }

//         updateThumbs(currentIndex - 1); // -1 потому что есть клон в начале
//         isTransitioning = false;
//     }

//     nextBtn?.addEventListener("click", () => {
//         goToSlide(currentIndex + 1);
//     });

//     prevBtn?.addEventListener("click", () => {
//         goToSlide(currentIndex - 1);
//     });

//     thumbs.forEach((thumb, i) => {
//         thumb.addEventListener("click", () => {
//             goToSlide(i + 1); // +1 из-за клона в начале
//         });
//     });

//     updateThumbs(currentIndex - 1);
// }
