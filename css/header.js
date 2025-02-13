document.addEventListener("DOMContentLoaded", function() {
  console.log("header.js загружен");

  var maxAttempts = 10; // например, 10 попыток
  var attempt = 0;
  var intervalId = setInterval(function() {
    attempt++;
    var burgerMenu = document.querySelector('.burger-menu');
    if (burgerMenu) {
      console.log("burger-menu найден");
      burgerMenu.addEventListener("click", function() {
        console.log("Нажата бургер-иконка");
        var navMenu = document.querySelector('.nav-menu');
        if (navMenu) {
          navMenu.classList.toggle('active');
        } else {
          console.error("Элемент .nav-menu не найден");
        }
      });
      clearInterval(intervalId);
    } else {
      console.log("burger-menu не найден, попытка " + attempt);
      if (attempt >= maxAttempts) {
        clearInterval(intervalId);
        console.error("Не удалось найти .burger-menu после " + maxAttempts + " попыток");
      }
    }
  }, 500); // проверяем каждые 500 мс
});

document.addEventListener("DOMContentLoaded", function () {
  const burger = document.querySelector(".burger-menu");
  const menu = document.querySelector(".nav-menu");
  const overlay = document.createElement("div"); // Создаём оверлей
  overlay.classList.add("overlay");
  document.body.appendChild(overlay); // Добавляем в DOM

  burger.addEventListener("click", function () {
    menu.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("noscroll"); // Блокируем скролл
    burger.classList.toggle("active");
  });

  // Закрываем меню при клике вне него
  overlay.addEventListener("click", function () {
    menu.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("noscroll");
    burger.classList.remove("active");
  });
});
