export default function initMeteor() {
    if (window.innerWidth < 1200) return;

    const meteor = document.createElement("div");
    meteor.classList.add("meteor");

    // Генерируются по всему экрану
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight;
    meteor.style.left = `${startX}px`;
    meteor.style.top = `${startY}px`;

    // Цель движения - центр
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // Вектор движения - от центра
    const deltaX = startX - centerX;
    const deltaY = startY - centerY;
    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
    const maxDistance = Math.max(window.innerWidth, window.innerHeight) * 1.2;

    // Вычислить координаты за границей экрана
    const x = (deltaX / distance) * maxDistance;
    const y = (deltaY / distance) * maxDistance;

    // Установить CSS-переменные для анимации
    meteor.style.setProperty("--x", `${x}px`);
    meteor.style.setProperty("--y", `${y}px`);

    // Разные размеры и скорости
    const randomCategory = Math.random();
    if (randomCategory < 0.2) {
        meteor.style.width = `${Math.random() * 4 + 4}px`; // 4-8px
        meteor.style.height = meteor.style.width;
        meteor.style.animationDuration = `${Math.random() * 6 + 6}s`; // Быстрее (6-12s)
    } else if (randomCategory < 0.6) {
        meteor.style.width = `${Math.random() * 2 + 2}px`; // 2-4px
        meteor.style.height = meteor.style.width;
        meteor.style.animationDuration = `${Math.random() * 6 + 8}s`; // Медленнее (6-14s)
    } else {
        meteor.style.width = `${Math.random() * 2 + 2}px`; // 2-4px
        meteor.style.height = meteor.style.width;
        meteor.style.animationDuration = `${Math.random() * 10 + 16}s`; // Медленно (10-26s)
    }

    document.body.appendChild(meteor);

    // Удалить после анимации
    setTimeout(() => {
        meteor.remove();
    }, parseFloat(meteor.style.animationDuration) * 1000);
}

// Скорость генерации / количество метеоров
setInterval(initMeteor, 100);
