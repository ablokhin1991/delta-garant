document.addEventListener("DOMContentLoaded", function () {
  const offer = document.querySelector(".offer__buttons"); // Используем правильный селектор
  const offerButton = document.querySelector(".offer__button"); // Для кнопки используем класс

  if (!offer || !offerButton) {
    console.error("Элемент с классом .offer__buttons или .offer__button не найден!");
    return;
  }

  offerButton.addEventListener("click", function () {
    // Расширяем блок Offer
    offer.classList.add("expanded");

    // Добавляем форму в Offer (если её ещё нет)
    if (!document.querySelector(".form")) {
      const form = document.createElement("div");
      form.className = "form";
      form.innerHTML = `
        <input type="text" id="name" placeholder="Ваше имя" required>
        <input type="email" id="email" placeholder="Ваш email" required>
        <input type="tel" id="phone" placeholder="Ваш телефон" required>
        <button id="submit-button">Отправить заявку</button>
      `;
      offer.appendChild(form);

      // Добавляем логику отправки
      const submitButton = document.getElementById("submit-button");
      submitButton.addEventListener("click", function () {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;

        if (name && email && phone) {
          // Отправка данных на email
          alert(`Заявка отправлена:\nИмя: ${name}\nEmail: ${email}\nТелефон: ${phone}`);
          offer.classList.remove("expanded"); // Закрываем Offer
          offer.querySelector(".form").remove(); // Удаляем форму
        } else {
          alert("Пожалуйста, заполните все поля!");
        }
      });
    }
  });
});
