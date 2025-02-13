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

  function closeMenu() {
    menu.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("noscroll");
    burger.classList.remove("active");
  }

  burger.addEventListener("click", function () {
    console.log("Нажат бургер-меню");
    menu.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("noscroll");
    burger.classList.toggle("active");
  });

  overlay.addEventListener("click", closeMenu);

  const consultationBtn = document.querySelector(".btn_isp.cta-button");
  if (consultationBtn) {
    consultationBtn.addEventListener("click", closeMenu);
  }
});
