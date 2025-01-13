document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
  
    // Заполнение значений на странице заявки
    document.getElementById("guarantee-sum").textContent = params.get("guaranteeSum") || "Не указано";
    document.getElementById("guarantee-days").textContent = params.get("guaranteeDays") || "Не указано";
    document.getElementById("procedure-type").textContent = params.get("procedureType") || "Не указано";
    document.getElementById("guarantee-type").textContent = params.get("guaranteeType") || "Не указано";
    document.getElementById("has-advance").textContent = params.get("hasAdvance") || "Нет";
    document.getElementById("custom-form").textContent = params.get("customForm") || "Нет";
  });
  