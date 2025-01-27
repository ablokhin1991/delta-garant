document.addEventListener("DOMContentLoaded", () => {
  const offers = document.querySelectorAll(".offer");
  const overlay = document.querySelector(".offer__overlay");

  offers.forEach((offer) => {
    const originalStyles = { ...offer.style }; // Сохраним начальные стили

    offer.addEventListener("click", () => {
      // Активируем затемнение и оффер
      overlay.classList.add("offer__overlay--active");
      offer.classList.add("offer--active");

      // Блокируем прокрутку страницы
      document.body.style.overflow = "hidden";
    });

    overlay.addEventListener("click", () => {
      // Деактивируем затемнение и оффер
      overlay.classList.remove("offer__overlay--active");
      offer.classList.remove("offer--active");

      // Возвращаем прокрутку страницы
      document.body.style.overflow = "";

      // Восстанавливаем начальные стили оффера
      Object.assign(offer.style, originalStyles);
    });
  });
});
