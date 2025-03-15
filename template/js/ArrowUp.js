export default function initArrowUp() {
    const arrowUp = document.querySelector(".arrow-up");

    if (!arrowUp) return;

    const toggleButtonVisibility = () => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const distanceToBottom = documentHeight - (scrollY + windowHeight);

        if (scrollY > 800 && distanceToBottom > 800) {
            arrowUp.classList.add("visible");
        } else {
            arrowUp.classList.remove("visible");
        }
    };

    window.addEventListener("scroll", toggleButtonVisibility);
    window.addEventListener("resize", toggleButtonVisibility);

    arrowUp.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    toggleButtonVisibility(); // Проверить при загрузке
}
