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

    // Инициализация intl-tel-input
    const iti = window.intlTelInput(phoneInput, {
        initialCountry: "ru", // Россия по умолчанию
        preferredCountries: ["ru", "ua", "by", "kz"], // Популярные страны
        separateDialCode: true, // Отдельное отображение кода страны
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
    });

    // Убираем старый placeholder и добавляем новый
    phoneInput.setAttribute("placeholder", "(999) 999-99-99");

    // Маска для номера телефона
    Inputmask({
        mask: "(999) 999-99-99",
        showMaskOnHover: false,
        showMaskOnFocus: true,
        placeholder: "_",
        clearMaskOnLostFocus: false,
        onBeforePaste: function (pastedValue) {
            return pastedValue.replace(/\D/g, ""); // Убираем всё, кроме цифр
        }
    }).mask(phoneInput);

    // Валидация перед отправкой формы
    document.querySelector(".popup__form").addEventListener("submit", function (e) {
        const rawNumber = phoneInput.inputmask.unmaskedvalue(); // Очищенный номер (только цифры)
        
        if (rawNumber.length !== 10 || !iti.isValidNumber()) {
            alert("Введите корректный номер телефона!");
            e.preventDefault();
        }
    });

    // Блокируем ввод букв
    phoneInput.addEventListener("keypress", function (e) {
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
        }
    });
});
