// от последнего к первому резко скачут, не зациклены - сделаны на опасити
// export default function initSlider(sliderEl) {
//     const slides = sliderEl.querySelectorAll(".slider__slide");
//     const thumbs = sliderEl.querySelectorAll(".slider__thumb");
//     const prevBtn = sliderEl.querySelector(".slider__btn--prev");
//     const nextBtn = sliderEl.querySelector(".slider__btn--next");

//     let currentIndex = 0;

//     // Функция для отображения слайда
//     function showSlide(index) {
//         // Вычисляем сдвиг для контейнера слайдов
//         const offset = -100 * index; // Сдвигаем на 100% влево
//         const slidesContainer = sliderEl.querySelector(".slider__slides");

//         // Плавно сдвигаем контейнер
//         slidesContainer.style.transition = "transform 0.5s ease"; // Включаем анимацию

//         slidesContainer.style.transform = `translateX(${offset}%)`;

//         // Обновляем активный слайд
//         slides.forEach((slide, i) => {
//             slide.classList.remove("is-active");
//             slide.style.opacity = "0"; // Убираем видимость для всех слайдов
//         });
//         slides[index].classList.add("is-active");
//         slides[index].style.opacity = "1"; // Делаем активный слайд видимым

//         // Обновляем миниатюры
//         thumbs.forEach((thumb, i) => {
//             thumb.classList.toggle("is-active", i === index);
//         });

//         currentIndex = index;
//     }

//     // Обработчики для миниатюр
//     thumbs.forEach((thumb, i) => {
//         thumb.addEventListener("click", () => showSlide(i));
//     });

//     // Обработчики для кнопок переключения
//     prevBtn?.addEventListener("click", () => {
//         // Зацикливание слайдов при нажатии на prev
//         const newIndex = (currentIndex - 1 + slides.length) % slides.length;
//         showSlide(newIndex);
//     });

//     nextBtn?.addEventListener("click", () => {
//         // Зацикливание слайдов при нажатии на next
//         const newIndex = (currentIndex + 1) % slides.length;
//         showSlide(newIndex);
//     });

//     // Инициализация с первым слайдом
//     showSlide(currentIndex);
// }

export default function initSlider(sliderEl) {
    const wrapper = sliderEl.querySelector(".slider__wrap");
    const slidesContainer = sliderEl.querySelector(".slider__slides");
    const slides = Array.from(sliderEl.querySelectorAll(".slider__slide"));
    const thumbs = sliderEl.querySelectorAll(".slider__thumb");
    const prevBtn = sliderEl.querySelector(".slider__btn--prev");
    const nextBtn = sliderEl.querySelector(".slider__btn--next");

    let currentIndex = 1;

    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);
    firstClone.classList.add("clone");
    lastClone.classList.add("clone");

    slidesContainer.appendChild(firstClone);
    slidesContainer.insertBefore(lastClone, slides[0]);

    const allSlides = Array.from(sliderEl.querySelectorAll(".slider__slide"));

    let slideWidth = wrapper.clientWidth;

    function setWidths() {
        slideWidth = wrapper.clientWidth;

        allSlides.forEach((slide) => {
            slide.style.flex = `0 0 ${slideWidth}px`;
            slide.style.maxWidth = `${slideWidth}px`;
        });

        slidesContainer.style.width = `${allSlides.length * slideWidth}px`;
        slidesContainer.style.transform = `translateX(-${
            slideWidth * currentIndex
        }px)`;
    }

    window.addEventListener("resize", () => {
        setWidths();
    });

    setWidths();

    function setPosition(index, animated = true) {
        slidesContainer.style.transition = animated
            ? "transform 0.3s ease"
            : "none";
        slidesContainer.style.transform = `translateX(-${
            index * slideWidth
        }px)`;
    }

    let isTransitioning = false;

    function updateThumbs(index) {
        thumbs.forEach((thumb, i) => {
            thumb.classList.toggle("is-active", i === index);
        });
    }

    function goToSlide(index) {
        if (isTransitioning) return;
        isTransitioning = true;

        currentIndex = index;
        setPosition(currentIndex, true);

        slidesContainer.addEventListener("transitionend", handleTransitionEnd, {
            once: true,
        });
    }

    function handleTransitionEnd() {
        isTransitioning = false;

        if (currentIndex === allSlides.length - 1) {
            currentIndex = 1;
            requestAnimationFrame(() => {
                slidesContainer.style.transition = "none";
                setPosition(currentIndex, false);
            });
        }

        if (currentIndex === 0) {
            currentIndex = allSlides.length - 2;
            requestAnimationFrame(() => {
                slidesContainer.style.transition = "none";
                setPosition(currentIndex, false);
            });
        }

        updateThumbs(currentIndex - 1);
    }

    nextBtn?.addEventListener("click", () => goToSlide(currentIndex + 1));
    prevBtn?.addEventListener("click", () => goToSlide(currentIndex - 1));

    thumbs.forEach((thumb, i) => {
        thumb.addEventListener("click", () => goToSlide(i + 1));
    });

    updateThumbs(currentIndex - 1);
}
