// Скрипты для страницы "О нас"

// Модальное окно для отзывов
function openModal(imgSrc) {
    document.getElementById('modalImage').src = imgSrc;
    document.getElementById('reviewModal').style.display = 'block';
  }
  
  function closeModal() {
    document.getElementById('reviewModal').style.display = 'none';
  }
  
  // Закрытие при клике вне изображения
  window.onclick = function(event) {
    if (event.target == document.getElementById('reviewModal')) {
      closeModal();
    }
  }



 // Увеличение картинок при скролле в мобильной версии
 document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll(".advantage-icon, .team-photo, .review-thumbnail");

    function handleScroll() {
        const windowHeight = window.innerHeight;
        
        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const elementCenter = rect.top + rect.height / 2; // Центр элемента
            const activationZoneTop = 100; // Верхний запас
            const activationZoneBottom = windowHeight - 100; // Нижний запас

            if (elementCenter > activationZoneTop && elementCenter < activationZoneBottom) {
                element.classList.add("scrolled");
            } else {
                element.classList.remove("scrolled");
            }
        });
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Запуск проверки при загрузке страницы
});

// Добавляем этот скрипт для модального окна отзывов

let currentModal = null;

function openModal(imgSrc) {
    currentModal = document.querySelector('.modal');
    const modalImg = currentModal.querySelector('.modal-img');
    modalImg.src = imgSrc;
    currentModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    if (currentModal) {
        currentModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Закрытие по клику вне изображения
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        closeModal();
    }
});

// Закрытие по ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && currentModal.classList.contains('active')) {
        closeModal();
    }
});


// popup
document.addEventListener("DOMContentLoaded", () => {
  // Функция для открытия popup без параметров (без калькулятора)
  function openPopupWithoutParams() {
      const popup = document.querySelector(".popup");
      const popupOverlay = document.querySelector(".popup__overlay");
      const body = document.body;

      // Проверяем, существует ли popup
      if (!popup || !popupOverlay) return;

      // Очищаем параметры и скрываем секцию "Выбранный банк"
      const parametersContainer = popup.querySelector(".popup__parameters");
      const bankSection = popup.querySelector(".popup__offer");

      if (parametersContainer) {
          parametersContainer.innerHTML = `
              <p class="popup__no-params">
                  Параметры не выбраны, чтобы выбрать параметры воспользуйтесь калькулятором расчета стоимости гарантии.
              </p>
              <a href="/" class="popup__calculator-button">Калькулятор</a>
          `;
      }

      // Скрываем "Выбранный банк"
      if (bankSection) {
          bankSection.style.display = "none";
      }

      // Открываем popup
      popupOverlay.classList.add("popup__overlay--active");
      popup.classList.add("popup--active");
      body.style.overflow = "hidden"; // Отключаем скролл фона
  }

  // Добавляем обработчик на все кнопки "Отправить заявку" и "popup-trigger"
  document.body.addEventListener("click", (event) => {
      if (event.target.classList.contains("popup-trigger") || event.target.classList.contains("cta-button")) {
          event.preventDefault(); // Отменяем стандартное действие ссылки
          openPopupWithoutParams();
      }
  });
});

