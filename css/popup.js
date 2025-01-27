document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (event) => {
    if (event.target.classList.contains("offer__button")) {
      const offerElement = event.target.closest(".offer");
      if (offerElement) {
        showPopupEffect(offerElement);
      }
    }

    if (event.target.classList.contains("offer__close") || event.target.classList.contains("offer__overlay")) {
      const activeOffer = document.querySelector(".offer--active");
      if (activeOffer) {
        hidePopupEffect(activeOffer);
      }
    }
  });
});

function showPopupEffect(offerElement) {
  // Создаем затемнение фона
  const overlay = createOverlay();
  document.body.appendChild(overlay);

  // Сохраняем начальные стили offer
  const offerRect = offerElement.getBoundingClientRect();
  offerElement.dataset.originalStyles = JSON.stringify({
    position: offerElement.style.position || "",
    top: offerElement.style.top || "",
    left: offerElement.style.left || "",
    width: offerElement.style.width || "",
    height: offerElement.style.height || "",
    zIndex: offerElement.style.zIndex || "",
    transform: offerElement.style.transform || "",
    boxShadow: offerElement.style.boxShadow || "",
    borderRadius: offerElement.style.borderRadius || "",
  });

  // Устанавливаем offer в фиксированное положение
  offerElement.style.position = "fixed";
  offerElement.style.top = `${offerRect.top}px`;
  offerElement.style.left = `${offerRect.left}px`;
  offerElement.style.width = `${offerRect.width}px`;
  offerElement.style.height = `${offerRect.height}px`;
  offerElement.style.zIndex = "1001"; // Гарантируем, что это выше overlay
  offerElement.style.transition = "all 0.4s ease-in-out";
  offerElement.classList.add("offer--active");

  // Плавное увеличение и центрирование
  setTimeout(() => {
    offerElement.style.transform = "translate(-50%, -50%) scale(1.1)";
    offerElement.style.top = "50%";
    offerElement.style.left = "50%";
    offerElement.style.width = "80%";
    offerElement.style.height = "auto";
    offerElement.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.3)";
    offerElement.style.borderRadius = "10px";
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
    z-index: 1002; /* Выше, чем сам offer */
  `;
  offerElement.appendChild(closeButton);
}

function hidePopupEffect(offerElement) {
  const overlay = document.querySelector(".offer__overlay");

  // Восстанавливаем начальные стили
  const originalStyles = JSON.parse(offerElement.dataset.originalStyles);
  Object.keys(originalStyles).forEach((key) => {
    offerElement.style[key] = originalStyles[key];
  });

  // Удаляем временные стили (boxShadow, transform, borderRadius)
  offerElement.style.boxShadow = "";
  offerElement.style.transform = "";
  offerElement.style.borderRadius = "";
  offerElement.style.transition = "all 0.4s ease-in-out";

  offerElement.classList.remove("offer--active");

  // Удаляем затемнение и кнопку закрытия
  setTimeout(() => {
    if (overlay) overlay.remove();
    const closeButton = offerElement.querySelector(".offer__close");
    if (closeButton) closeButton.remove();
  }, 400);
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
    z-index: 999; /* Фон гарантированно под offer */
  `;
  return overlay;
}


