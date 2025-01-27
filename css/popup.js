document.addEventListener('DOMContentLoaded', function() {
  // Убедитесь, что результаты уже загружены и хранятся в переменной results
  const results = [
    // Ваши данные банков
  ];

  console.log('Popup script loaded.');

  // Проверка наличия кнопок "Оформить"
  const offerButtons = document.querySelectorAll('.offer__button');
  if (offerButtons.length === 0) {
    console.error('No offer buttons found.');
  } else {
    console.log(`Found ${offerButtons.length} offer buttons.`);
  }

  // Добавляем обработчики событий для кнопок "Оформить"
  offerButtons.forEach(button => {
    button.addEventListener('click', async function() {
      console.log('Offer button clicked.');

      const index = this.getAttribute('data-index');
      const result = results[index];

      if (!result) {
        console.error('Result not found for index:', index);
        return;
      }

      // Заполняем информацию о банке в popup
      const popupBankInfo = document.getElementById('popup-bank-info');
      if (popupBankInfo) {
        popupBankInfo.innerHTML = `
          <div class="offer__logo" style="width: 50px; height: 50px; background-image: url('${result.logo}'); background-size: cover; background-position: center; margin-bottom: 10px;"></div>
          <strong>${result.name}</strong>
          <div>Стоимость: ${result.cost.toLocaleString()} руб.</div>
          <div>Ставка: ${result.rate}% годовых</div>
        `;
      } else {
        console.error('Popup bank info element not found!');
        return;
      }

      // Открываем popup
      const popup = document.getElementById('popup');
      if (popup) {
        popup.style.display = 'block';

        // Пример добавления класса для анимации
        const buttonInsidePopup = document.querySelector('#popup-content .offer__button');
        if (buttonInsidePopup) {
          buttonInsidePopup.classList.add('move-down');
        } else {
          console.error('Button inside popup not found!');
        }
      } else {
        console.error('Popup element not found!');
      }
    });
  });

  // Закрываем popup при нажатии на крестик
  const closePopupButton = document.getElementById('close-popup');
  if (closePopupButton) {
    closePopupButton.addEventListener('click', function() {
      const popup = document.getElementById('popup');
      if (popup) {
        popup.style.display = 'none';
      }
    });
  } else {
    console.error('Close popup button not found!');
  }

  // Также закрываем popup при клике вне его содержимого
  const popupElement = document.getElementById('popup');
  if (popupElement) {
    popupElement.addEventListener('click', function(e) {
      if (e.target === this) {
        this.style.display = 'none';
      }
    });
  } else {
    console.error('Popup element not found!');
  }

  // Обработка отправки формы
  const applicationForm = document.getElementById('application-form');
  if (applicationForm) {
    applicationForm.addEventListener('submit', async function(event) {
      event.preventDefault();

      const formData = new FormData(this);
      const data = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        bankName: results[document.querySelector('#popup-content .offer__button').getAttribute('data-index')].name,
        cost: results[document.querySelector('#popup-content .offer__button').getAttribute('data-index')].cost,
        rate: results[document.querySelector('#popup-content .offer__button').getAttribute('data-index')].rate
      };

      try {
        const response = await fetch('https://your-server.com/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        if (response.ok) {
          alert('Заявка успешно отправлена!');
          const popup = document.getElementById('popup');
          if (popup) {
            popup.style.display = 'none';
          }
        } else {
          alert('Ошибка отправки заявки.');
        }
      } catch (error) {
        console.error('Ошибка:', error);
        alert('Произошла ошибка при отправке заявки.');
      }
    });
  } else {
    console.error('Application form not found!');
  }
});

const index = this.getAttribute('data-index');
const result = results[index];
if (!result) {
  console.error('Result not found for index:', index);
  return;
}
console.log('Selected result:', result);