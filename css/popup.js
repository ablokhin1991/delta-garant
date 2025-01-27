document.addEventListener('DOMContentLoaded', function() {
  console.log('Popup script loaded.');

  // Делегирование события для кнопок "Оформить"
  document.getElementById('offer-list').addEventListener('click', async function(event) {
    if (event.target && event.target.classList.contains('offer__button')) {
      console.log('Offer button clicked.');

      const bankName = event.target.getAttribute('data-name');
      const bankLogo = event.target.getAttribute('data-logo');
      const bankCost = event.target.getAttribute('data-cost');
      const bankRate = event.target.getAttribute('data-rate');

      if (!bankName || !bankLogo || !bankCost || !bankRate) {
        console.error('Missing bank data.');
        return;
      }

      console.log('Selected bank:', { name: bankName, logo: bankLogo, cost: bankCost, rate: bankRate });

      // Заполняем информацию о банке в popup
      const popupBankInfo = document.getElementById('popup-bank-info');
      if (popupBankInfo) {
        popupBankInfo.innerHTML = `
          <div class="offer__logo" style="width: 50px; height: 50px; background-image: url('${bankLogo}'); background-size: cover; background-position: center; margin-bottom: 10px;"></div>
          <strong>${bankName}</strong>
          <div>Стоимость: ${bankCost.toLocaleString()} руб.</div>
          <div>Ставка: ${bankRate}% годовых</div>
        `;
      } else {
        console.error('Popup bank info element not found!');
        return;
      }

      // Открываем popup
      const popup = document.getElementById('popup');
      if (popup) {
        popup.style.display = 'block';
      } else {
        console.error('Popup element not found!');
      }
    }
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
        bankName: bankName,
        cost: bankCost,
        rate: bankRate
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