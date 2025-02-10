// Увеличение картинок при скролле в мобильной версии
document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll(".advantage-icon");

    function handleScroll() {
        const windowHeight = window.innerHeight;
        
        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const elementCenter = rect.top + rect.height / 2; // Центр элемента
            const activationZoneTop = 100; // Верхний запас
            const activationZoneBottom = windowHeight - 100; // Нижний запас

            if (elementCenter > activationZoneTop && elementCenter < activationZoneBottom) {
                element.classList.add("scrolled");
            } else {
                element.classList.remove("scrolled");
            }
        });
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Запуск проверки при загрузке страницы
});
