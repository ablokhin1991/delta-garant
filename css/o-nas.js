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
  
  // Плавная прокрутка для якорей
  //document.querySelectorAll('a[href^="#"]').forEach(anchor => {
   // anchor.addEventListener('click', function(e) {
    //  e.preventDefault();
    //  document.querySelector(this.getAttribute('href')).scrollIntoView({
     //   behavior: 'smooth'
      //});
   // });//
  //});


 // Увеличение картинок при скролле в мобильной версии
 document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll(".advantage-icon, .team-photo");

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

