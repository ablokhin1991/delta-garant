document.addEventListener("DOMContentLoaded", () => {
  // Добавляем обработчики ко всем кнопкам "Оформить"
  document.body.addEventListener("click", (event) => {
    if (event.target.classList.contains("offer__button")) {
      const offerElement = event.target.closest(".offer"); // Находим родительский offer

      if (offerElement) {
        showPopup(offerElement);
      }
    }

    // Обработчик закрытия popup
    if (event.target.classList.contains("offer-popup__close")) {
      const popup = document.querySelector(".offer-popup");
      if (popup) {
        closePopup(popup);
      }
    }
  });
});

// Функция для отображения popup
function showPopup(offerElement) {
  // Создаем копию offer
  const offerClone = offerElement.cloneNode(true);
  offerClone.classList.add("offer-popup");

  // Добавляем кнопку закрытия
  const closeButton = document.createElement("button");
  closeButton.textContent = "Закрыть";
  closeButton.classList.add("offer-popup__close");
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
  offerClone.appendChild(closeButton);

  // Стили для popup
  offerClone.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.8);
    z-index: 1000;
    width: 80%;
    max-width: 500px;
    background: white;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    padding: 20px;
    animation: popupShow 0.3s ease forwards;
  `;

  // Добавляем popup в body
  document.body.appendChild(offerClone);

  // Затемняющий фон
  const overlay = document.createElement("div");
  overlay.classList.add("offer-popup__overlay");
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
    animation: fadeIn 0.3s ease forwards;
  `;
  document.body.appendChild(overlay);
}

// Функция для закрытия popup
function closePopup(popup) {
  const overlay = document.querySelector(".offer-popup__overlay");

  // Анимация закрытия
  popup.style.animation = "popupHide 0.3s ease forwards";
  if (overlay) overlay.style.animation = "fadeOut 0.3s ease forwards";

  // Удаление элементов после завершения анимации
  setTimeout(() => {
    popup.remove();
    if (overlay) overlay.remove();
  }, 300);
}
