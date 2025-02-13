// Скрипт для переключения мобильного меню
document.addEventListener("DOMContentLoaded", function() {
  console.log("header.js загружен");

  // Получаем элемент, куда вставляется шапка
  var headerPlaceholder = document.getElementById('header-placeholder');
  if (!headerPlaceholder) {
    console.error("Контейнер #header-placeholder не найден");
    return;
  }

  // Создаём наблюдатель за изменениями внутри контейнера
  var observer = new MutationObserver(function(mutations, obs) {
    // Если внутри контейнера появился контент
    if (headerPlaceholder.innerHTML.trim().length > 0) {
      console.log("Контент шапки вставлен");

      // Пытаемся найти элемент бургер-меню внутри шапки
      var burgerMenu = headerPlaceholder.querySelector('.burger-menu');
      console.log("burgerMenu:", burgerMenu);
      if (burgerMenu) {
        burgerMenu.addEventListener("click", function() {
          console.log("Нажата бургер-иконка");
          // Ищем меню внутри шапки (если оно находится там)
          var navMenu = headerPlaceholder.querySelector('.nav-menu');
          if (navMenu) {
            navMenu.classList.toggle('active');
          } else {
            console.error("Элемент .nav-menu не найден внутри шапки");
          }
        });
        // После успешного обнаружения, отключаем наблюдатель
        obs.disconnect();
      } else {
        console.error("Элемент .burger-menu не найден в шапке");
      }
    }
  });

  // Запускаем наблюдатель за дочерними элементами и их изменениями
  observer.observe(headerPlaceholder, { childList: true, subtree: true });
});
