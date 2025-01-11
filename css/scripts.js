document.getElementById("guarantee-sum").addEventListener("input", function (e) {
  const rawValue = e.target.value.replace(/\s+/g, "").replace(/[^\d,.]/g, "");
  const formattedValue = rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  e.target.value = formattedValue;
});

document.getElementById("guarantee-type").addEventListener("change", function () {
  const guaranteeType = this.value;
  const advanceCheckbox = document.getElementById("has-advance");
  if (guaranteeType === "1") {
      advanceCheckbox.parentElement.style.display = "none";
  } else {
      advanceCheckbox.parentElement.style.display = "block";
  }
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

  const banks = [
      {
          name: "ПАО Альфа-Банк",
          logo: "delta-garant/images/banks-logo/alfa-bank.svg",
          maxSum: 150000000,
          maxDays: 3652,
          conditions: [
            { procType: "1", guarType: "2", hasAdvance: true, customForm: true, rate: 0.03 },
            { procType: "1", guarType: "2", hasAdvance: false, customForm: true, rate: 0.03 },
            { procType: "1", guarType: "2", hasAdvance: true, customForm: false, rate: 0.03 },
            { procType: "1", guarType: "2", hasAdvance: false, customForm: false, rate: 0.03 },
            { procType: "2", guarType: "2", hasAdvance: true, customForm: true, rate: 0.034 },
            { procType: "2", guarType: "2", hasAdvance: false, customForm: true, rate: 0.034 },
            { procType: "2", guarType: "2", hasAdvance: true, customForm: false, rate: 0.034 },
            { procType: "2", guarType: "2", hasAdvance: false, customForm: false, rate: 0.034 },
            { procType: "3", guarType: "2", hasAdvance: true, customForm: true, rate: 0.034 },
            { procType: "3", guarType: "2", hasAdvance: false, customForm: true, rate: 0.034 },
            { procType: "3", guarType: "2", hasAdvance: true, customForm: false, rate: 0.034 },
            { procType: "3", guarType: "2", hasAdvance: false, customForm: false, rate: 0.034 },
            { procType: "4", guarType: "2", hasAdvance: true, customForm: true, rate: 0.04 },
            { procType: "4", guarType: "2", hasAdvance: false, customForm: true, rate: 0.04 },
            { procType: "4", guarType: "2", hasAdvance: true, customForm: false, rate: 0.04 },
            { procType: "4", guarType: "2", hasAdvance: false, customForm: false, rate: 0.04 },
            { procType: "1", guarType: "1", hasAdvance: false, customForm: true, rate: 0.032 },
            { procType: "1", guarType: "1", hasAdvance: false, customForm: false, rate: 0.032 },
            { procType: "2", guarType: "1", hasAdvance: false, customForm: true, rate: 0.035 },
            { procType: "2", guarType: "1", hasAdvance: false, customForm: false, rate: 0.035 },
            { procType: "3", guarType: "1", hasAdvance: false, customForm: true, rate: 0.035 },
            { procType: "3", guarType: "1", hasAdvance: false, customForm: false, rate: 0.035 },
            { procType: "4", guarType: "1", hasAdvance: false, customForm: true, rate: 0.04 },
            { procType: "4", guarType: "1", hasAdvance: false, customForm: false, rate: 0.04 },
            { procType: "1", guarType: "3", hasAdvance: false, customForm: true, rate: 0.03 },
            { procType: "1", guarType: "3", hasAdvance: false, customForm: false, rate: 0.03 },
            { procType: "2", guarType: "3", hasAdvance: false, customForm: true, rate: 0.034 },
            { procType: "2", guarType: "3", hasAdvance: false, customForm: false, rate: 0.034 },
            { procType: "3", guarType: "3", hasAdvance: false, customForm: true, rate: 0.034 },
            { procType: "3", guarType: "3", hasAdvance: false, customForm: false, rate: 0.034 },
            { procType: "4", guarType: "3", hasAdvance: false, customForm: true, rate: 0.04 },
            { procType: "4", guarType: "3", hasAdvance: false, customForm: false, rate: 0.04 },
            { procType: "1", guarType: "4", hasAdvance: false, customForm: true, rate: 0.03 },
            { procType: "1", guarType: "4", hasAdvance: false, customForm: false, rate: 0.03 },
            { procType: "2", guarType: "4", hasAdvance: false, customForm: true, rate: 0.034 },
            { procType: "2", guarType: "4", hasAdvance: false, customForm: false, rate: 0.034 },
            { procType: "3", guarType: "4", hasAdvance: false, customForm: true, rate: 0.034 },
            { procType: "3", guarType: "4", hasAdvance: false, customForm: false, rate: 0.034 },
            { procType: "4", guarType: "4", hasAdvance: false, customForm: true, rate: 0.04 },
            { procType: "4", guarType: "4", hasAdvance: false, customForm: false, rate: 0.04 },
          ],
      },
      // Добавьте других банков по аналогии
  ];

  const results = banks
      .map(bank => {
          if (sum > bank.maxSum || days > bank.maxDays) return null;
          const condition = bank.conditions.find(c =>
              c.procType === procType &&
              c.guarType === guarType &&
              c.hasAdvance === hasAdvance &&
              c.customForm === customForm
          );
          if (!condition) return null;

          const rate = condition.rate;
          const cost = Math.max((sum * rate * days) / 365, 1000).toFixed(2);

          return {
              name: bank.name,
              logo: bank.logo,
              cost: parseFloat(cost),
              rate: (rate * 100).toFixed(1),
          };
      })
      .filter(Boolean)
      .sort((a, b) => a.cost - b.cost);

  if (results.length === 0) {
      alert("Условия для выбранных параметров не найдены.");
      return;
  }

  const offerList = document.getElementById("offer-list");
  offerList.innerHTML = results
      .map(result => `
          <div class="offer">
              <div class="offer__logo" style="background-image: url('${result.logo}')"></div>
              <div>
                  <strong>${result.name}</strong><br>
                  Ставка: ${result.rate}%<br>
                  ${result.cost.toLocaleString()} ₽
              </div>
          </div>
      `)
      .join("");

  document.getElementById("result-output").style.display = "block";
});

document.getElementById("reset-btn").addEventListener("click", function () {
  document.getElementById("result-output").style.display = "none";
  document.getElementById("offer-list").innerHTML = "";
});
