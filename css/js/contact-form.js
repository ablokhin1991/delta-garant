document.addEventListener("DOMContentLoaded", function() {
  // Находим форму контактов
  const contactForm = document.getElementById('contact-form-contacts');
  if (!contactForm) return;
  
  // Изолируем элементы формы
  const contactPhoneInput = contactForm.querySelector('input[type="tel"]');
  const contactSubmitBtn = contactForm.querySelector('.submit-btn');
  
  // ==============================
  // 📞 Маска для телефона (контакты)
  // ==============================
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

  // Инициализация маски для телефона
  if (contactPhoneInput) {
    contactPhoneInput.placeholder = "(999) 999-99-99";
    
    contactPhoneInput.addEventListener("input", function() {
      formatContactPhone(contactPhoneInput);
    });
    
    // Блокировка нецифровых символов
    contactPhoneInput.addEventListener("keypress", function(e) {
      if (!/\d/.test(e.key)) e.preventDefault();
    });
  }

  // ==============================
  // 📤 Отправка формы контактов
  // ==============================
  contactForm.addEventListener("submit", function(e) {
    e.preventDefault();
    
    // Валидация телефона
    if (contactPhoneInput) {
      const phoneDigits = contactPhoneInput.value.replace(/\D/g, "");
      if (phoneDigits.length !== 10) {
        alert("Пожалуйста, введите корректный номер телефона (10 цифр)");
        contactPhoneInput.focus();
        return;
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
    
    for (const [key, value] of formData.entries()) {
      data[key] = value;
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
});