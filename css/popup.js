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
        <div class="popup__logo"></div>
        <div class="popup__details"></div>
        <div class="popup__personal-data"></div>
        <div class="popup__rating"></div>
        <div class="popup__separator"></div>
        <div class="popup__rate"></div>
      </div>
      <form class="popup__form">
        <input type="text" placeholder="ФИО" class="popup__input" required>
        <input type="email" placeholder="Электронная почта" class="popup__input" required>
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
    const personalData = offerElement.querySelector(".offer__personal-data")?.innerHTML || "";
    const rating = offerElement.querySelector(".offer__rating")?.innerHTML || "";
    const rate = offerElement.querySelector(".offer__rate").innerHTML;

    popup.querySelector(".popup__logo").style.backgroundImage = logo;
    popup.querySelector(".popup__details").innerHTML = details;
    popup.querySelector(".popup__personal-data").innerHTML = personalData;
    popup.querySelector(".popup__rating").innerHTML = rating;
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
        autoPlaceholder: "off",
        nationalMode: false
    });

    // Кастомный плейсхолдер для России
    phoneInput.setAttribute("placeholder", "(999) 999-99-99");

    // Обновление маски при смене страны
    phoneInput.addEventListener("countrychange", function() {
        if (iti.getSelectedCountryData().iso2 === "ru") {
            phoneInput.setAttribute("placeholder", "(999) 999-99-99");
        } else {
            phoneInput.setAttribute("placeholder", "Введите номер телефона");
        }
    });

    // Блокировка нечисловых символов
    phoneInput.addEventListener("keypress", function(e) {
        if (!/\d/.test(e.key)) e.preventDefault();
    });

    // Валидация при отправке формы
    form.addEventListener("submit", function(e) {
        const countryCode = iti.getSelectedCountryData().iso2;
        const fullNumber = iti.getNumber();
        
        // Специальная проверка для России
        if (countryCode === "ru") {
            const cleanNumber = fullNumber.replace(/\D/g, "");
            if (cleanNumber.length !== 11 || !cleanNumber.startsWith("7")) {
                alert("Российский номер должен начинаться с +7 и содержать 10 цифр!");
                e.preventDefault();
                return;
            }
        }
        
        if (!iti.isValidNumber()) {
            alert("Введите корректный номер телефона для выбранной страны!");
            e.preventDefault();
        }
    });

    // Автоматическое форматирование для России
    phoneInput.addEventListener("input", function() {
        if (iti.getSelectedCountryData().iso2 === "ru") {
            let value = this.value.replace(/\D/g, "").substring(1);
            value = value.substring(0, 10);
            const match = value.match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
            this.value = !match[2] ? match[1] : `(${match[1]}) ${match[2]}${match[3] ? `-${match[3]}` : ""}`;
        }
    }, false);
});