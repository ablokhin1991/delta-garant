// Функция кнопки сброса
document.getElementById("reset-btn").style.display = "none"; // Скрываем кнопку сброса по умолчанию

document.getElementById("calculate-btn").addEventListener("click", function () { // Слушаем клик на кнопке "Рассчитать"
  
  document.getElementById("reset-btn").style.display = "inline-block"; // Показать кнопку сброса

});

document.getElementById("reset-btn").addEventListener("click", function () { // Слушаем клик на кнопке "Сбросить"
  
  document.getElementById("result-output").style.display = "none"; // Скрыть результаты и очистить список предложений
  document.getElementById("offer-list").innerHTML = "";

  document.getElementById("reset-btn").style.display = "none"; // Скрыть кнопку сброса снова

  const form = document.getElementById("guarantee-calculator"); // Сброс значений формы к значениям по умолчанию
  form.reset();

  document.getElementById("guarantee-sum").value = "1 000 000"; // Установить дефолтные значения вручную, если они заданы через HTML (value, selected)
  document.getElementById("guarantee-days").value = "365";
  document.getElementById("procedure-type").value = "1"; // 44-ФЗ
  document.getElementById("guarantee-type").value = "2"; // На исполнение контракта

  document.getElementById("has-advance").checked = false; // Убедитесь, что чекбоксы сняты
  document.getElementById("custom-form").checked = false;
});