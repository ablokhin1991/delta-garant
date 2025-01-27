document.addEventListener("DOMContentLoaded", () => {
  // Обработка клика на кнопке "Оформить"
  document.body.addEventListener("click", (event) => {
    if (event.target.classList.contains("offer__button")) {
      const offerElement = event.target.closest(".offer");
      if (offerElement) {
        expandOffer(offerElement);
      }
    }

    // Обработка закрытия popup
    if (event.target.classList.contains("offer__close")) {
      const offerElement = event.target.closest(".offer");
      if (offerElement) {
        collapseOffer(offerElement);
      }
    }
  });
});

// Функция для "всплытия" offer
function expandOffer(offerElement) {
  const offerRect = offerElement.getBoundingClientRect();

  // Сохраняем исходные данные (для возврата)
  offerElement.dataset.originalTop = `${offerRect.top}px`;
  offerElement.dataset.originalLeft = `${offerRect.left}px`;
  offerElement.dataset.originalWidth = `${offerRect.width}px`;
  offerElement.dataset.originalHeight = `${offerRect.height}px`;

  // Устанавливаем абсолютное позиционирование
  offerElement.style.position = "absolute";
  offerElement.style.top = `${offerRect.top}px`;
  offerElement.style.left = `${offerRect.left}px`;
  offerElement.style.width = `${offerRect.width}px`;
  offerElement.style.height = `${offerRect.height}px`;
  offerElement.style.zIndex = 1000;
  offerElement.style.transition = "all 0.3s ease-in-out";
  offerElement.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.3)";

  // Анимация "всплытия"
  setTimeout(() => {
    offerElement.style.top = "50%";
    offerElement.style.left = "50%";
    offerElement.style.transform = "translate(-50%, -50%)";
    offerElement.style.width = "80%";
    offerElement.style.height = "auto";
    offerElement.style.backgroundColor = "#fff";
    offerElement.style.borderRadius = "10px";
    offerElement.style.padding = "20px";
  }, 0);

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

  // Затемняющий фон
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
  `;
  document.body.appendChild(overlay);
}

// Функция для возврата offer на место
function collapseOffer(offerElement) {
  const overlay = document.querySelector(".offer__overlay");

  // Возвращаем элемент на место
  offerElement.style.top = offerElement.dataset.originalTop;
  offerElement.style.left = offerElement.dataset.originalLeft;
  offerElement.style.width = offerElement.dataset.originalWidth;
  offerElement.style.height = offerElement.dataset.originalHeight;
  offerElement.style.transform = "none";
  offerElement.style.zIndex = "";
  offerElement.style.transition = "all 0.3s ease-in-out";
  offerElement.style.boxShadow = "none";
  offerElement.style.borderRadius = "0";
  offerElement.style.padding = "10px";

  // Удаляем затемнение и кнопку после анимации
  setTimeout(() => {
    if (overlay) overlay.remove();
    const closeButton = offerElement.querySelector(".offer__close");
    if (closeButton) closeButton.remove();
    offerElement.style.position = ""; // Сбрасываем стиль
  }, 300);
}
