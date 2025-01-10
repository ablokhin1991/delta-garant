document.getElementById("guarantee-sum").addEventListener("input", function (e) {
  const rawValue = e.target.value.replace(/\s+/g, "").replace(/[^\d,.]/g, "");
  const formattedValue = rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  e.target.value = formattedValue;
});

document.getElementById("calculate-btn").addEventListener("click", function () {
  const sumField = document.getElementById("guarantee-sum");
  const daysField = document.getElementById("guarantee-days");
  const procType = document.getElementById("procedure-type").value;
  const guarType = document.getElementById("guarantee-type").value;
  const hasAdvance = document.getElementById("has-advance").checked;
  const customForm = document.getElementById("custom-form").checked;

  const sum = parseFloat(sumField.value.replace(/\s+/g, "").replace(",", "."));
  const days = parseInt(daysField.value, 10);

  if (!sum || isNaN(sum) || !days || isNaN(days)) {
      alert("Пожалуйста, заполните все поля корректно.");
      return;
  }

  // Банковские условия
  const bankConditions = {
      "ПАО Альфа-Банк": {
          logo: "/images/banks-logo/alfa-bank.svg",
          maxSum: 150_000_000,
          maxDays: 3652,
          conditions: [
              { procType: "1", guarType: "2", hasAdvance: true, customForm: true, rate: 0.03 },
              { procType: "1", guarType: "2", hasAdvance: false, customForm: true, rate: 0.03 }
              // ... остальные условия для Альфа-Банка
          ]
      },
      "ПАО ВТБ": {
          logo: "/images/banks-logo/vtb.svg",
          maxSum: 200_000_000,
          maxDays: 3650,
          conditions: [
              { procType: "1", guarType: "2", hasAdvance: true, customForm: true, rate: 0.025 },
              { procType: "1", guarType: "2", hasAdvance: false, customForm: true, rate: 0.025 }
              // ... условия для ВТБ
          ]
      }
      // Добавляйте другие банки
  };

  // Результаты расчетов
  const results = [];

  // Перебираем банки для расчета
  Object.entries(bankConditions).forEach(([bankName, bank]) => {
      // Проверяем ограничения
      if (sum > bank.maxSum || days > bank.maxDays) return;

      // Ищем подходящие условия
      const condition = bank.conditions.find(c =>
          c.procType === procType &&
          c.guarType === guarType &&
          c.hasAdvance === hasAdvance &&
          c.customForm === customForm
      );

      if (!condition) return;

      // Расчет стоимости
      const rate = condition.rate;
      const cost = Math.max((sum * rate * days) / 365, 1000).toFixed(2);

      // Добавляем результат в массив
      results.push({
          bankName,
          logo: bank.logo,
          rate: (rate * 100).toFixed(1),
          cost: parseFloat(cost)
      });
  });

  // Сортировка по стоимости от дешевых к дорогим
  results.sort((a, b) => a.cost - b.cost);

  // Обновление интерфейса
  const resultOutput = document.getElementById("result-output");
  const offerList = document.getElementById("offer-list");
  offerList.innerHTML = results.map(result => `
      <div class="offer">
          <div class="offer__logo" style="background-image: url('${result.logo}');"></div>
          <div class="offer__details">
              <strong>${result.bankName}</strong><br>
              Ставка: ${result.rate}%<br>
              Стоимость: ${result.cost.toLocaleString("ru-RU")} ₽
          </div>
      </div>
  `).join("");

  resultOutput.style.display = results.length ? "block" : "none";

  if (results.length === 0) {
      alert("Для указанных параметров не найдено подходящих предложений.");
  }
});

// Сброс результатов
document.getElementById('reset-btn').addEventListener('click', function () {
  const resultOutput = document.getElementById('result-output');
  resultOutput.style.display = 'none';
  document.getElementById('offer-list').innerHTML = '';
});
