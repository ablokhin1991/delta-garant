document.addEventListener("DOMContentLoaded", function () {
    const popupOverlay = document.querySelector(".popup-order__overlay");
    const popup = document.querySelector(".popup-order");
    const closeButton = document.querySelector(".popup-order__close");
    const body = document.body;
    const form = document.querySelector("#order-form");
    const phoneInput = document.querySelector("#popup-order-phone");
    const emailInput = form.querySelector('input[name="email"]');

    // Open popup
    document.body.addEventListener("click", (e) => {
        if (e.target.classList.contains("order-button")) {
            e.preventDefault();
            popupOverlay.classList.add("popup-order__overlay--active");
            popup.classList.add("popup-order--active");
            body.style.overflow = "hidden";
        }
    });

    // Close popup
    closeButton.addEventListener("click", closePopup);
    popupOverlay.addEventListener("click", closePopup);
    popup.addEventListener("click", e => e.stopPropagation());

    function closePopup() {
        popupOverlay.classList.remove("popup-order__overlay--active");
        popup.classList.remove("popup-order--active");
        body.style.overflow = "";
        form.style.display = "block";
        const success = popup.querySelector(".popup-order__success");
        if (success) success.remove();
    }

    // ==============================
    // Телефон: маска + валидация
    // ==============================
    const iti = window.intlTelInput(phoneInput, {
        initialCountry: "ru",
        preferredCountries: ["ru", "by", "kz"],
        separateDialCode: true,
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
        autoPlaceholder: "off"
    });

    phoneInput.placeholder = "(999) 999-99-99";

    phoneInput.addEventListener("countrychange", function () {
        const iso = iti.getSelectedCountryData().iso2;
        phoneInput.placeholder = iso === "ru" ? "(999) 999-99-99" : "Введите номер телефона";
    });

    phoneInput.addEventListener("keypress", e => {
        if (!/\d/.test(e.key)) e.preventDefault();
    });

    phoneInput.addEventListener("input", function () {
        if (iti.getSelectedCountryData().iso2 === "ru") {
            let val = this.value.replace(/\D/g, "").slice(0, 10);
            let res = "";
            if (val.length > 0) res += "(" + val.slice(0, 3);
            if (val.length >= 4) res += ") " + val.slice(3, 6);
            if (val.length >= 7) res += "-" + val.slice(6, 8);
            if (val.length >= 9) res += "-" + val.slice(8, 10);
            this.value = res;
        }
    });

    // ==============================
    // Email: HTML5 pattern + доп. JS-проверка
    // ==============================
    function isValidEmail(email) {
        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return pattern.test(email);
    }

    // ==============================
    // Сумма гарантии: формат
    // ==============================
    const amountInput = document.getElementById("guarantee-amount");
    if (amountInput) {
        amountInput.addEventListener("input", function () {
            let value = this.value.replace(/\D/g, "");
            if (value.length > 0) {
                value = parseInt(value).toLocaleString("ru-RU");
            }
            this.value = value;
        });
    }

    // ==============================
    // Выпадающие списки
    // ==============================
    const procedureSelect = document.getElementById("procedure-type");
    const guaranteeSelect = document.getElementById("guarantee-type");

    if (procedureSelect && guaranteeSelect) {
        const advanceOption = guaranteeSelect.querySelector('option[value="advance"]');

        procedureSelect.addEventListener("change", function () {
            if (this.value === "44-fz") {
                advanceOption.disabled = true;
                if (guaranteeSelect.value === "advance") guaranteeSelect.value = "";
            } else {
                advanceOption.disabled = false;
            }
        });
    }

    // ==============================
    // Отправка формы
    // ==============================
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const phoneNumber = phoneInput.value.replace(/\D/g, "");
        const country = iti.getSelectedCountryData().iso2;
        const validPhone = iti.isValidNumber();
        const validEmail = isValidEmail(emailInput.value.trim());

        if (country === "ru" && phoneNumber.length !== 10) {
            alert("Введите 10 цифр телефона для России");
            return;
        }
        if (!validPhone) {
            alert("Введите корректный номер телефона");
            return;
        }
        if (!validEmail) {
            alert("Введите корректный email");
            emailInput.focus();
            return;
        }

        // Отправка данных
        const data = Object.fromEntries(new FormData(form).entries());

        fetch("form-handler.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    showSuccessMessage();
                    form.reset();
                    setTimeout(closePopup, 3000);
                } else {
                    alert("Ошибка отправки: " + (result.message || "Попробуйте позже"));
                }
            })
            .catch(() => {
                alert("Ошибка соединения. Попробуйте позже.");
            });
    });

    function showSuccessMessage() {
        const content = document.querySelector(".popup-order__content");
        form.style.display = "none";
        const msg = document.createElement("div");
        msg.className = "popup-order__success";
        msg.innerHTML = `
            <div class="popup-order__success-icon">✓</div>
            <p class="popup-order__success-message">
                Ваша заявка успешно отправлена!<br>
                Мы свяжемся с вами в ближайшее время.
            </p>
        `;
        content.appendChild(msg);
    }
});
