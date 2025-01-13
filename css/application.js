// Получаем параметры из URL
const urlParams = new URLSearchParams(window.location.search);

// Заполняем данные в оглавлении
document.getElementById("bank-name").textContent = urlParams.get("bankName");
document.getElementById("guarantee-sum").textContent = urlParams.get("guaranteeSum");
document.getElementById("guarantee-days").textContent = urlParams.get("guaranteeDays");
document.getElementById("procedure-type").textContent = urlParams.get("procedureType");
document.getElementById("guarantee-type").textContent = urlParams.get("guaranteeType");
document.getElementById("has-advance").textContent = urlParams.get("hasAdvance") === "yes" ? "Да" : "Нет";
document.getElementById("custom-form").textContent = urlParams.get("customForm") === "yes" ? "Да" : "Нет";
