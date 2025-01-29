document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.querySelector(".offer__overlay");
  const offerList = document.getElementById("offer-list");

  document.body.addEventListener("click", (event) => {
    if (event.target.classList.contains("offer__button")) {
      const offerElement = event.target.closest(".offer");
      if (offerElement) {
        showPopupEffect(offerElement, overlay, offerList);
      }
    }

    if (event.target.classList.contains("offer__close") || event.target.classList.contains("offer__overlay")) {
      const activeOffer = document.querySelector(".offer--active");
      if (activeOffer) {
        hidePopupEffect(activeOffer, overlay, offerList);
      }
    }
  });
});

function showPopupEffect(offerElement, overlay, offerList) {
  overlay.classList.add("offer__overlay--active"); // Активируем затемнение

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
  offerElement.style.zIndex = "1000"; // Над затемнением
  offerElement.style.transition = "all 0.4s ease-in-out";
  offerElement.classList.add("offer--active");

  // Анимация увеличения и центрирования
  setTimeout(() => {
    offerElement.style.transform = "translate(-50%, -50%) scale(1.2)";
    offerElement.style.top = "50%";
    offerElement.style.left = "50%";
    offerElement.style.width = "80%";
    offerElement.style.height = "auto";
    offerElement.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.3)";
    offerElement.style.borderRadius = "10px";

    // Плавно сжимаем пустое пространство под оффер-листом
    offerList.style.marginBottom = "0";
  }, 0);

  // Убираем влияние оффера на остальной список
  offerList.classList.add("offer-list--adjust");
}

function hidePopupEffect(offerElement, overlay, offerList) {
  overlay.classList.remove("offer__overlay--active"); // Скрыть затемнение

  // Анимация уменьшения и возвращения на место
  offerElement.style.transform = "translate(-50%, -50%) scale(0.8)"; // Уменьшаем блок
  offerElement.style.opacity = "0"; // Плавно скрываем блок

  // Ждём завершения анимации
  setTimeout(() => {
    // Восстанавливаем начальные стили offer
    const originalStyles = JSON.parse(offerElement.dataset.originalStyles);
    Object.keys(originalStyles).forEach((key) => {
      offerElement.style[key] = originalStyles[key];
    });

    // Удаляем временные стили
    offerElement.style.boxShadow = "";
    offerElement.style.transform = "";
    offerElement.style.borderRadius = "";
    offerElement.style.opacity = ""; // Возвращаем прозрачность
    offerElement.style.transition = "all 0.4s ease-in-out";

    offerElement.classList.remove("offer--active");

    // Возвращаем плавное освобождение пространства под оффер-листом
    offerList.style.marginBottom = "20px";

    // Убираем класс корректировки списка
    offerList.classList.remove("offer-list--adjust");

    // Удаляем кнопку закрытия
    const closeButton = offerElement.querySelector(".offer__close");
    if (closeButton) closeButton.remove();
  }, 400); // Время анимации
}