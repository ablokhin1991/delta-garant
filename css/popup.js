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
    marginBottom: offerElement.style.marginBottom || "",
  });

  // Устанавливаем offer в фиксированное положение
  offerElement.style.position = "fixed";
  offerElement.style.top = `${offerRect.top}px`;
  offerElement.style.left = `${offerRect.left}px`;
  offerElement.style.width = `${offerRect.width}px`;
  offerElement.style.height = `${offerRect.height}px`;
  offerElement.style.zIndex = "1000";
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
  }, 0);

  // Плавно сжимаем пустое пространство под оффер-листом
  offerList.style.marginBottom = "0";
  offerList.classList.add("offer-list--adjust");
}

function hidePopupEffect(offerElement, overlay, offerList) {
  overlay.classList.remove("offer__overlay--active"); // Скрыть затемнение

  const originalStyles = JSON.parse(offerElement.dataset.originalStyles);

  // Анимация возвращения на место (плавное опускание)
  offerElement.style.transform = "translate(0, 0) scale(1)";
  offerElement.style.top = `${originalStyles.top}`;
  offerElement.style.left = `${originalStyles.left}`;
  offerElement.style.width = `${originalStyles.width}`;
  offerElement.style.height = `${originalStyles.height}`;
  offerElement.style.boxShadow = originalStyles.boxShadow;
  offerElement.style.borderRadius = originalStyles.borderRadius;
  offerElement.style.transition = "all 0.4s ease-in-out";

  // Остальные офферы медленно освобождают место
  offerList.style.marginBottom = "20px";
  offerList.classList.remove("offer-list--adjust");

  setTimeout(() => {
    // Возвращаем исходные стили
    Object.keys(originalStyles).forEach((key) => {
      offerElement.style[key] = originalStyles[key];
    });

    offerElement.classList.remove("offer--active");

    // Удаляем кнопку закрытия
    const closeButton = offerElement.querySelector(".offer__close");
    if (closeButton) closeButton.remove();
  }, 400);
}
