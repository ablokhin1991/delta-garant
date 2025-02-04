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

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("scrolled");
            } else {
                entry.target.classList.remove("scrolled");
            }
        });
    }, { threshold: 0.3 }); // Срабатывает, когда 30% элемента видно

    elements.forEach(element => observer.observe(element));
});

