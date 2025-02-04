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

  document.addEventListener("DOMContentLoaded", function () {
    const icons = document.querySelectorAll(".advantage-icon");

    function handleScroll() {
        icons.forEach(icon => {
            const rect = icon.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                icon.classList.add("scrolled");
            } else {
                icon.classList.remove("scrolled");
            }
        });
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll();
});
