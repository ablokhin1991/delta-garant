document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
  
    // Заполнение полей формы
    document.querySelector(".text_light").textContent = params.get("bankName") || "Не указано";
    document.getElementById("guarantee-sum").value = params.get("guaranteeSum") || "";
    document.getElementById("guarantee-days").value = params.get("guaranteeDays") || "";
    document.getElementById("procedure-type").value = params.get("procedureType") || "";
    document.getElementById("guarantee-type").value = params.get("guaranteeType") || "";
  
    // Обработка чекбоксов
    document.getElementById("has-advance").checked = params.get("hasAdvance") === "Да";
    document.getElementById("custom-form").checked = params.get("customForm") === "Да";
  });
  

