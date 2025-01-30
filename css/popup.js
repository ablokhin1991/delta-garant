document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  // Создаём popup и overlay
  const popupOverlay = document.createElement("div");
  popupOverlay.classList.add("popup__overlay");

  const popup = document.createElement("div");
  popup.classList.add("popup");

  popup.innerHTML = `
    <button class="popup__close">✖</button>
    <h2 class="popup__title">Заявка на оформление банковской гарантии</h2>
    <div class="popup__content">
      <div class="popup__offer">
        <h2 class="popup__offer__title">Выбранные параметры</h2>
        <div class="popup__logo"></div>
        <div class="popup__details"></div>
        <div class="popup__separator"></div>
        <div class="popup__rate"></div>
      </div>
      <form class="popup__form">
        <input type="text" placeholder="ФИО" class="popup__input" required>
        <input type="email" 
       placeholder="Электронная почта" 
       class="popup__input" 
       pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" 
       title="Введите email в формате: name@email.ru" 
       required>
        <input type="tel" id="phone" class="popup__input" placeholder="Введите номер" required>
        <label class="popup__checkbox-label">
            <input type="checkbox" class="popup__checkbox" checked required>
              Согласен с <a href="policy.html" target="_blank" class="popup__link">политикой обработки персональных данных</a>
        </label>


        <button type="submit" class="popup__submit">Отправить заявку</button>
      </form>
    </div>
  `;

  body.appendChild(popupOverlay);
  body.appendChild(popup);

  // Функция открытия popup с передачей данных
  function openPopup(offerElement) {
    const logo = offerElement.querySelector(".offer__logo").style.backgroundImage;
    const details = offerElement.querySelector(".offer__details").innerHTML;
    const rate = offerElement.querySelector(".offer__rate").innerHTML;

    // Очищаем details от лишних элементов
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = details;
    tempDiv.querySelector('.offer__personal-data')?.remove(); // Удаляем лишний элемент
    
    popup.querySelector(".popup__logo").style.backgroundImage = logo;
    popup.querySelector(".popup__details").innerHTML = tempDiv.innerHTML; // Очищенные details
    popup.querySelector(".popup__rate").innerHTML = rate;

    popupOverlay.classList.add("popup__overlay--active");
    popup.classList.add("popup--active");
    body.style.overflow = "hidden"; // Отключаем скролл фона
  }

  // Функция закрытия popup
  function closePopup() {
    popupOverlay.classList.remove("popup__overlay--active");
    popup.classList.remove("popup--active");
    body.style.overflow = ""; // Включаем скролл фона обратно
  }

  // Слушаем клик по кнопке "Оформить" в офферах
  document.body.addEventListener("click", (event) => {
    if (event.target.classList.contains("offer__button")) {
      const offerElement = event.target.closest(".offer");
      if (offerElement) {
        openPopup(offerElement);
      }
    }
  });

  // Закрытие popup по клику на крестик или overlay
  document.body.addEventListener("click", (event) => {
    if (event.target.classList.contains("popup__close") || event.target.classList.contains("popup__overlay")) {
      closePopup();
    }
  });

  // Маска для телефона (автоформат)
  document.addEventListener("input", (event) => {
    if (event.target.classList.contains("phone-mask")) {
      event.target.value = event.target.value.replace(/[^0-9+]/g, "");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
    const phoneInput = document.querySelector("#phone");
    const form = document.querySelector(".popup__form");

    // Инициализация intl-tel-input
    const iti = window.intlTelInput(phoneInput, {
        initialCountry: "ru",
        preferredCountries: ["ru", "by", "kz"],
        separateDialCode: true,
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
        autoPlaceholder: "off"
    });

    // Установка начального плейсхолдера
    phoneInput.placeholder = "(999) 999-99-99";

    // Обработчик смены страны
    phoneInput.addEventListener("countrychange", function() {
        const countryCode = iti.getSelectedCountryData().iso2;
        phoneInput.placeholder = countryCode === "ru" 
            ? "(999) 999-99-99" 
            : "Введите номер телефона";
    });

    // Блокировка нецифровых символов
    phoneInput.addEventListener("keypress", function(e) {
        if (!/\d/.test(e.key)) e.preventDefault();
    });

    // Обработчик ввода с маской для России
    phoneInput.addEventListener("input", function(e) {
        const countryCode = iti.getSelectedCountryData().iso2;
        let value = this.value.replace(/\D/g, "");
        
        if (countryCode === "ru") {
            // Убираем код страны 7 из обработки
            value = value.substring(0, 10);
            
            let formattedValue = "";
            if (value.length > 0) {
                formattedValue = "(" + value.substring(0, 3);
                if (value.length >= 4) {
                    formattedValue += ") " + value.substring(3, 6);
                }
                if (value.length >= 7) {
                    formattedValue += "-" + value.substring(6, 8);
                }
                if (value.length >= 9) {
                    formattedValue += "-" + value.substring(8, 10);
                }
            }
            this.value = formattedValue;
        }
    });

    // Валидация при отправке
    form.addEventListener("submit", function(e) {
        const countryCode = iti.getSelectedCountryData().iso2;
        const cleanNumber = phoneInput.value.replace(/\D/g, "");
        const isValid = iti.isValidNumber();
        
        if (countryCode === "ru") {
            if (cleanNumber.length !== 10 || !isValid) {
                alert("Для России требуется 10 цифр после +7");
                e.preventDefault();
            }
        } else {
            if (!isValid) {
                alert("Введите корректный номер для выбранной страны");
                e.preventDefault();
            }
        }
    });
});

// Обработчик формы Email:
document.addEventListener("DOMContentLoaded", function () {
    // ... предыдущий код для телефона ...

    // Добавляем валидацию для email
    const emailInput = document.querySelector('input[type="email"]');
    
    // Маска при вводе
    emailInput.addEventListener('input', function(e) {
        let value = this.value.toLowerCase();
        
        // Автозамена доменных зон
        value = value.replace(/@([a-z]+)\.(com|ru|net)$/, (match, domain, zone) => {
            return `@${domain}.${zone}`;
        });
        
        this.value = value;
    });

    // Кастомная валидация
    emailInput.addEventListener('blur', function() {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(this.value)) {
            this.setCustomValidity('Введите email в формате: name@email.ru');
        } else {
            this.setCustomValidity('');
        }
    });

    // В обработчике отправки формы добавляем проверку:
    form.addEventListener("submit", function(e) {
        // ... предыдущие проверки телефона ...
        
        // Проверка email
        const emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailInput.value);
        if (!emailValid) {
            alert('Введите корректный email в формате: name@email.ru');
            e.preventDefault();
        }
    });
});