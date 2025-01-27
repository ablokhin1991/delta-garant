document.addEventListener('DOMContentLoaded', function() {
  // Функция для открытия всплывающего окна с выбранным предложением
  function openPopup(offerElement) {
    // Создаем контейнер для popup
    const popupContainer = document.createElement('div');
    popupContainer.id = 'popup-container';
    popupContainer.style.position = 'fixed';
    popupContainer.style.top = '0';
    popupContainer.style.left = '0';
    popupContainer.style.width = '100%';
    popupContainer.style.height = '100%';
    popupContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    popupContainer.style.display = 'flex';
    popupContainer.style.justifyContent = 'center';
    popupContainer.style.alignItems = 'center';
    popupContainer.style.zIndex = '1000';

    // Клонируем элемент offer и добавляем его в popup контейнер
    const clonedOffer = offerElement.cloneNode(true);
    clonedOffer.style.backgroundColor = 'white';
    clonedOffer.style.padding = '20px';
    clonedOffer.style.borderRadius = '8px';
    clonedOffer.style.maxWidth = '90%';
    clonedOffer.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.3)';
    clonedOffer.style.width = 'fit-content';

    // Добавляем кнопку закрытия
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '&times;';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '10px';
    closeButton.style.right = '10px';
    closeButton.style.background = 'none';
    closeButton.style.border = 'none';
    closeButton.style.fontSize = '24px';
    closeButton.style.cursor = 'pointer';

    // Закрываем popup при нажатии на крестик
    closeButton.addEventListener('click', function() {
      document.body.removeChild(popupContainer);
    });

    // Также закрываем popup при клике вне его содержимого
    popupContainer.addEventListener('click', function(e) {
      if (e.target === popupContainer) {
        document.body.removeChild(popupContainer);
      }
    });

    // Добавляем кнопку закрытия в клонированный элемент offer
    clonedOffer.appendChild(closeButton);

    // Добавляем клонированный элемент offer в контейнер popup
    popupContainer.appendChild(clonedOffer);

    // Добавляем контейнер popup в body
    document.body.appendChild(popupContainer);
  }

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
});