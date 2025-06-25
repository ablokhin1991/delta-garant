document.addEventListener("DOMContentLoaded", function () {
  // Элементы popup
  const popupOverlay = document.querySelector(".popup-order__overlay");
  const popup = document.querySelector(".popup-order");
  const closeButton = document.querySelector(".popup-order__close");
  const body = document.body;
  const phoneInput = document.querySelector("#popup-order-phone");
  const form = document.querySelector("#order-form");
  const amountInput = document.getElementById("guarantee-amount");
  const procedureSelect = document.getElementById("procedure-type");
  const guaranteeSelect = document.getElementById("guarantee-type");

  // Открытие/закрытие popup
  function openPopup() {
    popupOverlay.classList.add("popup-order__overlay--active");
    popup.classList.add("popup-order--active");
    body.style.overflow = "hidden";
  }
  function closePopup() {
    popupOverlay.classList.remove("popup-order__overlay--active");
    popup.classList.remove("popup-order--active");
    body.style.overflow = "";
  }
  document.body.addEventListener("click", e => {
    if (e.target.classList.contains("order-button")) {
      e.preventDefault();
      openPopup();
    }
  });
  closeButton.addEventListener("click", closePopup);
  popupOverlay.addEventListener("click", closePopup);
  popup.addEventListener("click", e => e.stopPropagation());

  // Маска телефона и intl-tel-input
  let iti = null;
  if (phoneInput) {
    iti = window.intlTelInput(phoneInput, {
      initialCountry: "ru",
      preferredCountries: ["ru", "by", "kz"],
      separateDialCode: true,
      utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
      autoPlaceholder: "off"
    });
    phoneInput.placeholder = "(999) 999-99-99";

    phoneInput.addEventListener("countrychange", function () {
      const countryCode = iti.getSelectedCountryData().iso2;
      phoneInput.placeholder = (countryCode === "ru") ? "(999) 999-99-99" : "Введите номер телефона";
    });
    phoneInput.addEventListener("keypress", function (e) {
      if (!/\d/.test(e.key)) e.preventDefault();
    });
    phoneInput.addEventListener("input", function () {
      const countryCode = iti.getSelectedCountryData().iso2;
      if (countryCode === "ru") formatPhoneNumber(phoneInput);
    });
  }

  function formatPhoneNumber(input) {
    let v = input.value.replace(/\D/g, "").substring(0, 10);
    let f = "";
    if (v.length > 0) {
      f = "(" + v.substring(0, 3);
      if (v.length >= 4) f += ") " + v.substring(3, 6);
      if (v.length >= 7) f += "-" + v.substring(6, 8);
      if (v.length >= 9) f += "-" + v.substring(8, 10);
    }
    input.value = f;
  }

  // Автоформат суммы
  if (amountInput) {
    amountInput.addEventListener("input", function () {
      let v = this.value.replace(/[^\d]/g, "");
      this.value = v ? parseInt(v, 10).toLocaleString("ru-RU") : "";
    });
  }

  // Логика опций гарантий
  if (procedureSelect && guaranteeSelect) {
    const advanceOption = guaranteeSelect.querySelector('option[value="advance"]');
    procedureSelect.addEventListener("change", function () {
      if (this.value === "44-fz") {
        advanceOption.disabled = true;
        if (guaranteeSelect.value === "advance") guaranteeSelect.value = "";
      } else advanceOption.disabled = false;
    });
  }

  // Отправка формы + валидация телефона
  if (form) {
    form.addEventListener("submit", function (e) {
      if (iti && phoneInput) {
        const cc = iti.getSelectedCountryData().iso2;
        const clean = phoneInput.value.replace(/\D/g, "");
        const valid = iti.isValidNumber();

        if (cc === "ru") {
          if (!valid || clean.length !== 10) {
            alert("Для России требуется 10 цифр после кода +7");
            e.preventDefault();
            return;
          }
        } else {
          if (!valid) {
            alert("Введите корректный номер телефона");
            e.preventDefault();
            return;
          }
        }
      }

      // Собираем остальные данные
      e.preventDefault();
      const fd = new FormData(form);
      const data = {};
      fd.forEach((v, k) => data[k] = v);

      fetch('form-handler.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(res => {
          if (res.success) {
            showSuccess();
            form.reset();
            setTimeout(closePopup, 3000);
          } else alert("Ошибка: " + (res.message || "попробуйте позже"));
        })
        .catch(() => alert("Ошибка сети. Попробуйте ещё раз."));
    });
  }

  function showSuccess() {
    form.style.display = "none";
    const html = `
      <div class="popup-order__success">
        <div class="popup-order__success-icon">✓</div>
        <p class="popup-order__success-message">
          Ваша заявка успешно отправлена!<br>Мы свяжемся с вами в ближайшее время.
        </p>
      </div>`;
    document.querySelector('.popup-order__content').insertAdjacentHTML('beforeend', html);
  }

});
