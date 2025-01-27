document.addEventListener('DOMContentLoaded', function() {
  // Обработчик событий для кнопок "Оформить"
  document.getElementById('offer-list').addEventListener('click', function(event) {
    if (event.target && event.target.classList.contains('offer__button')) {
      // Находим родительский элемент offer
      const offerElement = event.target.closest('.offer');
      if (offerElement) {
        openPopup(offerElement);
      } else {
        console.error('Offer element not found!');
      }
    }
  });

  // Обработчик событий для кнопок закрытия
  document.getElementById('offer-list').addEventListener('click', function(event) {
    if (event.target && event.target.classList.contains('close-popup')) {
      // Находим родительский элемент offer
      const offerElement = event.target.closest('.offer');
      if (offerElement) {
        closePopup(offerElement);
      } else {
        console.error('Offer element not found!');
      }
    }
  });
});

// Функция для открытия всплывающего окна с выбранным предложением
function openPopup(offerElement) {
  // Добавляем класс popup и show для анимации
  offerElement.classList.add('popup', 'show');

  // Также блокируем прокрутку основного контента
  document.body.style.overflow = 'hidden';
}

// Функция для закрытия всплывающего окна
function closePopup(offerElement) {
  // Убираем класс show для анимации и через небольшую задержку убираем класс popup
  offerElement.classList.remove('show');
  setTimeout(() => {
    offerElement.classList.remove('popup');
  }, 300); // Задержка соответствует длительности анимации

  // Разблокируем прокрутку основного контента
  document.body.style.overflow = '';
}