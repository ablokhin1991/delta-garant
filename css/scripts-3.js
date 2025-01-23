// Функция загрузки данных банков из файла banks-data.json
async function fetchBankData() {
  try {
    const response = await fetch('data/banks-data.json'); // Укажите корректный путь к JSON
    if (!response.ok) {
      throw new Error(`Ошибка загрузки данных банков: ${response.statusText}`);
    }
    const banks = await response.json();
    console.log('Данные банков успешно загружены:', banks);
    return banks;
  } catch (error) {
    console.error('Ошибка загрузки данных банков:', error);
    return [];
  }
}

// Функция форматирования суммы гарантии с пробелами
document.getElementById("guarantee-sum").addEventListener("input", function (e) {
  const rawValue = e.target.value.replace(/\s+/g, "").replace(/[^\d,.]/g, "");
  const formattedValue = rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  e.target.value = formattedValue;
});

// Функция расчёта предложений на основе параметров
async function calculateOffers(procType, guarType, hasAdvance, customForm, sum, days) {
  const banks = await fetchBankData();

  if (banks.length === 0) {
    console.error("Данные банков отсутствуют.");
    return [];
  }

  const results = banks.map(bank => {
    const matchingConditions = bank.conditions.filter(c => {
      const isBaseMatch =
        c.procType === procType &&
        c.guarType === guarType &&
        c.hasAdvance === hasAdvance &&
        c.customForm === customForm &&
        sum >= (c.minSum || 0) &&
        sum <= (c.ruleMaxSum || Infinity);

      const isDaysMatch =
        (typeof c.ruleMinDays === "undefined" || days >= c.ruleMinDays) &&
        days <= (c.ruleMaxDays || Infinity);

      return isBaseMatch && isDaysMatch;
    });

    if (matchingConditions.length === 0) {
      return {
        name: bank.name,
        logo: bank.logo,
        cost: "Стоп-факторы",
        rate: "Нет подходящих предложений",
        isStopFactor: true
      };
    }

    const bestCondition = matchingConditions.reduce((best, current) =>
      current.rate < best.rate ? current : best
    );

    const rate = bestCondition.rate;
    const calculatedCost = (sum * rate * days) / 365;
    const cost = Math.max(calculatedCost, bestCondition.minCost);

    return {
      name: bank.name,
      logo: bank.logo,
      data: bank.data,
      cost: parseFloat(cost.toFixed(2)),
      rate: `${(rate * 100).toFixed(2)}`,
      isStopFactor: false
    };
  });

  return results;
}

// Обработчик кнопки "Рассчитать"
document.getElementById("calculate-btn").addEventListener("click", async function () {
  const procType = document.getElementById("procedure-type").value;
  const guarType = document.getElementById("guarantee-type").value;
  const hasAdvance = document.getElementById("has-advance").checked;
  const customForm = document.getElementById("custom-form").checked;

  const sumField = document.getElementById("guarantee-sum").value;
  const daysField = document.getElementById("guarantee-days").value;

  const sum = parseFloat(sumField.replace(/\s+/g, "").replace(",", "."));
  const days = parseInt(daysField, 10);

  if (!sum || isNaN(sum) || !days || isNaN(days)) {
    alert("Пожалуйста, заполните все поля корректно.");
    return;
  }

  const results = await calculateOffers(procType, guarType, hasAdvance, customForm, sum, days);

  if (results.length === 0) {
    alert("Подходящие предложения не найдены.");
    return;
  }

  displayResults(results); // Отображаем результаты
});

// Функция отображения результатов
function displayResults(results) {
  const offerList = document.getElementById("offer-list");
  const resultOutput = document.getElementById("result-output");

  if (!offerList || !resultOutput) {
    console.error("Элементы для отображения результатов не найдены.");
    return;
  }

  offerList.innerHTML = results
    .map(result =>
      `
        <div class="offer">
          <div class="offer__logo" style="background-image: url('${result.logo}')"></div>
          <div class="offer__details">
            <strong>${result.name}</strong>
          </div>
          ${
            !result.isStopFactor
              ? `<div class="offer__rate">${result.cost.toLocaleString()} руб.</div>
                 <div class="offer__rate">${result.rate}% годовых</div>`
              : `<div class="offer__rate">Стоп-факторы: ${result.rate}</div>`
          }
        </div>
      `
    )
    .join("");
}

