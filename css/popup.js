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
  const overlay = createOverlay();
  document.body.appendChild(overlay);

  const offerRect = offerElement.getBoundingClientRect();
  const scrollTop = window.scrollY; // Учитываем вертикальный скроллинг
  const scrollLeft = window.scrollX; // Учитываем горизонтальный скроллинг

  // Сохраняем начальные размеры и позицию
  offerElement.dataset.originalTop = `${offerRect.top + scrollTop}px`;
  offerElement.dataset.originalLeft = `${offerRect.left + scrollLeft}px`;
  offerElement.dataset.originalWidth = `${offerRect.width}px`;
  offerElement.dataset.originalHeight = `${offerRect.height}px`;

  // Устанавливаем начальное положение
  offerElement.style.position = "fixed";
  offerElement.style.top = `${offerRect.top}px`;
  offerElement.style.left = `${offerRect.left}px`;
  offerElement.style.width = `${offerRect.width}px`;
  offerElement.style.height = `${offerRect.height}px`;
  offerElement.style.zIndex = "1000";
  offerElement.style.transition = "all 0.5s ease";

  // Добавляем эффект увеличения
  setTimeout(() => {
    offerElement.style.transform = "translate(-50%, -50%) scale(1.1)";
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

  // Возвращаем элемент в исходное положение
  offerElement.style.transform = "none";
  offerElement.style.top = offerElement.dataset.originalTop;
  offerElement.style.left = offerElement.dataset.originalLeft;
  offerElement.style.width = offerElement.dataset.originalWidth;
  offerElement.style.height = offerElement.dataset.originalHeight;
  offerElement.style.zIndex = "";
  offerElement.style.transition = "all 0.5s ease";
  offerElement.style.boxShadow = "none";
  offerElement.style.borderRadius = "0";
  offerElement.style.padding = "10px";

  // Удаляем затемнение и кнопку
  setTimeout(() => {
    if (overlay) overlay.remove();
    const closeButton = offerElement.querySelector(".offer__close");
    if (closeButton) closeButton.remove();
    offerElement.style.position = ""; // Сбрасываем стиль
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
    z-index: 999;
    pointer-events: none; /* Не блокируем клики */
  `;
  return overlay;
}
