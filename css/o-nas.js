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
window.onload = function () {
    const elements = document.querySelectorAll(".advantage-icon, .team-photo");

    if (elements.length === 0) {
        console.warn("Элементы .advantage-icon и .team-photo не найдены!");
        return;
    }

    console.log("Найденные элементы:", elements);

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    console.log("Добавляем .scrolled:", entry.target);
                    entry.target.classList.add("scrolled");
                } else {
                    console.log("Удаляем .scrolled:", entry.target);
                    entry.target.classList.remove("scrolled");
                }
            });
        });

        elements.forEach(element => observer.observe(element));
    } else {
        console.warn("IntersectionObserver не поддерживается! Фолбэк на scroll.");
        
        function handleScroll() {
            elements.forEach(element => {
                const rect = element.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    console.log("Добавляем .scrolled:", element);
                    element.classList.add("scrolled");
                } else {
                    console.log("Удаляем .scrolled:", element);
                    element.classList.remove("scrolled");
                }
            });
        }

        window.addEventListener("scroll", handleScroll);
        handleScroll();
    }
};



