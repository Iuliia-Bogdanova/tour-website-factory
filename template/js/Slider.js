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

        let startX = 0;
        let currentX = 0;
        let isSwiping = false;

        slidesContainer.addEventListener("touchstart", (e) => {
            if (e.cancelable) e.preventDefault();
            startX = e.touches[0].clientX;
            isSwiping = true;
            slidesContainer.style.transition = "none";
        });

        slidesContainer.addEventListener("touchmove", (e) => {
            if (!isSwiping) return;
            currentX = e.touches[0].clientX;
            const deltaX = currentX - startX;
            slidesContainer.style.transform = `translateX(-${
                currentIndex * slideWidth - deltaX
            }px)`;
        });

        slidesContainer.addEventListener("touchend", () => {
            if (!isSwiping) return;
            const deltaX = currentX - startX;
            const threshold = slideWidth * 0.2;

            if (deltaX > threshold) {
                goToSlide(currentIndex - 1);
            } else if (deltaX < -threshold) {
                goToSlide(currentIndex + 1);
            } else {
                setPosition(currentIndex, true);
            }

            isSwiping = false;
        });

        updateThumbs(currentIndex - 1);
    }

    nextBtn?.addEventListener("click", () => goToSlide(currentIndex + 1));
    prevBtn?.addEventListener("click", () => goToSlide(currentIndex - 1));

    thumbs.forEach((thumb, i) => {
        thumb.addEventListener("click", () => goToSlide(i + 1));
    });

    updateThumbs(currentIndex - 1);
}
