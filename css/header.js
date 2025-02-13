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
