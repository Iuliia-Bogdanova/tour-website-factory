export default function initMeteor() {
    if (window.innerWidth < 1200) return;

    const meteor = document.createElement("div");
    meteor.classList.add("meteor");

    // Центр экрана
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    meteor.style.left = `${centerX}px`;
    meteor.style.top = `${centerY}px`;

    // Случайный угол (0 - 360 градусов)
    const angle = Math.random() * 2 * Math.PI;

    // Разлетаются далеко за экран
    const maxDistance = Math.max(window.innerWidth, window.innerHeight) * 1.2;
    const x = Math.cos(angle) * maxDistance;
    const y = Math.sin(angle) * maxDistance;

    // Установить CSS-переменные для движения
    meteor.style.setProperty("--x", `${x}px`);
    meteor.style.setProperty("--y", `${y}px`);

    // Разные размеры метеоров
    const isBig = Math.random() < 0.2; // 20% больших
    if (isBig) {
        meteor.style.width = `${Math.random() * 4 + 4}px`; // 4-8px
        meteor.style.height = meteor.style.width;
        meteor.style.animationDuration = `${Math.random() * 4 + 4}s`; // летят быстрее
    } else {
        meteor.style.width = `${Math.random() * 2 + 2}px`; // 2-4px
        meteor.style.height = meteor.style.width;
        meteor.style.animationDuration = `${Math.random() * 4 + 6}s`; // летят медленнее
    }

    document.body.appendChild(meteor);

    // Удалить метеоры после анимации
    setTimeout(
        () => meteor.remove(),
        parseFloat(meteor.style.animationDuration) * 1000
    );
}

// Генерация метеоров
setInterval(initMeteor, 300);
