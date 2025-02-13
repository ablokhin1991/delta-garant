// Скрипт для переключения мобильного меню
document.addEventListener("DOMContentLoaded", function() {
    console.log("header.js загружен");
    var burgerMenu = document.querySelector('.burger-menu');
    if (burgerMenu) {
      burgerMenu.addEventListener("click", function() {
        console.log("Нажата бургер-иконка");
        var navMenu = document.querySelector('.nav-menu');
        navMenu.classList.toggle('active');
      });
    } else {
      console.error("Элемент .burger-menu не найден");
    }
  });
  