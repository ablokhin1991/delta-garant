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

    if (!elements.length) {
        console.error("Элементы .advantage-icon и .team-photo не найдены!");
        return;
    }

    const activeElements = new Set();

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!activeElements.has(entry.target)) {
                    entry.target.classList.add("scrolled");
                    activeElements.add(entry.target);
                    console.log("Добавляем .scrolled:", entry.target);
                }
            } else {
                setTimeout(() => {
                    if (!entry.isIntersecting) {
                        entry.target.classList.remove("scrolled");
                        activeElements.delete(entry.target);
                        console.log("Удаляем .scrolled:", entry.target);
                    }
                }, 300); // 300 мс задержки перед удалением
            }
        });
    }, { threshold: 0.5 }); // Уменьшили порог до 50% видимости

    elements.forEach(element => observer.observe(element));
});
