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
      //const button = clonedOffer.querySelector(".offer__button");
      //button.textContent = "Отправить заявку";
      //button.style.marginTop = "20px";
  
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
  
  // CSS для popup (добавьте в ваш styles.css)
  const popupStyles = `
    .popup-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      opacity: 0;
      transition: opacity 0.3s;
      z-index: 9998;
    }
    .popup-overlay.visible {
      opacity: 1;
    }
    .popup {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0.8);
      width: 90%;
      max-width: 600px;
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
      padding: 20px;
      opacity: 0;
      transition: all 0.3s;
      z-index: 9999;
    }
    .popup.visible {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
    .popup-close-button {
      position: absolute;
      top: 10px;
      right: 10px;
      background: none;
      border: none;
      font-size: 20px;
      cursor: pointer;
    }
    .popup-contact-form {
      display: flex;
      flex-direction: column;
      gap: 15px;
      margin-top: 20px;
    }
    .popup-contact-form label {
      display: flex;
      flex-direction: column;
      font-size: 14px;
    }
    .popup-contact-form input {
      padding: 10px;
      font-size: 14px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    .popup-contact-form button {
      padding: 10px 15px;
      background: #1e3a8a;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background 0.3s;
    }
    .popup-contact-form button:hover {
      background: #162c6b;
    }
  `;
  
  // Вставка CSS в документ
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.textContent = popupStyles;
  document.head.appendChild(styleSheet);
  