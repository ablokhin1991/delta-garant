document.addEventListener("DOMContentLoaded", function () {
    // Элементы новой popup-формы
    const popupOverlay = document.querySelector(".popup-order__overlay");
    const popup = document.querySelector(".popup-order");
    const closeButton = document.querySelector(".popup-order__close");
    const body = document.body;
    const phoneInput = document.querySelector("#popup-order-phone");
    const form = document.querySelector("#order-form");
    const emailInput = form.querySelector('input[name="email"]');

    // Открытие popup
    function openPopup() {
        popupOverlay.classList.add("popup-order__overlay--active");
        popup.classList.add("popup-order--active");
        body.style.overflow = "hidden";
    }

    // Закрытие popup
    function closePopup() {
        popupOverlay.classList.remove("popup-order__overlay--active");
        popup.classList.remove("popup-order--active");
        body.style.overflow = "";
        // Убираем сообщение об успехе и показываем форму снова
        const success = popup.querySelector(".popup-order__success");
        if (success) success.remove();
        form.style.display = "";
    }

    // Открываем popup по клику на кнопку "Оставить заявку"
    document.body.addEventListener("click", (event) => {
        if (event.target.classList.contains("order-button")) {
            event.preventDefault();
            openPopup();
        }
    });

    // Закрываем popup по клику на крестик или overlay
    closeButton.addEventListener("click", closePopup);
    popupOverlay.addEventListener("click", closePopup);
    popup.addEventListener("click", (event) => event.stopPropagation());

    // ==============================
    // 📞 Маска и валидация телефона
    // ==============================
    if (phoneInput) {
        // Функция автоформатирования номера (точно работает!)
        function formatPhoneNumber(input) {
            let value = input.value.replace(/\D/g, ""); // Убираем все нецифровые символы
            if (value.length > 10) value = value.substring(0, 10); // Обрезаем лишние цифры

            let formattedValue = "";
            if (value.length > 0) {
                formattedValue = "(" + value.substring(0, 3);
                if (value.length >= 4) formattedValue += ") " + value.substring(3, 6);
                if (value.length >= 7) formattedValue += "-" + value.substring(6, 8);
                if (value.length >= 9) formattedValue += "-" + value.substring(8, 10);
            }
            input.value = formattedValue;
        }

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
            phoneInput.placeholder = countryCode === "ru" ? "(999) 999-99-99" : "Введите номер телефона";
        });

        // Блокировка нецифровых символов
        phoneInput.addEventListener("keypress", function(e) {
            if (!/\d/.test(e.key)) e.preventDefault();
        });

        // 📌 Окончательный фикс: обработка ввода с автоформатом
        phoneInput.addEventListener("input", function() {
            const countryCode = iti.getSelectedCountryData().iso2;
            if (countryCode === "ru") formatPhoneNumber(phoneInput);
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
                    return;
                }
            } else {
                if (!isValid) {
                    alert("Введите корректный номер для выбранной страны");
                    e.preventDefault();
                    return;
                }
            }
        });
    }

    // ==============================
    // 📧 Валидация Email
    // ==============================
    if (emailInput) {
        // Маска при вводе
        emailInput.addEventListener('input', function() {
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
    }

    // ==============================
    // 💰 Автоформат суммы гарантии
    // ==============================
    const amountInput = document.getElementById("guarantee-amount");
    if (amountInput) {
        amountInput.addEventListener("input", function() {
            let value = this.value.replace(/[^\d]/g, "");
            if (value.length > 0) {
                value = parseInt(value, 10).toLocaleString("ru-RU");
            }
            this.value = value;
        });
    }

    // ==============================
    // 🔄 Логика выпадающих списков
    // ==============================
    const procedureSelect = document.getElementById("procedure-type");
    const guaranteeSelect = document.getElementById("guarantee-type");
    if (procedureSelect && guaranteeSelect) {
        const advanceOption = guaranteeSelect.querySelector('option[value="advance"]');
        procedureSelect.addEventListener("change", function() {
            if (this.value === "44-fz") {
                advanceOption.disabled = true;
                advanceOption.selected = false;
                if (guaranteeSelect.value === "advance") {
                    guaranteeSelect.value = "";
                }
            } else {
                advanceOption.disabled = false;
            }
        });
    }

    // ==============================
    // 📤 Отправка формы на сервер
    // ==============================
    if (form) {
        form.addEventListener("submit", function(e) {
            e.preventDefault();

            // Собираем данные формы
            const formData = new FormData(this);
            const data = {};
            for (const [key, value] of formData.entries()) {
                data[key] = value;
            }

            fetch('form-handler.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    showSuccessMessage();
                    form.reset();
                    setTimeout(closePopup, 3000);
                } else {
                    alert("Ошибка отправки: " + (result.message || "Попробуйте позже"));
                }
            })
            .catch(error => {
                console.error('Ошибка:', error);
                alert("Ошибка сети. Попробуйте еще раз.");
            });
        });
    }

    // Показать сообщение об успешной отправке
    function showSuccessMessage() {
        const successHTML = `
            <div class="popup-order__success">
                <div class="popup-order__success-icon">✓</div>
                <p class="popup-order__success-message">
                    Ваша заявка успешно отправлена!<br>
                    Мы свяжемся с вами в ближайшее время.
                </p>
            </div>`;
        form.style.display = 'none';
        document.querySelector('.popup-order__content').insertAdjacentHTML('beforeend', successHTML);
    }
});
