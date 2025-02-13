// Скрипт для переключения мобильного меню
    document.addEventListener("DOMContentLoaded", function() {
      var burgerMenu = document.querySelector('.burger-menu');
      burgerMenu.addEventListener("click", function() {
        var navMenu = document.querySelector('.nav-menu');
        navMenu.classList.toggle('active');
      });
    });