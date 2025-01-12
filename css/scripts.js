document.getElementById("guarantee-sum").addEventListener("input", function (e) {
  const rawValue = e.target.value.replace(/\s+/g, "").replace(/[^\d,.]/g, "");
  const formattedValue = rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  e.target.value = formattedValue;
});

document.getElementById("guarantee-type").addEventListener("change", function () {
  const guaranteeType = this.value;
  const advanceCheckbox = document.getElementById("has-advance");

  if (guaranteeType === "1" || guaranteeType === "3" || guaranteeType === "4") {
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
      logo: "/delta-garant/images/banks-logo/alfa-bank.svg",
      maxSum: 150000000,
      maxDays: 3652,
      conditions: [
        { procType: "1", guarType: "2", hasAdvance: true, customForm: true, minSum: 0, maxSum: 150000000, maxDays: 3652, rate: 0.03 },
        { procType: "1", guarType: "2", hasAdvance: false, customForm: true, minSum: 0, maxSum: 150000000, maxDays: 3652, rate: 0.03 },
        { procType: "1", guarType: "2", hasAdvance: true, customForm: false, minSum: 0, maxSum: 150000000, maxDays: 3652, rate: 0.03 },
        { procType: "1", guarType: "2", hasAdvance: false, customForm: false, minSum: 0, maxSum: 150000000, maxDays: 3652, rate: 0.03 },
        { procType: "2", guarType: "2", hasAdvance: true, customForm: true, minSum: 0, maxSum: 150000000, maxDays: 3652, rate: 0.034 },
        { procType: "2", guarType: "2", hasAdvance: false, customForm: true, minSum: 0, maxSum: 150000000, maxDays: 3652, rate: 0.034 },
        { procType: "2", guarType: "2", hasAdvance: true, customForm: false, minSum: 0, maxSum: 150000000, maxDays: 3652, rate: 0.034 },
        { procType: "2", guarType: "2", hasAdvance: false, customForm: false, minSum: 0, maxSum: 150000000, maxDays: 3652, rate: 0.034 },
        { procType: "3", guarType: "2", hasAdvance: true, customForm: true, minSum: 0, maxSum: 150000000, maxDays: 3652, rate: 0.034 },
        { procType: "3", guarType: "2", hasAdvance: false, customForm: true, minSum: 0, maxSum: 150000000, maxDays: 3652, rate: 0.034 },
        { procType: "3", guarType: "2", hasAdvance: true, customForm: false, minSum: 0, maxSum: 150000000, maxDays: 3652, rate: 0.034 },
        { procType: "3", guarType: "2", hasAdvance: false, customForm: false, minSum: 0, maxSum: 150000000, maxDays: 3652, rate: 0.034 },
        { procType: "4", guarType: "2", hasAdvance: true, customForm: true, minSum: 0, maxSum: 150000000, maxDays: 3652, rate: 0.04 },
        { procType: "4", guarType: "2", hasAdvance: false, customForm: true, minSum: 0, maxSum: 150000000, maxDays: 3652, rate: 0.04 },
        { procType: "4", guarType: "2", hasAdvance: true, customForm: false, minSum: 0, maxSum: 150000000, maxDays: 3652, rate: 0.04 },
        { procType: "4", guarType: "2", hasAdvance: false, customForm: false, minSum: 0, maxSum: 150000000, maxDays: 3652, rate: 0.04 },
      ]
    },
    {
      name: "ПАО Промсвязьбанк",
      logo: "/delta-garant/images/banks-logo/psb.svg",
      maxSum: 200000000,
      maxDays: 1140,
      conditions: [
        // На исполнение
        { procType: "1", guarType: "2", hasAdvance: true, customForm: true, minSum: 0, maxSum: 99999, rate: 0.05 },
        { procType: "1", guarType: "2", hasAdvance: false, customForm: true, minSum: 0, maxSum: 99999, rate: 0.05 },
        { procType: "1", guarType: "2", hasAdvance: true, customForm: false, minSum: 0, maxSum: 99999, rate: 0.05 },
        { procType: "1", guarType: "2", hasAdvance: false, customForm: false, minSum: 0, maxSum: 99999, rate: 0.05 },
        { procType: "1", guarType: "2", hasAdvance: true, customForm: true, minSum: 100000, maxSum: 499999, rate: 0.045 },
        { procType: "1", guarType: "2", hasAdvance: false, customForm: true, minSum: 100000, maxSum: 499999, rate: 0.045 },
        { procType: "1", guarType: "2", hasAdvance: true, customForm: false, minSum: 100000, maxSum: 499999, rate: 0.045 },
        { procType: "1", guarType: "2", hasAdvance: false, customForm: false, minSum: 100000, maxSum: 499999, rate: 0.045 },
        { procType: "1", guarType: "2", hasAdvance: true, customForm: true, minSum: 500000, maxSum: 999999, rate: 0.035 },
        { procType: "1", guarType: "2", hasAdvance: false, customForm: true, minSum: 500000, maxSum: 999999, rate: 0.035 },
        { procType: "1", guarType: "2", hasAdvance: true, customForm: false, minSum: 500000, maxSum: 999999, rate: 0.035 },
        { procType: "1", guarType: "2", hasAdvance: false, customForm: false, minSum: 500000, maxSum: 999999, rate: 0.035 },
        { procType: "1", guarType: "2", hasAdvance: true, customForm: true, minSum: 1000000, maxSum: 4999999, rate: 0.032 },
        { procType: "1", guarType: "2", hasAdvance: false, customForm: true, minSum: 1000000, maxSum: 4999999, rate: 0.032 },
        { procType: "1", guarType: "2", hasAdvance: true, customForm: false, minSum: 1000000, maxSum: 4999999, rate: 0.032 },
        { procType: "1", guarType: "2", hasAdvance: false, customForm: false, minSum: 1000000, maxSum: 4999999, rate: 0.032 },
        { procType: "1", guarType: "2", hasAdvance: true, customForm: true, minSum: 5000000, maxSum: 29999999, rate: 0.03 },
        { procType: "1", guarType: "2", hasAdvance: false, customForm: true, minSum: 5000000, maxSum: 29999999, rate: 0.03 },
        { procType: "1", guarType: "2", hasAdvance: true, customForm: false, minSum: 5000000, maxSum: 29999999, rate: 0.03 },
        { procType: "1", guarType: "2", hasAdvance: false, customForm: false, minSum: 5000000, maxSum: 29999999, rate: 0.03 },
        { procType: "1", guarType: "2", hasAdvance: true, customForm: true, minSum: 30000000, maxSum: 200000000, rate: 0.028 },
        { procType: "1", guarType: "2", hasAdvance: false, customForm: true, minSum: 30000000, maxSum: 200000000, rate: 0.028 },
        { procType: "1", guarType: "2", hasAdvance: true, customForm: false, minSum: 30000000, maxSum: 200000000, rate: 0.028 },
        { procType: "1", guarType: "2", hasAdvance: false, customForm: false, minSum: 30000000, maxSum: 200000000, rate: 0.028 },
        { procType: "2", guarType: "2", hasAdvance: true, customForm: true, minSum: 0, maxSum: 99999, rate: 0.05 },
        { procType: "2", guarType: "2", hasAdvance: false, customForm: true, minSum: 0, maxSum: 99999, rate: 0.05 },
        { procType: "2", guarType: "2", hasAdvance: true, customForm: false, minSum: 0, maxSum: 99999, rate: 0.05 },
        { procType: "2", guarType: "2", hasAdvance: false, customForm: false, minSum: 0, maxSum: 99999, rate: 0.05 },
        { procType: "2", guarType: "2", hasAdvance: true, customForm: true, minSum: 100000, maxSum: 499999, rate: 0.045 },
        { procType: "2", guarType: "2", hasAdvance: false, customForm: true, minSum: 100000, maxSum: 499999, rate: 0.045 },
        { procType: "2", guarType: "2", hasAdvance: true, customForm: false, minSum: 100000, maxSum: 499999, rate: 0.045 },
        { procType: "2", guarType: "2", hasAdvance: false, customForm: false, minSum: 100000, maxSum: 499999, rate: 0.045 },
        { procType: "2", guarType: "2", hasAdvance: true, customForm: true, minSum: 500000, maxSum: 999999, rate: 0.035 },
        { procType: "2", guarType: "2", hasAdvance: false, customForm: true, minSum: 500000, maxSum: 999999, rate: 0.035 },
        { procType: "2", guarType: "2", hasAdvance: true, customForm: false, minSum: 500000, maxSum: 999999, rate: 0.035 },
        { procType: "2", guarType: "2", hasAdvance: false, customForm: false, minSum: 500000, maxSum: 999999, rate: 0.035 },
        { procType: "2", guarType: "2", hasAdvance: true, customForm: true, minSum: 1000000, maxSum: 4999999, rate: 0.032 },
        { procType: "2", guarType: "2", hasAdvance: false, customForm: true, minSum: 1000000, maxSum: 4999999, rate: 0.032 },
        { procType: "2", guarType: "2", hasAdvance: true, customForm: false, minSum: 1000000, maxSum: 4999999, rate: 0.032 },
        { procType: "2", guarType: "2", hasAdvance: false, customForm: false, minSum: 1000000, maxSum: 4999999, rate: 0.032 },
        { procType: "2", guarType: "2", hasAdvance: true, customForm: true, minSum: 5000000, maxSum: 29999999, rate: 0.03 },
        { procType: "2", guarType: "2", hasAdvance: false, customForm: true, minSum: 5000000, maxSum: 29999999, rate: 0.03 },
        { procType: "2", guarType: "2", hasAdvance: true, customForm: false, minSum: 5000000, maxSum: 29999999, rate: 0.03 },
        { procType: "2", guarType: "2", hasAdvance: false, customForm: false, minSum: 5000000, maxSum: 29999999, rate: 0.03 },
        { procType: "2", guarType: "2", hasAdvance: true, customForm: true, minSum: 30000000, maxSum: 200000000, rate: 0.028 },
        { procType: "2", guarType: "2", hasAdvance: false, customForm: true, minSum: 30000000, maxSum: 200000000, rate: 0.028 },
        { procType: "2", guarType: "2", hasAdvance: true, customForm: false, minSum: 30000000, maxSum: 200000000, rate: 0.028 },
        { procType: "2", guarType: "2", hasAdvance: false, customForm: false, minSum: 30000000, maxSum: 200000000, rate: 0.028 },
        { procType: "3", guarType: "2", hasAdvance: true, customForm: true, minSum: 0, maxSum: 99999, rate: 0.05 },
        { procType: "3", guarType: "2", hasAdvance: false, customForm: true, minSum: 0, maxSum: 99999, rate: 0.05 },
        { procType: "3", guarType: "2", hasAdvance: true, customForm: false, minSum: 0, maxSum: 99999, rate: 0.05 },
        { procType: "3", guarType: "2", hasAdvance: false, customForm: false, minSum: 0, maxSum: 99999, rate: 0.05 },
        { procType: "3", guarType: "2", hasAdvance: true, customForm: true, minSum: 100000, maxSum: 499999, rate: 0.045 },
        { procType: "3", guarType: "2", hasAdvance: false, customForm: true, minSum: 100000, maxSum: 499999, rate: 0.045 },
        { procType: "3", guarType: "2", hasAdvance: true, customForm: false, minSum: 100000, maxSum: 499999, rate: 0.045 },
        { procType: "3", guarType: "2", hasAdvance: false, customForm: false, minSum: 100000, maxSum: 499999, rate: 0.045 },
        { procType: "3", guarType: "2", hasAdvance: true, customForm: true, minSum: 500000, maxSum: 999999, rate: 0.035 },
        { procType: "3", guarType: "2", hasAdvance: false, customForm: true, minSum: 500000, maxSum: 999999, rate: 0.035 },
        { procType: "3", guarType: "2", hasAdvance: true, customForm: false, minSum: 500000, maxSum: 999999, rate: 0.035 },
        { procType: "3", guarType: "2", hasAdvance: false, customForm: false, minSum: 500000, maxSum: 999999, rate: 0.035 },
        { procType: "3", guarType: "2", hasAdvance: true, customForm: true, minSum: 1000000, maxSum: 4999999, rate: 0.032 },
        { procType: "3", guarType: "2", hasAdvance: false, customForm: true, minSum: 1000000, maxSum: 4999999, rate: 0.032 },
        { procType: "3", guarType: "2", hasAdvance: true, customForm: false, minSum: 1000000, maxSum: 4999999, rate: 0.032 },
        { procType: "3", guarType: "2", hasAdvance: false, customForm: false, minSum: 1000000, maxSum: 4999999, rate: 0.032 },
        { procType: "3", guarType: "2", hasAdvance: true, customForm: true, minSum: 5000000, maxSum: 29999999, rate: 0.03 },
        { procType: "3", guarType: "2", hasAdvance: false, customForm: true, minSum: 5000000, maxSum: 29999999, rate: 0.03 },
        { procType: "3", guarType: "2", hasAdvance: true, customForm: false, minSum: 5000000, maxSum: 29999999, rate: 0.03 },
        { procType: "3", guarType: "2", hasAdvance: false, customForm: false, minSum: 5000000, maxSum: 29999999, rate: 0.03 },
        { procType: "3", guarType: "2", hasAdvance: true, customForm: true, minSum: 30000000, maxSum: 200000000, rate: 0.028 },
        { procType: "3", guarType: "2", hasAdvance: false, customForm: true, minSum: 30000000, maxSum: 200000000, rate: 0.028 },
        { procType: "3", guarType: "2", hasAdvance: true, customForm: false, minSum: 30000000, maxSum: 200000000, rate: 0.028 },
        { procType: "3", guarType: "2", hasAdvance: false, customForm: false, minSum: 30000000, maxSum: 200000000, rate: 0.028 },
        { procType: "4", guarType: "2", hasAdvance: true, customForm: true, minSum: 0, maxSum: 999999, rate: 0.05 },
        { procType: "4", guarType: "2", hasAdvance: false, customForm: true, minSum: 0, maxSum: 999999, rate: 0.05 },
        { procType: "4", guarType: "2", hasAdvance: true, customForm: false, minSum: 0, maxSum: 999999, rate: 0.05 },
        { procType: "4", guarType: "2", hasAdvance: false, customForm: false, minSum: 0, maxSum: 999999, rate: 0.05 },
        { procType: "4", guarType: "2", hasAdvance: true, customForm: true, minSum: 1000000, maxSum: 4999999, rate: 0.04 },
        { procType: "4", guarType: "2", hasAdvance: false, customForm: true, minSum: 1000000, maxSum: 4999999, rate: 0.04 },
        { procType: "4", guarType: "2", hasAdvance: true, customForm: false, minSum: 1000000, maxSum: 4999999, rate: 0.04 },
        { procType: "4", guarType: "2", hasAdvance: false, customForm: false, minSum: 1000000, maxSum: 4999999, rate: 0.04 },
        { procType: "4", guarType: "2", hasAdvance: true, customForm: true, minSum: 5000000, maxSum: 50000000, rate: 0.039 },
        { procType: "4", guarType: "2", hasAdvance: false, customForm: true, minSum: 5000000, maxSum: 50000000, rate: 0.039 },
        { procType: "4", guarType: "2", hasAdvance: true, customForm: false, minSum: 5000000, maxSum: 50000000, rate: 0.039 },
        { procType: "4", guarType: "2", hasAdvance: false, customForm: false, minSum: 5000000, maxSum: 50000000, rate: 0.039 },
        // На участие
        { procType: "1", guarType: "1", hasAdvance: false, customForm: true, minSum: 0, maxSum: 99999, rate: 0.05 },
        { procType: "1", guarType: "1", hasAdvance: false, customForm: false, minSum: 0, maxSum: 99999, rate: 0.05 },
        { procType: "1", guarType: "1", hasAdvance: false, customForm: true, minSum: 100000, maxSum: 499999, rate: 0.045 },
        { procType: "1", guarType: "1", hasAdvance: false, customForm: false, minSum: 100000, maxSum: 499999, rate: 0.045 },
        { procType: "1", guarType: "1", hasAdvance: false, customForm: true, minSum: 500000, maxSum: 999999, rate: 0.035 },
        { procType: "1", guarType: "1", hasAdvance: false, customForm: false, minSum: 500000, maxSum: 999999, rate: 0.035 },
        { procType: "1", guarType: "1", hasAdvance: false, customForm: true, minSum: 1000000, maxSum: 4999999, rate: 0.032 },
        { procType: "1", guarType: "1", hasAdvance: false, customForm: false, minSum: 1000000, maxSum: 4999999, rate: 0.032 },
        { procType: "1", guarType: "1", hasAdvance: false, customForm: true, minSum: 5000000, maxSum: 29999999, rate: 0.03 },
        { procType: "1", guarType: "1", hasAdvance: false, customForm: false, minSum: 5000000, maxSum: 29999999, rate: 0.03 },
        { procType: "1", guarType: "1", hasAdvance: false, customForm: true, minSum: 30000000, maxSum: 200000000, rate: 0.028 },
        { procType: "1", guarType: "1", hasAdvance: false, customForm: false, minSum: 30000000, maxSum: 200000000, rate: 0.028 },
        { procType: "2", guarType: "1", hasAdvance: false, customForm: true, minSum: 0, maxSum: 99999, rate: 0.05 },
        { procType: "2", guarType: "1", hasAdvance: false, customForm: false, minSum: 0, maxSum: 99999, rate: 0.05 },
        { procType: "2", guarType: "1", hasAdvance: false, customForm: true, minSum: 100000, maxSum: 499999, rate: 0.045 },
        { procType: "2", guarType: "1", hasAdvance: false, customForm: false, minSum: 100000, maxSum: 499999, rate: 0.045 },
        { procType: "2", guarType: "1", hasAdvance: false, customForm: true, minSum: 500000, maxSum: 999999, rate: 0.035 },
        { procType: "2", guarType: "1", hasAdvance: false, customForm: false, minSum: 500000, maxSum: 999999, rate: 0.035 },
        { procType: "2", guarType: "1", hasAdvance: false, customForm: true, minSum: 1000000, maxSum: 4999999, rate: 0.032 },
        { procType: "2", guarType: "1", hasAdvance: false, customForm: false, minSum: 1000000, maxSum: 4999999, rate: 0.032 },
        { procType: "2", guarType: "1", hasAdvance: false, customForm: true, minSum: 5000000, maxSum: 29999999, rate: 0.03 },
        { procType: "2", guarType: "1", hasAdvance: false, customForm: false, minSum: 5000000, maxSum: 29999999, rate: 0.03 },
        { procType: "2", guarType: "1", hasAdvance: false, customForm: true, minSum: 30000000, maxSum: 200000000, rate: 0.028 },
        { procType: "2", guarType: "1", hasAdvance: false, customForm: false, minSum: 30000000, maxSum: 200000000, rate: 0.028 },
        { procType: "3", guarType: "1", hasAdvance: false, customForm: true, minSum: 0, maxSum: 99999, rate: 0.05 },
        { procType: "3", guarType: "1", hasAdvance: false, customForm: false, minSum: 0, maxSum: 99999, rate: 0.05 },
        { procType: "3", guarType: "1", hasAdvance: false, customForm: true, minSum: 100000, maxSum: 499999, rate: 0.045 },
        { procType: "3", guarType: "1", hasAdvance: false, customForm: false, minSum: 100000, maxSum: 499999, rate: 0.045 },
        { procType: "3", guarType: "1", hasAdvance: false, customForm: true, minSum: 500000, maxSum: 999999, rate: 0.035 },
        { procType: "3", guarType: "1", hasAdvance: false, customForm: false, minSum: 500000, maxSum: 999999, rate: 0.035 },
        { procType: "3", guarType: "1", hasAdvance: false, customForm: true, minSum: 1000000, maxSum: 4999999, rate: 0.032 },
        { procType: "3", guarType: "1", hasAdvance: false, customForm: false, minSum: 1000000, maxSum: 4999999, rate: 0.032 },
        { procType: "3", guarType: "1", hasAdvance: false, customForm: true, minSum: 5000000, maxSum: 29999999, rate: 0.03 },
        { procType: "3", guarType: "1", hasAdvance: false, customForm: false, minSum: 5000000, maxSum: 29999999, rate: 0.03 },
        { procType: "3", guarType: "1", hasAdvance: false, customForm: true, minSum: 30000000, maxSum: 200000000, rate: 0.028 },
        { procType: "3", guarType: "1", hasAdvance: false, customForm: false, minSum: 30000000, maxSum: 200000000, rate: 0.028 },
        { procType: "4", guarType: "1", hasAdvance: false, customForm: true, minSum: 0, maxSum: 999999, rate: 0.05 },
        { procType: "4", guarType: "1", hasAdvance: false, customForm: false, minSum: 0, maxSum: 999999, rate: 0.05 },
        { procType: "4", guarType: "1", hasAdvance: false, customForm: true, minSum: 1000000, maxSum: 4999999, rate: 0.04 },
        { procType: "4", guarType: "1", hasAdvance: false, customForm: false, minSum: 1000000, maxSum: 4999999, rate: 0.04 },
        { procType: "4", guarType: "1", hasAdvance: false, customForm: true, minSum: 5000000, maxSum: 50000000, rate: 0.039 },
        { procType: "4", guarType: "1", hasAdvance: false, customForm: false, minSum: 5000000, maxSum: 50000000, rate: 0.039 },
        // На возврат аванса


      ]
    }
  ];

  const results = banks
  .map(bank => {
    // Ищем подходящие условия для банка
    const condition = bank.conditions.find(c =>
      c.procType === procType &&
      c.guarType === guarType &&
      c.hasAdvance === hasAdvance &&
      c.customForm === customForm &&
      sum >= (c.minSum || 0) && sum <= (c.maxSum || Infinity)
    );

    // Объект с названиями процедур по номерам
    const procedureNames = {
      "1": "44-ФЗ",
      "2": "223-ФЗ",
      "3": "615-ПП/185-ФЗ",
      "4": "Коммерческий тендер"
    };

    // Проверяем maxSum и maxDays независимо от того, найдено условие или нет
    if (sum > bank.maxSum || days > bank.maxDays) {
      let stopMessage = '';
      if (sum > bank.maxSum) {
        stopMessage = `Превышена максимальная сумма БГ - maxSum: ${bank.maxSum.toLocaleString()} руб.`;
      } else if (days > bank.maxDays) {
        stopMessage = `Превышен максимальный срок БГ - maxDays: ${bank.maxDays} дней.`;
      }

      // Специальное условие для Промсвязьбанка при procType: "4"
    if (bank.name === "ПАО Промсвязьбанк" && procType === "4") {
      cost = Math.max(cost, 5000); // Минимальная стоимость - 5000 руб.
      console.log(`Применено минимальное ограничение для Промсвязьбанка: ${cost}`);
    }

      return {
        name: bank.name,
        logo: bank.logo,
        cost: 'Стоп-факторы',
        rate: stopMessage,
        isStopFactor: true // помечаем как стоп-фактор
      };
    }

    // Если подходящее условие не найдено
    if (!condition) {
      const procedureName = procedureNames[procType] || `Процедура №${procType}`;
      const stopMessage = `Банк не работает с данным типом процедуры - ${procedureName}`;
      return {
        name: bank.name,
        logo: bank.logo,
        cost: 'Стоп-факторы',
        rate: stopMessage,
        isStopFactor: true // помечаем как стоп-фактор
      };
    }

    // Если все проверки пройдены, рассчитываем ставку и стоимость
    const rate = condition.rate;
    const cost = Math.max((sum * rate * days) / 365, 1000).toFixed(2);

    return {
      name: bank.name,
      logo: bank.logo,
      cost: parseFloat(cost),
      rate: (rate * 100).toFixed(1),
      isStopFactor: false
    };
  });


  // Разделяем банки на обычные и с стоп-факторами
  const normalResults = results.filter(r => !r.isStopFactor);
  const stopFactorResults = results.filter(r => r.isStopFactor);

  // Сортируем обычные результаты по стоимости
  normalResults.sort((a, b) => a.cost - b.cost);

  // Объединяем обычные и стоп-факторные результаты
  const finalResults = [...normalResults, ...stopFactorResults];

  if (finalResults.length === 0) {
    alert("Условия для выбранных параметров не найдены.");
    return;
  }

  const offerList = document.getElementById("offer-list");
  offerList.innerHTML = finalResults
    .map(result => `
      <div class="offer">
          <div class="offer__logo" style="background-image: url('${result.logo}')"></div>
          <div>
              <strong>${result.name}</strong><br>
              ${result.isStopFactor ? `Стоп-факторы - ${result.rate}` : `Ставка: ${result.rate}%`}<br>
              ${result.isStopFactor ? '' : `${result.cost.toLocaleString()} ₽`}
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
