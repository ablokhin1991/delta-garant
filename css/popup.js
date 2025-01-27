document.addEventListener("DOMContentLoaded", () => {
  // Обработчик для кнопки "Оформить"
  document.body.addEventListener("click", (event) => {
    if (event.target.classList.contains("offer__button")) {
      const offerElement = event.target.closest(".offer");
      if (offerElement) {
        showPopupEffect(offerElement);
      }
    }

    // Закрытие всплытия
    if (event.target.classList.contains("offer__close")) {
      const offerElement = event.target.closest(".offer");
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

  // Получаем текущие размеры и позиции offer
  const offerRect = offerElement.getBoundingClientRect();
  const scrollTop = window.scrollY; // Учитываем вертикальный скроллинг
  const scrollLeft = window.scrollX; // Учитываем горизонтальный скроллинг

  // Сохраняем начальные стили offer
  offerElement.dataset.originalPosition = offerElement.style.position || "";
  offerElement.dataset.originalTop = offerElement.style.top || "";
  offerElement.dataset.originalLeft = offerElement.style.left || "";
  offerElement.dataset.originalWidth = offerElement.style.width || "";
  offerElement.dataset.originalHeight = offerElement.style.height || "";
  offerElement.dataset.originalZIndex = offerElement.style.zIndex || "";
  offerElement.dataset.originalTransform = offerElement.style.transform || "";

  // Устанавливаем начальное фиксированное положение
  offerElement.style.position = "fixed";
  offerElement.style.top = `${offerRect.top + scrollTop}px`;
  offerElement.style.left = `${offerRect.left + scrollLeft}px`;
  offerElement.style.width = `${offerRect.width}px`;
  offerElement.style.height = `${offerRect.height}px`;
  offerElement.style.zIndex = "1001"; // Поверх overlay
  offerElement.style.transition = "all 0.5s ease";

  // Добавляем эффект увеличения
  setTimeout(() => {
    offerElement.style.transform = "translate(-50%, -50%) scale(1.2)";
    offerElement.style.top = "50%";
    offerElement.style.left = "50%";
    offerElement.style.width = "80%";
    offerElement.style.height = "auto";
    offerElement.style.backgroundColor = "#fff";
    offerElement.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.3)";
    offerElement.style.borderRadius = "10px";
    offerElement.style.padding = "20px";
  }, 0);

  // Кнопка закрытия
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

  // Возвращаем offer в начальное состояние
  offerElement.style.transform = offerElement.dataset.originalTransform;
  offerElement.style.position = offerElement.dataset.originalPosition;
  offerElement.style.top = offerElement.dataset.originalTop;
  offerElement.style.left = offerElement.dataset.originalLeft;
  offerElement.style.width = offerElement.dataset.originalWidth;
  offerElement.style.height = offerElement.dataset.originalHeight;
  offerElement.style.zIndex = offerElement.dataset.originalZIndex;
  offerElement.style.transition = "all 0.5s ease";
  offerElement.style.boxShadow = "none";
  offerElement.style.borderRadius = "0";
  offerElement.style.padding = "10px";

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
  overlay.addEventListener("click", () => {
    const activeOffer = document.querySelector(".offer[style*='z-index: 1001']");
    if (activeOffer) hidePopupEffect(activeOffer);
  });
  return overlay;
}

