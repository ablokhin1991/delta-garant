document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
  
    // Заполнение значений на странице заявки
    document.getElementById("guarantee-sum").value = params.get("guaranteeSum") || "Не указано";
    document.getElementById("guarantee-days").value = params.get("guaranteeDays") || "Не указано";
    document.getElementById("procedure-type").value = params.get("procedureType") || "Не указано";
    document.getElementById("guarantee-type").value = params.get("guaranteeType") || "Не указано";

    // Обработка чекбоксов
    document.getElementById("has-advance").checked = params.get("hasAdvance") === "Да";
    document.getElementById("custom-form").checked = params.get("customForm") === "Да";
});
