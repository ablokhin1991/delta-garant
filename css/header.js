document.addEventListener("DOMContentLoaded", function() {
  console.log("header.js загружен");

  const burgerMenu = document.querySelector('.burger-menu');
  const navMenu = document.querySelector('.nav-menu');

  if (burgerMenu && navMenu) {
    burgerMenu.addEventListener('click', () => {
      console.log('Бургер меню нажато');
      navMenu.classList.toggle('active');
      
      // Анимация бургера
      burgerMenu.classList.toggle('active');
    });
  } else {
    console.error('Элементы бургер-меню или навигации не найдены');
  }
});