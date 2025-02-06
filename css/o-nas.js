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

