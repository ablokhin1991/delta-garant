document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.querySelector(".offer__overlay");
  const offerList = document.getElementById("offer-list");

  document.body.addEventListener("click", (event) => {
    // Открытие оффера
    if (event.target.closest(".offer__button")) {
      const offerElement = event.target.closest(".offer");
      if (offerElement) {
        showPopupEffect(offerElement, overlay, offerList);
      }
    }

    // Закрытие оффера (крестик или overlay)
    if (
      event.target.closest(".offer__close") || // Клик на крестик или его дочерние элементы
      event.target === overlay // Клик точно на overlay (не на его дочерних элементах)
    ) {
      const activeOffer = document.querySelector(".offer--active");
      if (activeOffer) {
        hidePopupEffect(activeOffer, overlay, offerList);
        event.stopPropagation(); // Блокируем всплытие
      }
    }
  });
});

// Остальной код функций showPopupEffect и hidePopupEffect остается без изменений

//*************************************************************************************************************************
function showPopupEffect(offerElement, overlay, offerList) {
  overlay.classList.add("offer__overlay--active");

  const offerRect = offerElement.getBoundingClientRect();
  offerElement.dataset.originalPosition = JSON.stringify({
    top: offerRect.top + window.scrollY,
    left: offerRect.left,
    width: offerRect.width,
    height: offerRect.height
  });

  // Удаляем кнопку "Оформить"
  const offerButton = offerElement.querySelector(".offer__button");
  if (offerButton) {
    offerButton.style.display = "none";
  }

  // Добавляем крестик закрытия (если его нет)
  let closeButton = offerElement.querySelector(".offer__close");
  if (!closeButton) {
    closeButton = document.createElement("button");
    closeButton.classList.add("offer__close");
    closeButton.innerHTML = "✖";
    offerElement.appendChild(closeButton);
  }

  // Создаем форму (если ее нет)
  if (!offerElement.querySelector(".offer__form")) {
    const formHtml = `
      <div class="offer__form">
        <h4>Отправить заявку</h4>
        <input type="text" placeholder="ФИО" class="offer__input">
        <input type="tel" placeholder="Телефон" class="offer__input">
        <input type="email" placeholder="Электронная почта" class="offer__input">
        <label class="offer__checkbox-label">
          <input type="checkbox" class="offer__checkbox">
          Согласен с политикой обработки персональных данных
        </label>
        <button class="offer__submit">Отправить</button>
      </div>`;
    offerElement.insertAdjacentHTML("beforeend", formHtml);
  }

  // Определяем ширину в зависимости от устройства
  let contentWidth = document.querySelector(".content").offsetWidth;
  if (window.innerWidth <= 768) {
    contentWidth = window.innerWidth * 0.9; // 90% экрана на мобильных
  }

  // Всплытие оффера + появление формы
  setTimeout(() => {
    offerElement.style.position = "fixed";
    offerElement.style.top = "50%";
    offerElement.style.left = "50%";
    offerElement.style.width = `${contentWidth}px`;
    offerElement.style.height = "auto";
    offerElement.style.maxHeight = "90vh";
    offerElement.style.overflowY = "auto";
    offerElement.style.transform = "translate(-50%, -50%) scale(1)";
    offerElement.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.3)";
    offerElement.style.borderRadius = "10px";
    offerElement.style.zIndex = "1001"; // Поверх оверлея

    const form = offerElement.querySelector(".offer__form");
    form.style.opacity = "1";
    form.style.maxHeight = "300px";
  }, 100);

  offerList.classList.add("offer-list--adjust");
}

function hidePopupEffect(offerElement, overlay, offerList) {
  overlay.classList.remove("offer__overlay--active");

  const originalPosition = JSON.parse(offerElement.dataset.originalPosition);

  // Плавное скрытие формы
  const form = offerElement.querySelector(".offer__form");
  if (form) {
    form.style.opacity = "0";
    form.style.maxHeight = "0";
  }

  setTimeout(() => {
    offerElement.style.transform = "translate(0, 0) scale(1)";
    offerElement.style.position = "absolute";
    offerElement.style.top = `${originalPosition.top}px`;
    offerElement.style.left = `${originalPosition.left}px`;
    offerElement.style.width = `${originalPosition.width}px`;
    offerElement.style.height = `${originalPosition.height}px`;
    offerElement.style.transition = "all 0.5s ease-in-out";

    setTimeout(() => {
      offerElement.classList.remove("offer--active");

      // Возвращаем кнопку "Оформить"
      const offerButton = offerElement.querySelector(".offer__button");
      if (offerButton) {
        offerButton.style.display = "block";
      }

      // Удаляем крестик закрытия
      const closeButton = offerElement.querySelector(".offer__close");
      if (closeButton) closeButton.remove();

      // Удаляем форму
      if (form) form.remove();

      offerElement.style.position = "";
      offerElement.style.top = "";
      offerElement.style.left = "";
      offerElement.style.width = "";
      offerElement.style.height = "";
      offerElement.style.zIndex = "";
      offerElement.style.boxShadow = "";
      offerElement.style.borderRadius = "";
      offerElement.style.transition = "";

      offerList.classList.remove("offer-list--adjust");
    }, 400);
  }, 200);
}

