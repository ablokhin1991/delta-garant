// Функция симуляции загрузки (крутилка)
document.getElementById("calculate-btn").addEventListener("click", function () {
    console.log("lsf.js загружен");
    const loadingSpinner = document.getElementById("loading-spinner");
    const resultOutput = document.getElementById("result-output");
    const offerList = document.getElementById("offer-list");
  
    // Показываем крутилку и скрываем результаты
    resultOutput.style.display = "none";
    loadingSpinner.style.display = "block";
    loadingSpinner.scrollIntoView({ behavior: "smooth", block: "center" });
  
    // Симулируем загрузку
    setTimeout(() => {
        loadingSpinner.style.display = "none";
        resultOutput.style.display = "block";
  
        // Убедитесь, что DOM обновился перед прокруткой
        setTimeout(() => {
            if (offerList && offerList.offsetHeight > 0) {
                const rect = offerList.getBoundingClientRect();
                const scrollY = window.scrollY || window.pageYOffset;
  
                // Рассчитываем смещение
                const offset = window.innerWidth <= 768 ? 70 : 70; // 70px для мобильных, 150px для десктопов
                const targetPosition = rect.top + scrollY - offset;
  
                // Прокручиваем с кастомной скоростью
                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth", // Используем плавный скроллинг
                });
            } else {
                console.error("offerList не найден или не видим.");
            }
        }, 100); // Задержка для завершения перерисовки DOM
    }, 2000);
  });