// Удаляем первый скрипт с setInterval и оставляем только второй обработчик
document.addEventListener("DOMContentLoaded", function () {
  const burger = document.querySelector(".burger-menu");
  const menu = document.querySelector(".nav-menu");
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");
  document.body.appendChild(overlay);

  function toggleMenu() {
    menu.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("noscroll");
    burger.classList.toggle("active");
  }

  function closeMenu() {
    menu.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("noscroll");
    burger.classList.remove("active");
  }

  if (burger && menu) {
    burger.addEventListener("click", toggleMenu);
    overlay.addEventListener("click", closeMenu);
  }

  // Закрытие меню при клике на пункты
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Обработчик для кнопки консультации
  const consultationBtn = document.querySelector(".btn_isp.cta-button");
  if (consultationBtn) {
    consultationBtn.addEventListener("click", function () {
      closeMenu();
      const popup = document.getElementById("popup");
      if (popup) popup.classList.add("active");
    });
  }
});

