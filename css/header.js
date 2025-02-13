document.addEventListener("DOMContentLoaded", function () {
  console.log("header.js загружен");

  const burger = document.querySelector(".burger-menu");
  const menu = document.querySelector(".nav-menu");
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");
  document.body.appendChild(overlay);

  if (!burger || !menu) {
    console.error("Не найден .burger-menu или .nav-menu");
    return;
  }

  // Добавляем обработчик клика для бургера
  burger.addEventListener("click", function () {
    console.log("Нажата бургер-иконка");
    menu.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("noscroll");
    burger.classList.toggle("active");
  });

  // Функция закрытия меню
  function closeMenu() {
    menu.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("noscroll");
    burger.classList.remove("active");
  }

  // Закрытие меню при клике на overlay
  overlay.addEventListener("click", closeMenu);

  // Закрытие меню при клике на "Получить консультацию"
  const consultationBtn = document.querySelector(".btn_isp.cta-button");
  if (consultationBtn) {
    consultationBtn.addEventListener("click", function () {
      closeMenu();
      const popup = document.getElementById("popup");
      if (popup) {
        popup.classList.add("active");
      }
    });
  }

  // Обход возможной проблемы с загрузкой элементов
  let maxAttempts = 10;
  let attempt = 0;
  let intervalId = setInterval(function () {
    attempt++;
    if (document.querySelector(".burger-menu")) {
      console.log("burger-menu найден");
      clearInterval(intervalId);
    } else {
      console.log(`burger-menu не найден, попытка ${attempt}`);
      if (attempt >= maxAttempts) {
        clearInterval(intervalId);
        console.error("Не удалось найти .burger-menu после 10 попыток");
      }
    }
  }, 500);
});

