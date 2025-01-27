document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (event) => {
    // Обработчик для кнопки "Оформить"
    if (event.target.classList.contains("offer__button")) {
      const offerElement = event.target.closest(".offer");
      if (offerElement) {
        showPopupEffect(offerElement);
      }
    }
    // Закрытие всплытия
    if (event.target.classList.contains("offer__close") || event.target.classList.contains("offer__overlay")) {
      const offerElement = document.querySelector(".offer--active");
      if (offerElement) {
        hidePopupEffect(offerElement);
      }
    }
  });
});

function showPopupEffect(offerElement) {
  // Создаем затемнение фона
  const overlay = createOverlay();
  document.body.appendChild(overlay);

  // Сохраняем текущие размеры и позиции
  const offerRect = offerElement.getBoundingClientRect();
  const scrollTop = window.scrollY;
  const scrollLeft = window.scrollX;

  // Сохраняем начальные стили
  offerElement.dataset.originalStyles = JSON.stringify({
    position: offerElement.style.position || "",
    top: offerElement.style.top || "",
    left: offerElement.style.left || "",
    width: offerElement.style.width || "",
    height: offerElement.style.height || "",
    zIndex: offerElement.style.zIndex || "",
    transform: offerElement.style.transform || "",
  });

  // Устанавливаем начальное фиксированное положение
  offerElement.style.position = "fixed";
  offerElement.style.top = `${offerRect.top + scrollTop}px`;
  offerElement.style.left = `${offerRect.left + scrollLeft}px`;
  offerElement.style.width = `${offerRect.width}px`;
  offerElement.style.height = `${offerRect.height}px`;
  offerElement.style.zIndex = "1001";
  offerElement.style.transition = "all 0.5s ease";

  // Добавляем класс активности
  offerElement.classList.add("offer--active");

  // Добавляем кнопку закрытия
  const closeButton = document.createElement("button");
  closeButton.textContent = "Закрыть";
  closeButton.classList.add("offer__close");
  closeButton.style.cssText = `
    position: absolute;
    top: 10px;
    right: 10px;
    background: #ff4d4d;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 5px 10px;
    cursor: pointer;
    font-size: 14px;
  `;
  offerElement.appendChild(closeButton);
}

function hidePopupEffect(offerElement) {
  const overlay = document.querySelector(".offer__overlay");

  // Восстанавливаем стили
  const originalStyles = JSON.parse(offerElement.dataset.originalStyles);
  Object.keys(originalStyles).forEach((key) => {
    offerElement.style[key] = originalStyles[key];
  });

  // Удаляем класс активности
  offerElement.classList.remove("offer--active");

  // Удаляем затемнение и кнопку
  setTimeout(() => {
    if (overlay) overlay.remove();
    const closeButton = offerElement.querySelector(".offer__close");
    if (closeButton) closeButton.remove();
  }, 500);
}

function createOverlay() {
  const overlay = document.createElement("div");
  overlay.classList.add("offer__overlay");
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000; /* Под offer */
    pointer-events: auto;
  `;
  return overlay;
}