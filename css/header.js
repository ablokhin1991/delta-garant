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
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");
  document.body.appendChild(overlay);

  function closeMenu() {
    menu.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("noscroll");
    burger.classList.remove("active");
  }

  burger.addEventListener("click", function () {
    menu.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("noscroll");
    burger.classList.toggle("active");
  });

  overlay.addEventListener("click", closeMenu);

  // Закрываем бургер-меню при клике на "Получить консультацию"
  const consultationBtn = document.querySelector(".btn_isp.cta-button");
  if (consultationBtn) {
    consultationBtn.addEventListener("click", function () {
      closeMenu();
      // Открываем попап (если у него есть id "popup")
      const popup = document.getElementById("popup");
      if (popup) {
        popup.classList.add("active");
      }
    });
  }
});

