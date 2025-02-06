document.addEventListener("DOMContentLoaded", function () {
    const popupOverlay = document.querySelector(".popup-contact__overlay");
    const popup = document.querySelector(".popup-contact");
    const closeButton = document.querySelector(".popup-contact__close");
    const body = document.body;
    const phoneInput = document.querySelector("#popup-contact-phone");
    const form = document.querySelector(".popup-contact__form");

    // Открытие popup
    function openPopup() {
        popupOverlay.classList.add("popup-contact__overlay--active");
        popup.classList.add("popup-contact--active");
        body.style.overflow = "hidden";
    }

    // Закрытие popup
    function closePopup() {
        popupOverlay.classList.remove("popup-contact__overlay--active");
        popup.classList.remove("popup-contact--active");
        body.style.overflow = "";
    }

    // Открываем popup по клику на кнопку "Отправить заявку"
    document.body.addEventListener("click", (event) => {
        if (event.target.classList.contains("cta-button")) {
            event.preventDefault();
            openPopup();
        }
    });

    // Закрываем popup по клику на крестик или overlay
    closeButton.addEventListener("click", closePopup);
    popupOverlay.addEventListener("click", closePopup);

    // ==============================
    // 📞 Маска для телефона
    // ==============================
    document.addEventListener("input", (event) => {
        if (event.target.classList.contains("phone-mask")) {
            event.target.value = event.target.value.replace(/[^0-9+]/g, "");
        }
    });

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

    // ==============================
    // 📧 Валидация Email
    // ==============================
    const emailInput = document.querySelector('.popup-contact__input[type="email"]');

    // Маска при вводе
    emailInput.addEventListener('input', function(e) {
        let value = this.value.toLowerCase();
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

    // Проверка email перед отправкой формы
    form.addEventListener("submit", function(e) {
        const emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailInput.value);
        if (!emailValid) {
            alert('Введите корректный email в формате: name@email.ru');
            e.preventDefault();
        }
    });

    // ==============================
    // 📱 Анимация возврата формы в нормальное состояние
    // ==============================
    function resetFormScale() {
        body.classList.add("reset-scale");
        setTimeout(() => {
            body.classList.remove("reset-scale");
        }, 300);
    }

    function closeKeyboard() {
        document.activeElement.blur();
        resetFormScale();
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        closeKeyboard();
    });

    const style = document.createElement("style");
    style.innerHTML = `
        body {
            transition: transform 0.3s ease-in-out;
        }
        .reset-scale {
            transform: scale(1);
        }
    `;
    document.head.appendChild(style);
});
