document.addEventListener("DOMContentLoaded", () => {
    // Добавление слушателя на все кнопки "Оформить"
    document.body.addEventListener("click", (event) => {
      if (event.target.classList.contains("offer__button")) {
        const button = event.target;
        const offerElement = button.closest(".offer");
  
        if (offerElement) {
          openPopup(offerElement);
        }
      }
    });
  
    // Функция открытия popup
    function openPopup(offerElement) {
      // Создание затемнения фона
      const overlay = document.createElement("div");
      overlay.className = "popup-overlay";
  
      // Создание контента popup
      const popup = document.createElement("div");
      popup.className = "popup";
  
      // Копирование данных из offer в popup
      const clonedOffer = offerElement.cloneNode(true);
      clonedOffer.className = "popup-offer";
  
      // Перемещение кнопки "Оформить" вниз popup
      const button = clonedOffer.querySelector(".offer__button");
      button.textContent = "Отправить заявку";
      button.style.marginTop = "20px";
  
      // Создание формы для контактов
      const contactForm = document.createElement("form");
      contactForm.className = "popup-contact-form";
      contactForm.innerHTML = `
        <h3>Оставьте ваши данные</h3>
        <label>
          ФИО:
          <input type="text" name="name" placeholder="Введите ваше ФИО" required>
        </label>
        <label>
          Телефон:
          <input type="tel" name="phone" placeholder="Введите ваш телефон" required>
        </label>
        <label>
          Email:
          <input type="email" name="email" placeholder="Введите ваш email" required>
        </label>
        <button type="submit">Отправить</button>
      `;
  
      // Добавление обработчика формы
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Заявка отправлена!");
        closePopup();
      });
  
      // Добавление заголовка и содержимого в popup
      popup.innerHTML = `<h2>Заявка на оформление банковской гарантии</h2>`;
      popup.appendChild(clonedOffer);
      popup.appendChild(contactForm);
  
      // Добавление кнопки закрытия
      const closeButton = document.createElement("button");
      closeButton.className = "popup-close-button";
      closeButton.textContent = "×";
      closeButton.addEventListener("click", closePopup);
      popup.appendChild(closeButton);
  
      // Добавление popup и overlay в документ
      document.body.appendChild(overlay);
      document.body.appendChild(popup);
  
      // Анимация появления
      setTimeout(() => {
        overlay.classList.add("visible");
        popup.classList.add("visible");
      }, 10);
    }
  
    // Функция закрытия popup
    function closePopup() {
      const overlay = document.querySelector(".popup-overlay");
      const popup = document.querySelector(".popup");
  
      if (overlay && popup) {
        overlay.classList.remove("visible");
        popup.classList.remove("visible");
  
        // Удаление элементов после анимации
        setTimeout(() => {
          overlay.remove();
          popup.remove();
        }, 300);
      }
    }
  });
  
  // Вставка CSS в документ
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.textContent = popupStyles;
  document.head.appendChild(styleSheet);
  