document.querySelectorAll('.offer__button').forEach(button => {
  button.addEventListener('click', async function() {
    const index = this.getAttribute('data-index');
    const result = results[index];
    
    // Заполняем информацию о банке в popup
    const popupBankInfo = document.getElementById('popup-bank-info');
    popupBankInfo.innerHTML = `
      <div class="offer__logo" style="width: 50px; height: 50px; background-image: url('${result.logo}'); background-size: cover; background-position: center; margin-bottom: 10px;"></div>
      <strong>${result.name}</strong>
      <div>Стоимость: ${result.cost.toLocaleString()} руб.</div>
      <div>Ставка: ${result.rate}% годовых</div>
    `;
    
    // Открываем popup
    document.getElementById('popup').style.display = 'block';
  });
});

document.getElementById('close-popup').addEventListener('click', function() {
  document.getElementById('popup').style.display = 'none';
});

// Также закрываем popup при клике вне его содержимого
document.getElementById('popup').addEventListener('click', function(e) {
  if (e.target === this) {
    this.style.display = 'none';
  }
});

document.getElementById('application-form').addEventListener('submit', async function(event) {
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
      document.getElementById('popup').style.display = 'none';
    } else {
      alert('Ошибка отправки заявки.');
    }
  } catch (error) {
    console.error('Ошибка:', error);
    alert('Произошла ошибка при отправке заявки.');
  }
});

// При открытии popup
document.getElementById('popup').classList.add('show');

// При закрытии popup
document.getElementById('popup').classList.remove('show');

// Для плавного перемещения кнопки "Оформить"
const button = document.querySelector('#popup-content .offer__button');
button.classList.add('move-down');