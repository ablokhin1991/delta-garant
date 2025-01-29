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
    marginBottom: offerElement.style.marginBottom || "",
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
  }, 0);

  // Плавно сжимаем пустое пространство под оффер-листом
  offerList.style.marginBottom = "0";

  // Убираем влияние оффера на остальной список
  offerList.classList.add("offer-list--adjust");
}

function hidePopupEffect(offerElement, overlay, offerList) {
  overlay.classList.remove("offer__overlay--active"); // Скрыть затемнение

  // Восстанавливаем начальные стили offer
  const originalStyles = JSON.parse(offerElement.dataset.originalStyles);

  // Анимация уменьшения и возвращения на место
  offerElement.style.transform = "none"; // Убираем масштабирование
  offerElement.style.top = `${originalStyles.top}`;
  offerElement.style.left = `${originalStyles.left}`;
  offerElement.style.width = `${originalStyles.width}`;
  offerElement.style.height = `${originalStyles.height}`;
  offerElement.style.boxShadow = originalStyles.boxShadow;
  offerElement.style.borderRadius = originalStyles.borderRadius;

  // Ждём завершения анимации
  setTimeout(() => {
    // Возвращаем исходные стили
    Object.keys(originalStyles).forEach((key) => {
      offerElement.style[key] = originalStyles[key];
    });

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