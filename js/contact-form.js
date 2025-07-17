  // Скрипт для формы на странице контакты

document.addEventListener("DOMContentLoaded", function() {
  // Находим форму контактов
  const contactForm = document.getElementById('contact-form-contacts');
  if (!contactForm) return;
  
  // Изолируем элементы формы
  const contactPhoneInput = contactForm.querySelector('input[type="tel"]');
  const contactSubmitBtn = contactForm.querySelector('.submit-btn');
  
  // ==============================
  // 📞 Инициализация intl-tel-input для контактной формы
  // ==============================
  let contactIti = null; // Экземпляр для изоляции
  
  function initContactPhoneInput() {
    if (!contactPhoneInput) return;
    
    // Инициализация intl-tel-input с уникальным именем
    contactIti = window.intlTelInput(contactPhoneInput, {
      initialCountry: "ru",
      preferredCountries: ["ru", "by", "kz"],
      separateDialCode: true,
      utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
      autoPlaceholder: "off",
      customContainer: "contact-intl-tel-input" // Уникальный класс контейнера
    });
    
    // Установка начального плейсхолдера
    contactPhoneInput.placeholder = "(999) 999-99-99";
    
    // Обработчик смены страны
    contactPhoneInput.addEventListener("countrychange", function() {
      const countryCode = contactIti.getSelectedCountryData().iso2;
      contactPhoneInput.placeholder = countryCode === "ru" ? "(999) 999-99-99" : "Введите номер телефона";
    });
    
    // Блокировка нецифровых символов
    contactPhoneInput.addEventListener("keypress", function(e) {
      if (!/\d/.test(e.key)) e.preventDefault();
    });
    
    // Форматирование номера для России
    contactPhoneInput.addEventListener("input", function() {
      const countryCode = contactIti.getSelectedCountryData().iso2;
      if (countryCode === "ru") {
        formatContactPhone(contactPhoneInput);
      }
    });
  }
  
  // Форматирование российского номера
  function formatContactPhone(input) {
    let value = input.value.replace(/\D/g, "");
    if (value.length > 10) value = value.substring(0, 10);

    let formattedValue = "";
    if (value.length > 0) {
        formattedValue = "(" + value.substring(0, 3);
        if (value.length >= 4) formattedValue += ") " + value.substring(3, 6);
        if (value.length >= 7) formattedValue += "-" + value.substring(6, 8);
        if (value.length >= 9) formattedValue += "-" + value.substring(8, 10);
    }
    input.value = formattedValue;
  }

  // ==============================
  // 📤 Отправка формы контактов
  // ==============================
  contactForm.addEventListener("submit", function(e) {
    e.preventDefault();
    
    // Валидация телефона
    if (contactPhoneInput && contactIti) {
      const countryCode = contactIti.getSelectedCountryData().iso2;
      const cleanNumber = contactPhoneInput.value.replace(/\D/g, "");
      const isValid = contactIti.isValidNumber();

      if (countryCode === "ru") {
        if (cleanNumber.length !== 10 || !isValid) {
          alert("Для России требуется 10 цифр после кода страны");
          contactPhoneInput.focus();
          return;
        }
      } else {
        if (!isValid) {
          alert("Введите корректный номер для выбранной страны");
          contactPhoneInput.focus();
          return;
        }
      }
    }
    
    // Проверка чекбокса
    const agreementCheckbox = contactForm.querySelector('#agreement');
    if (agreementCheckbox && !agreementCheckbox.checked) {
      alert("Необходимо согласие с политикой обработки персональных данных");
      return;
    }
    
    // Собираем данные формы
    const formData = new FormData(contactForm);
    const data = {};
    
    // Добавляем номер в международном формате
    if (contactIti) {
      data.phone = contactIti.getNumber();
    }
    
    for (const [key, value] of formData.entries()) {
      // Пропускаем телефон, так как уже обработали
      if (key !== "phone") {
        data[key] = value;
      }
    }
    
    // Добавляем идентификатор формы
    data.formType = "contact-form";
    
    // Показываем индикатор загрузки
    const originalBtnText = contactSubmitBtn.textContent;
    contactSubmitBtn.textContent = "Отправка...";
    contactSubmitBtn.disabled = true;
    
    // Отправка данных на сервер
    fetch('form-handler.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
      if (result.success) {
        // Показываем сообщение об успехе
        showContactSuccessMessage();
        
        // Сброс формы
        contactForm.reset();
        
        // Сброс телефона
        if (contactIti) {
          contactIti.setNumber("");
        }
      } else {
        alert("Ошибка отправки: " + (result.message || "Попробуйте позже"));
      }
    })
    .catch(error => {
      console.error('Ошибка:', error);
      alert("Ошибка сети. Попробуйте еще раз.");
    })
    .finally(() => {
      // Восстанавливаем кнопку
      contactSubmitBtn.textContent = originalBtnText;
      contactSubmitBtn.disabled = false;
    });
  });

  // Показать сообщение об успешной отправке (контакты)
  function showContactSuccessMessage() {
    const successHTML = `
      <div class="contact-success-message">
        <div class="contact-success-icon">✓</div>
        <p class="contact-success-text">
          Ваша заявка успешно отправлена!<br>
          Мы свяжемся с вами в ближайшее время.
        </p>
      </div>
    `;
    
    // Вставляем сообщение перед формой
    contactForm.insertAdjacentHTML('beforebegin', successHTML);
    
    // Автоматическое скрытие через 5 секунд
    setTimeout(() => {
      const successElement = document.querySelector('.contact-success-message');
      if (successElement) {
        successElement.style.opacity = '0';
        setTimeout(() => successElement.remove(), 500);
      }
    }, 5000);
  }
  
  // Инициализируем телефонный ввод
  initContactPhoneInput();
});