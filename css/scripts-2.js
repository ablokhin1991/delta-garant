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
      data: 'Решение от 1 дня\nБез поручительства\nБез открытия расчетного счета',  
      conditions: [
        { procType: "1", guarType: "2", hasAdvance: true, customForm: true, minSum: 0, ruleMaxSum: 150000000, rate: 0.03, minCost: 1000, ruleMaxDays: 3652 },
        { procType: "1", guarType: "2", hasAdvance: false, customForm: true, minSum: 0, ruleMaxSum: 150000000, rate: 0.03, minCost: 1000, ruleMaxDays: 3652 },
        { procType: "1", guarType: "2", hasAdvance: true, customForm: false, minSum: 0, ruleMaxSum: 150000000, rate: 0.03, minCost: 1000, ruleMaxDays: 3652 },
        { procType: "1", guarType: "2", hasAdvance: false, customForm: false, minSum: 0, ruleMaxSumm: 150000000, rate: 0.03, minCost: 1000, ruleMaxDays: 3652 },
        { procType: "2", guarType: "2", hasAdvance: true, customForm: true, minSum: 0, ruleMaxSum: 150000000, rate: 0.034, minCost: 1000, ruleMaxDays: 3652 },
        { procType: "2", guarType: "2", hasAdvance: false, customForm: true, minSum: 0, ruleMaxSumm: 150000000, rate: 0.034, minCost: 1000, ruleMaxDays: 3652 },
        { procType: "2", guarType: "2", hasAdvance: true, customForm: false, minSum: 0, ruleMaxSum: 150000000, rate: 0.034, minCost: 1000, ruleMaxDays: 3652 },
        { procType: "2", guarType: "2", hasAdvance: false, customForm: false, minSum: 0, ruleMaxSum: 150000000, rate: 0.034, minCost: 1000, ruleMaxDays: 3652 },
        { procType: "3", guarType: "2", hasAdvance: true, customForm: true, minSum: 0, ruleMaxSum: 150000000, rate: 0.034, minCost: 1000, ruleMaxDays: 3652 },
        { procType: "3", guarType: "2", hasAdvance: false, customForm: true, minSum: 0, ruleMaxSum: 150000000, rate: 0.034, minCost: 1000, ruleMaxDays: 3652 },
        { procType: "3", guarType: "2", hasAdvance: true, customForm: false, minSum: 0, ruleMaxSum: 150000000, rate: 0.034, minCost: 1000, ruleMaxDays: 3652 },
        { procType: "3", guarType: "2", hasAdvance: false, customForm: false, minSum: 0, ruleMaxSum: 150000000, rate: 0.034, minCost: 1000, ruleMaxDays: 3652 },
        { procType: "4", guarType: "2", hasAdvance: true, customForm: true, minSum: 0, ruleMaxSum: 150000000, rate: 0.04, minCost: 2000, ruleMaxDays: 3652 },
        { procType: "4", guarType: "2", hasAdvance: false, customForm: true, minSum: 0, ruleMaxSum: 150000000, rate: 0.04, minCost: 2000, ruleMaxDays: 3652 },
        { procType: "4", guarType: "2", hasAdvance: true, customForm: false, minSum: 0, ruleMaxSum: 150000000, rate: 0.04, minCost: 2000, ruleMaxDays: 3652 },
        { procType: "4", guarType: "2", hasAdvance: false, customForm: false, minSum: 0, ruleMaxSum: 150000000, rate: 0.04, minCost: 2000, ruleMaxDays: 3652 },
        { procType: "1", guarType: "1", hasAdvance: false, customForm: true, minSum: 0, ruleMaxSum: 150000000, rate: 0.032, minCost: 1000, ruleMaxDays: 3652 },
        { procType: "1", guarType: "1", hasAdvance: false, customForm: false, minSum: 0, ruleMaxSum: 150000000, rate: 0.032, minCost: 1000, ruleMaxDays: 3652 },
        { procType: "2", guarType: "1", hasAdvance: false, customForm: true, minSum: 0, ruleMaxSum: 150000000, rate: 0.035, minCost: 1000, ruleMaxDays: 3652 },
        { procType: "2", guarType: "1", hasAdvance: false, customForm: false, minSum: 0, ruleMaxSum: 150000000, rate: 0.035, minCost: 1000, ruleMaxDays: 3652 },
        { procType: "3", guarType: "1", hasAdvance: false, customForm: true, minSum: 0, ruleMaxSum: 150000000, rate: 0.035, minCost: 1000, ruleMaxDays: 3652 },
        { procType: "3", guarType: "1", hasAdvance: false, customForm: false, minSum: 0, ruleMaxSum: 150000000, rate: 0.035, minCost: 1000, ruleMaxDays: 3652 },
        { procType: "4", guarType: "1", hasAdvance: false, customForm: true, minSum: 0, ruleMaxSum: 150000000, rate: 0.04, minCost: 2000, ruleMaxDays: 3652 },
        { procType: "4", guarType: "1", hasAdvance: false, customForm: false, minSum: 0, ruleMaxSum: 150000000, rate: 0.04, minCost: 2000, ruleMaxDays: 3652 },
        { procType: "1", guarType: "3", hasAdvance: false, customForm: true, minSum: 0, ruleMaxSum: 150000000, rate: 0.03, minCost: 1000, ruleMaxDays: 3652 },
        { procType: "1", guarType: "3", hasAdvance: false, customForm: false, minSum: 0, ruleMaxSum: 150000000, rate: 0.03, minCost: 1000, ruleMaxDays: 3652 },
        { procType: "2", guarType: "3", hasAdvance: false, customForm: true, minSum: 0, ruleMaxSum: 150000000, rate: 0.034, minCost: 1000, ruleMaxDays: 3652 },
        { procType: "2", guarType: "3", hasAdvance: false, customForm: false, minSum: 0, ruleMaxSum: 150000000, rate: 0.034, minCost: 1000, ruleMaxDays: 3652 },
        { procType: "3", guarType: "3", hasAdvance: false, customForm: true, minSum: 0, ruleMaxSum: 150000000, rate: 0.034, minCost: 1000, ruleMaxDays: 3652 },
        { procType: "3", guarType: "3", hasAdvance: false, customForm: false, minSum: 0, ruleMaxSum: 150000000, rate: 0.034, minCost: 1000, ruleMaxDays: 3652 },
        { procType: "4", guarType: "3", hasAdvance: false, customForm: true, minSum: 0, ruleMaxSum: 150000000, rate: 0.04, minCost: 2000, ruleMaxDays: 3652 },
        { procType: "4", guarType: "3", hasAdvance: false, customForm: false, minSum: 0, ruleMaxSum: 150000000, rate: 0.04, minCost: 2000, ruleMaxDays: 3652 },
        { procType: "1", guarType: "4", hasAdvance: false, customForm: true, minSum: 0, ruleMaxSum: 150000000, rate: 0.03, minCost: 1000, ruleMaxDays: 3652 },
        { procType: "1", guarType: "4", hasAdvance: false, customForm: false, minSum: 0, ruleMaxSum: 150000000, rate: 0.03, minCost: 1000, ruleMaxDays: 3652 },
        { procType: "2", guarType: "4", hasAdvance: false, customForm: true, minSum: 0, ruleMaxSum: 150000000, rate: 0.034, minCost: 1000, ruleMaxDays: 3652 },
        { procType: "2", guarType: "4", hasAdvance: false, customForm: false, minSum: 0, ruleMaxSum: 150000000, rate: 0.034, minCost: 1000, ruleMaxDays: 3652 },
        { procType: "3", guarType: "4", hasAdvance: false, customForm: true, minSum: 0, ruleMaxSum: 150000000, rate: 0.034, minCost: 1000, ruleMaxDays: 3652 },
        { procType: "3", guarType: "4", hasAdvance: false, customForm: false, minSum: 0, ruleMaxSum: 150000000, rate: 0.034, minCost: 1000, ruleMaxDays: 3652 },
        { procType: "4", guarType: "4", hasAdvance: false, customForm: true, minSum: 0, ruleMaxSum: 150000000, rate: 0.04, minCost: 2000, ruleMaxDays: 3652 },
        { procType: "4", guarType: "4", hasAdvance: false, customForm: false, minSum: 0, ruleMaxSum: 150000000, rate: 0.04, minCost: 2000, ruleMaxDays: 3652 },
      ]
    },
    {
      name: "ПАО Промсвязьбанк",
      logo: "/delta-garant/images/banks-logo/psb.svg",
      data: 'Решение от 1 дня\nБез поручительства\nБез открытия расчетного счета',
      conditions: [
        // На исполнение
        { procType: "1", guarType: "2", hasAdvance: true, customForm: true, minSum: 0, ruleMaxSum: 99999, rate: 0.05, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "1", guarType: "2", hasAdvance: false, customForm: true, minSum: 0, ruleMaxSum: 99999, rate: 0.05, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "1", guarType: "2", hasAdvance: true, customForm: false, minSum: 0, ruleMaxSum: 99999, rate: 0.05, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "1", guarType: "2", hasAdvance: false, customForm: false, minSum: 0, ruleMaxSum: 99999, rate: 0.05, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "1", guarType: "2", hasAdvance: true, customForm: true, minSum: 100000, ruleMaxSum: 499999, rate: 0.045, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "1", guarType: "2", hasAdvance: false, customForm: true, minSum: 100000, ruleMaxSum: 499999, rate: 0.045, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "1", guarType: "2", hasAdvance: true, customForm: false, minSum: 100000, ruleMaxSum: 499999, rate: 0.045, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "1", guarType: "2", hasAdvance: false, customForm: false, minSum: 100000, ruleMaxSum: 499999, rate: 0.045, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "1", guarType: "2", hasAdvance: true, customForm: true, minSum: 500000, ruleMaxSum: 999999, rate: 0.035, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "1", guarType: "2", hasAdvance: false, customForm: true, minSum: 500000, ruleMaxSum: 999999, rate: 0.035, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "1", guarType: "2", hasAdvance: true, customForm: false, minSum: 500000, ruleMaxSum: 999999, rate: 0.035, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "1", guarType: "2", hasAdvance: false, customForm: false, minSum: 500000, ruleMaxSum: 999999, rate: 0.035, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "1", guarType: "2", hasAdvance: true, customForm: true, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.032, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "1", guarType: "2", hasAdvance: false, customForm: true, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.032, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "1", guarType: "2", hasAdvance: true, customForm: false, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.032, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "1", guarType: "2", hasAdvance: false, customForm: false, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.032, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "1", guarType: "2", hasAdvance: true, customForm: true, minSum: 5000000, ruleMaxSum: 29999999, rate: 0.03, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "1", guarType: "2", hasAdvance: false, customForm: true, minSum: 5000000, ruleMaxSum: 29999999, rate: 0.03, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "1", guarType: "2", hasAdvance: true, customForm: false, minSum: 5000000, ruleMaxSum: 29999999, rate: 0.03, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "1", guarType: "2", hasAdvance: false, customForm: false, minSum: 5000000, ruleMaxSum: 29999999, rate: 0.03, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "1", guarType: "2", hasAdvance: true, customForm: true, minSum: 30000000, ruleMaxSum: 200000000, rate: 0.028, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "1", guarType: "2", hasAdvance: false, customForm: true, minSum: 30000000, ruleMaxSum: 200000000, rate: 0.028, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "1", guarType: "2", hasAdvance: true, customForm: false, minSum: 30000000, ruleMaxSum: 200000000, rate: 0.028, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "1", guarType: "2", hasAdvance: false, customForm: false, minSum: 30000000, ruleMaxSum: 200000000, rate: 0.028, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "2", guarType: "2", hasAdvance: true, customForm: true, minSum: 0, ruleMaxSum: 99999, rate: 0.05, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "2", guarType: "2", hasAdvance: false, customForm: true, minSum: 0, ruleMaxSum: 99999, rate: 0.05, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "2", guarType: "2", hasAdvance: true, customForm: false, minSum: 0, ruleMaxSum: 99999, rate: 0.05, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "2", guarType: "2", hasAdvance: false, customForm: false, minSum: 0, ruleMaxSum: 99999, rate: 0.05, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "2", guarType: "2", hasAdvance: true, customForm: true, minSum: 100000, ruleMaxSum: 499999, rate: 0.045, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "2", guarType: "2", hasAdvance: false, customForm: true, minSum: 100000, ruleMaxSum: 499999, rate: 0.045, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "2", guarType: "2", hasAdvance: true, customForm: false, minSum: 100000, ruleMaxSum: 499999, rate: 0.045, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "2", guarType: "2", hasAdvance: false, customForm: false, minSum: 100000, ruleMaxSum: 499999, rate: 0.045, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "2", guarType: "2", hasAdvance: true, customForm: true, minSum: 500000, ruleMaxSum: 999999, rate: 0.035, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "2", guarType: "2", hasAdvance: false, customForm: true, minSum: 500000, ruleMaxSum: 999999, rate: 0.035, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "2", guarType: "2", hasAdvance: true, customForm: false, minSum: 500000, ruleMaxSum: 999999, rate: 0.035, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "2", guarType: "2", hasAdvance: false, customForm: false, minSum: 500000, ruleMaxSum: 999999, rate: 0.035, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "2", guarType: "2", hasAdvance: true, customForm: true, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.032, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "2", guarType: "2", hasAdvance: false, customForm: true, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.032, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "2", guarType: "2", hasAdvance: true, customForm: false, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.032, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "2", guarType: "2", hasAdvance: false, customForm: false, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.032, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "2", guarType: "2", hasAdvance: true, customForm: true, minSum: 5000000, ruleMaxSum: 29999999, rate: 0.03, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "2", guarType: "2", hasAdvance: false, customForm: true, minSum: 5000000, ruleMaxSum: 29999999, rate: 0.03, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "2", guarType: "2", hasAdvance: true, customForm: false, minSum: 5000000, ruleMaxSum: 29999999, rate: 0.03, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "2", guarType: "2", hasAdvance: false, customForm: false, minSum: 5000000, ruleMaxSum: 29999999, rate: 0.03, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "2", guarType: "2", hasAdvance: true, customForm: true, minSum: 30000000, ruleMaxSum: 200000000, rate: 0.028, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "2", guarType: "2", hasAdvance: false, customForm: true, minSum: 30000000, ruleMaxSum: 200000000, rate: 0.028, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "2", guarType: "2", hasAdvance: true, customForm: false, minSum: 30000000, ruleMaxSum: 200000000, rate: 0.028, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "2", guarType: "2", hasAdvance: false, customForm: false, minSum: 30000000, ruleMaxSum: 200000000, rate: 0.028, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "3", guarType: "2", hasAdvance: true, customForm: true, minSum: 0, ruleMaxSum: 99999, rate: 0.05, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "3", guarType: "2", hasAdvance: false, customForm: true, minSum: 0, ruleMaxSum: 99999, rate: 0.05, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "3", guarType: "2", hasAdvance: true, customForm: false, minSum: 0, ruleMaxSum: 99999, rate: 0.05, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "3", guarType: "2", hasAdvance: false, customForm: false, minSum: 0, ruleMaxSum: 99999, rate: 0.05, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "3", guarType: "2", hasAdvance: true, customForm: true, minSum: 100000, ruleMaxSum: 499999, rate: 0.045, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "3", guarType: "2", hasAdvance: false, customForm: true, minSum: 100000, ruleMaxSum: 499999, rate: 0.045, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "3", guarType: "2", hasAdvance: true, customForm: false, minSum: 100000, ruleMaxSum: 499999, rate: 0.045, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "3", guarType: "2", hasAdvance: false, customForm: false, minSum: 100000, ruleMaxSum: 499999, rate: 0.045, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "3", guarType: "2", hasAdvance: true, customForm: true, minSum: 500000, ruleMaxSum: 999999, rate: 0.035, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "3", guarType: "2", hasAdvance: false, customForm: true, minSum: 500000, ruleMaxSum: 999999, rate: 0.035, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "3", guarType: "2", hasAdvance: true, customForm: false, minSum: 500000, ruleMaxSum: 999999, rate: 0.035, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "3", guarType: "2", hasAdvance: false, customForm: false, minSum: 500000, ruleMaxSum: 999999, rate: 0.035, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "3", guarType: "2", hasAdvance: true, customForm: true, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.032, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "3", guarType: "2", hasAdvance: false, customForm: true, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.032, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "3", guarType: "2", hasAdvance: true, customForm: false, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.032, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "3", guarType: "2", hasAdvance: false, customForm: false, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.032, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "3", guarType: "2", hasAdvance: true, customForm: true, minSum: 5000000, ruleMaxSum: 29999999, rate: 0.03, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "3", guarType: "2", hasAdvance: false, customForm: true, minSum: 5000000, ruleMaxSum: 29999999, rate: 0.03, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "3", guarType: "2", hasAdvance: true, customForm: false, minSum: 5000000, ruleMaxSum: 29999999, rate: 0.03, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "3", guarType: "2", hasAdvance: false, customForm: false, minSum: 5000000, ruleMaxSum: 29999999, rate: 0.03, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "3", guarType: "2", hasAdvance: true, customForm: true, minSum: 30000000, ruleMaxSum: 200000000, rate: 0.028, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "3", guarType: "2", hasAdvance: false, customForm: true, minSum: 30000000, ruleMaxSum: 200000000, rate: 0.028, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "3", guarType: "2", hasAdvance: true, customForm: false, minSum: 30000000, ruleMaxSum: 200000000, rate: 0.028, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "3", guarType: "2", hasAdvance: false, customForm: false, minSum: 30000000, ruleMaxSum: 200000000, rate: 0.028, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "4", guarType: "2", hasAdvance: true, customForm: true, minSum: 0, ruleMaxSum: 999999, rate: 0.05, minCost: 5000, ruleMaxDays: 1140 },
{ procType: "4", guarType: "2", hasAdvance: false, customForm: true, minSum: 0, ruleMaxSum: 999999, rate: 0.05, minCost: 5000, ruleMaxDays: 1140 },
{ procType: "4", guarType: "2", hasAdvance: true, customForm: false, minSum: 0, ruleMaxSum: 999999, rate: 0.05, minCost: 5000, ruleMaxDays: 1140 },
{ procType: "4", guarType: "2", hasAdvance: false, customForm: false, minSum: 0, ruleMaxSum: 999999, rate: 0.05, minCost: 5000, ruleMaxDays: 1140 },
{ procType: "4", guarType: "2", hasAdvance: true, customForm: true, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.04, minCost: 5000, ruleMaxDays: 1140 },
{ procType: "4", guarType: "2", hasAdvance: false, customForm: true, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.04, minCost: 5000, ruleMaxDays: 1140 },
{ procType: "4", guarType: "2", hasAdvance: true, customForm: false, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.04, minCost: 5000, ruleMaxDays: 1140 },
{ procType: "4", guarType: "2", hasAdvance: false, customForm: false, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.04, minCost: 5000, ruleMaxDays: 1140 },
{ procType: "4", guarType: "2", hasAdvance: true, customForm: true, minSum: 5000000, ruleMaxSum: 50000000, rate: 0.039, minCost: 5000, ruleMaxDays: 1140 },
{ procType: "4", guarType: "2", hasAdvance: false, customForm: true, minSum: 5000000, ruleMaxSum: 50000000, rate: 0.039, minCost: 5000, ruleMaxDays: 1140 },
{ procType: "4", guarType: "2", hasAdvance: true, customForm: false, minSum: 5000000, ruleMaxSum: 50000000, rate: 0.039, minCost: 5000, ruleMaxDays: 1140 },
{ procType: "4", guarType: "2", hasAdvance: false, customForm: false, minSum: 5000000, ruleMaxSum: 50000000, rate: 0.039, minCost: 5000, ruleMaxDays: 1140 },
                   
{ procType: "1", guarType: "1", hasAdvance: false, customForm: true, minSum: 0, ruleMaxSum: 99999, rate: 0.05, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "1", guarType: "1", hasAdvance: false, customForm: false, minSum: 0, ruleMaxSum: 99999, rate: 0.05, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "1", guarType: "1", hasAdvance: false, customForm: true, minSum: 100000, ruleMaxSum: 499999, rate: 0.045, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "1", guarType: "1", hasAdvance: false, customForm: false, minSum: 100000, ruleMaxSum: 499999, rate: 0.045, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "1", guarType: "1", hasAdvance: false, customForm: true, minSum: 500000, ruleMaxSum: 999999, rate: 0.035, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "1", guarType: "1", hasAdvance: false, customForm: false, minSum: 500000, ruleMaxSum: 999999, rate: 0.035, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "1", guarType: "1", hasAdvance: false, customForm: true, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.032, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "1", guarType: "1", hasAdvance: false, customForm: false, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.032, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "1", guarType: "1", hasAdvance: false, customForm: true, minSum: 5000000, ruleMaxSum: 29999999, rate: 0.03, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "1", guarType: "1", hasAdvance: false, customForm: false, minSum: 5000000, ruleMaxSum: 29999999, rate: 0.03, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "1", guarType: "1", hasAdvance: false, customForm: true, minSum: 30000000, ruleMaxSum: 200000000, rate: 0.028, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "1", guarType: "1", hasAdvance: false, customForm: false, minSum: 30000000, ruleMaxSum: 200000000, rate: 0.028, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "2", guarType: "1", hasAdvance: false, customForm: true, minSum: 0, ruleMaxSum: 99999, rate: 0.05, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "2", guarType: "1", hasAdvance: false, customForm: false, minSum: 0, ruleMaxSum: 99999, rate: 0.05, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "2", guarType: "1", hasAdvance: false, customForm: true, minSum: 100000, ruleMaxSum: 499999, rate: 0.045, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "2", guarType: "1", hasAdvance: false, customForm: false, minSum: 100000, ruleMaxSum: 499999, rate: 0.045, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "2", guarType: "1", hasAdvance: false, customForm: true, minSum: 500000, ruleMaxSum: 999999, rate: 0.035, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "2", guarType: "1", hasAdvance: false, customForm: false, minSum: 500000, ruleMaxSum: 999999, rate: 0.035, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "2", guarType: "1", hasAdvance: false, customForm: true, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.032, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "2", guarType: "1", hasAdvance: false, customForm: false, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.032, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "2", guarType: "1", hasAdvance: false, customForm: true, minSum: 5000000, ruleMaxSum: 29999999, rate: 0.03, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "2", guarType: "1", hasAdvance: false, customForm: false, minSum: 5000000, ruleMaxSum: 29999999, rate: 0.03, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "2", guarType: "1", hasAdvance: false, customForm: true, minSum: 30000000, ruleMaxSum: 200000000, rate: 0.028, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "2", guarType: "1", hasAdvance: false, customForm: false, minSum: 30000000, ruleMaxSum: 200000000, rate: 0.028, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "3", guarType: "1", hasAdvance: false, customForm: true, minSum: 0, ruleMaxSum: 99999, rate: 0.05, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "3", guarType: "1", hasAdvance: false, customForm: false, minSum: 0, ruleMaxSum: 99999, rate: 0.05, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "3", guarType: "1", hasAdvance: false, customForm: true, minSum: 100000, ruleMaxSum: 499999, rate: 0.045, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "3", guarType: "1", hasAdvance: false, customForm: false, minSum: 100000, ruleMaxSum: 499999, rate: 0.045, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "3", guarType: "1", hasAdvance: false, customForm: true, minSum: 500000, ruleMaxSum: 999999, rate: 0.035, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "3", guarType: "1", hasAdvance: false, customForm: false, minSum: 500000, ruleMaxSum: 999999, rate: 0.035, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "3", guarType: "1", hasAdvance: false, customForm: true, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.032, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "3", guarType: "1", hasAdvance: false, customForm: false, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.032, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "3", guarType: "1", hasAdvance: false, customForm: true, minSum: 5000000, ruleMaxSum: 29999999, rate: 0.03, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "3", guarType: "1", hasAdvance: false, customForm: false, minSum: 5000000, ruleMaxSum: 29999999, rate: 0.03, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "3", guarType: "1", hasAdvance: false, customForm: true, minSum: 30000000, ruleMaxSum: 200000000, rate: 0.028, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "3", guarType: "1", hasAdvance: false, customForm: false, minSum: 30000000, ruleMaxSum: 200000000, rate: 0.028, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "4", guarType: "1", hasAdvance: false, customForm: true, minSum: 0, ruleMaxSum: 999999, rate: 0.05, minCost: 5000, ruleMaxDays: 1140 },
{ procType: "4", guarType: "1", hasAdvance: false, customForm: false, minSum: 0, ruleMaxSum: 999999, rate: 0.05, minCost: 5000, ruleMaxDays: 1140 },
{ procType: "4", guarType: "1", hasAdvance: false, customForm: true, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.04, minCost: 5000, ruleMaxDays: 1140 },
{ procType: "4", guarType: "1", hasAdvance: false, customForm: false, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.04, minCost: 5000, ruleMaxDays: 1140 },
{ procType: "4", guarType: "1", hasAdvance: false, customForm: true, minSum: 5000000, ruleMaxSum: 50000000, rate: 0.039, minCost: 5000, ruleMaxDays: 1140 },
{ procType: "4", guarType: "1", hasAdvance: false, customForm: false, minSum: 5000000, ruleMaxSum: 50000000, rate: 0.039, minCost: 5000, ruleMaxDays: 1140 },
                   
{ procType: "2", guarType: "3", hasAdvance: false, customForm: true, minSum: 0, ruleMaxSum: 99999, rate: 0.05, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "2", guarType: "3", hasAdvance: false, customForm: false, minSum: 0, ruleMaxSum: 99999, rate: 0.05, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "2", guarType: "3", hasAdvance: false, customForm: true, minSum: 100000, ruleMaxSum: 499999, rate: 0.045, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "2", guarType: "3", hasAdvance: false, customForm: false, minSum: 100000, ruleMaxSum: 499999, rate: 0.045, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "2", guarType: "3", hasAdvance: false, customForm: true, minSum: 500000, ruleMaxSum: 999999, rate: 0.035, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "2", guarType: "3", hasAdvance: false, customForm: false, minSum: 500000, ruleMaxSum: 999999, rate: 0.035, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "2", guarType: "3", hasAdvance: false, customForm: true, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.032, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "2", guarType: "3", hasAdvance: false, customForm: false, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.032, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "2", guarType: "3", hasAdvance: false, customForm: true, minSum: 5000000, ruleMaxSum: 10000000, rate: 0.03, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "2", guarType: "3", hasAdvance: false, customForm: false, minSum: 5000000, ruleMaxSum: 10000000, rate: 0.03, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "3", guarType: "3", hasAdvance: false, customForm: true, minSum: 0, ruleMaxSum: 99999, rate: 0.05, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "3", guarType: "3", hasAdvance: false, customForm: false, minSum: 0, ruleMaxSum: 99999, rate: 0.05, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "3", guarType: "3", hasAdvance: false, customForm: true, minSum: 100000, ruleMaxSum: 499999, rate: 0.045, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "3", guarType: "3", hasAdvance: false, customForm: false, minSum: 100000, ruleMaxSum: 499999, rate: 0.045, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "3", guarType: "3", hasAdvance: false, customForm: true, minSum: 500000, ruleMaxSum: 999999, rate: 0.035, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "3", guarType: "3", hasAdvance: false, customForm: false, minSum: 500000, ruleMaxSum: 999999, rate: 0.035, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "3", guarType: "3", hasAdvance: false, customForm: true, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.032, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "3", guarType: "3", hasAdvance: false, customForm: false, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.032, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "3", guarType: "3", hasAdvance: false, customForm: true, minSum: 5000000, ruleMaxSum: 10000000, rate: 0.03, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "3", guarType: "3", hasAdvance: false, customForm: false, minSum: 5000000, ruleMaxSum: 10000000, rate: 0.03, minCost: 1000, ruleMaxDays: 1140 },
{ procType: "4", guarType: "3", hasAdvance: false, customForm: true, minSum: 0, ruleMaxSum: 999999, rate: 0.05, minCost: 5000, ruleMaxDays: 1140 },
{ procType: "4", guarType: "3", hasAdvance: false, customForm: false, minSum: 0, ruleMaxSum: 999999, rate: 0.05, minCost: 5000, ruleMaxDays: 1140 },
{ procType: "4", guarType: "3", hasAdvance: false, customForm: true, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.04, minCost: 5000, ruleMaxDays: 1140 },
{ procType: "4", guarType: "3", hasAdvance: false, customForm: false, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.04, minCost: 5000, ruleMaxDays: 1140 },
{ procType: "4", guarType: "3", hasAdvance: false, customForm: true, minSum: 5000000, ruleMaxSum: 10000000, rate: 0.039, minCost: 5000, ruleMaxDays: 1140 },
{ procType: "4", guarType: "3", hasAdvance: false, customForm: false, minSum: 5000000, ruleMaxSum: 10000000, rate: 0.039, minCost: 5000, ruleMaxDays: 1140 },
                   
{ procType: "1", guarType: "4", hasAdvance: false, customForm: true, minSum: 0, ruleMaxSum: 99999, rate: 0.05, minCost: 1000, ruleMaxDays: 1860 },
{ procType: "1", guarType: "4", hasAdvance: false, customForm: false, minSum: 0, ruleMaxSum: 99999, rate: 0.05, minCost: 1000, ruleMaxDays: 1860 },
{ procType: "1", guarType: "4", hasAdvance: false, customForm: true, minSum: 100000, ruleMaxSum: 499999, rate: 0.045, minCost: 1000, ruleMaxDays: 1860 },
{ procType: "1", guarType: "4", hasAdvance: false, customForm: false, minSum: 100000, ruleMaxSum: 499999, rate: 0.045, minCost: 1000, ruleMaxDays: 1860 },
{ procType: "1", guarType: "4", hasAdvance: false, customForm: true, minSum: 500000, ruleMaxSum: 999999, rate: 0.035, minCost: 1000, ruleMaxDays: 1860 },
{ procType: "1", guarType: "4", hasAdvance: false, customForm: false, minSum: 500000, ruleMaxSum: 999999, rate: 0.035, minCost: 1000, ruleMaxDays: 1860 },
{ procType: "1", guarType: "4", hasAdvance: false, customForm: true, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.032, minCost: 1000, ruleMaxDays: 1860 },
{ procType: "1", guarType: "4", hasAdvance: false, customForm: false, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.032, minCost: 1000, ruleMaxDays: 1860 },
{ procType: "1", guarType: "4", hasAdvance: false, customForm: true, minSum: 5000000, ruleMaxSum: 29999999, rate: 0.03, minCost: 1000, ruleMaxDays: 1860 },
{ procType: "1", guarType: "4", hasAdvance: false, customForm: false, minSum: 5000000, ruleMaxSum: 29999999, rate: 0.03, minCost: 1000, ruleMaxDays: 1860 },
{ procType: "1", guarType: "4", hasAdvance: false, customForm: true, minSum: 30000000, ruleMaxSum: 200000000, rate: 0.028, minCost: 1000, ruleMaxDays: 1860 },
{ procType: "1", guarType: "4", hasAdvance: false, customForm: false, minSum: 30000000, ruleMaxSum: 200000000, rate: 0.028, minCost: 1000, ruleMaxDays: 1860 },
{ procType: "2", guarType: "4", hasAdvance: false, customForm: true, minSum: 0, ruleMaxSum: 99999, rate: 0.05, minCost: 1000, ruleMaxDays: 1860 },
{ procType: "2", guarType: "4", hasAdvance: false, customForm: false, minSum: 0, ruleMaxSum: 99999, rate: 0.05, minCost: 1000, ruleMaxDays: 1860 },
{ procType: "2", guarType: "4", hasAdvance: false, customForm: true, minSum: 100000, ruleMaxSum: 499999, rate: 0.045, minCost: 1000, ruleMaxDays: 1860 },
{ procType: "2", guarType: "4", hasAdvance: false, customForm: false, minSum: 100000, ruleMaxSum: 499999, rate: 0.045, minCost: 1000, ruleMaxDays: 1860 },
{ procType: "2", guarType: "4", hasAdvance: false, customForm: true, minSum: 500000, ruleMaxSum: 999999, rate: 0.035, minCost: 1000, ruleMaxDays: 1860 },
{ procType: "2", guarType: "4", hasAdvance: false, customForm: false, minSum: 500000, ruleMaxSum: 999999, rate: 0.035, minCost: 1000, ruleMaxDays: 1860 },
{ procType: "2", guarType: "4", hasAdvance: false, customForm: true, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.032, minCost: 1000, ruleMaxDays: 1860 },
{ procType: "2", guarType: "4", hasAdvance: false, customForm: false, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.032, minCost: 1000, ruleMaxDays: 1860 },
{ procType: "2", guarType: "4", hasAdvance: false, customForm: true, minSum: 5000000, ruleMaxSum: 29999999, rate: 0.03, minCost: 1000, ruleMaxDays: 1860 },
{ procType: "2", guarType: "4", hasAdvance: false, customForm: false, minSum: 5000000, ruleMaxSum: 29999999, rate: 0.03, minCost: 1000, ruleMaxDays: 1860 },
{ procType: "2", guarType: "4", hasAdvance: false, customForm: true, minSum: 30000000, ruleMaxSum: 200000000, rate: 0.028, minCost: 1000, ruleMaxDays: 1860 },
{ procType: "2", guarType: "4", hasAdvance: false, customForm: false, minSum: 30000000, ruleMaxSum: 200000000, rate: 0.028, minCost: 1000, ruleMaxDays: 1860 },
{ procType: "3", guarType: "4", hasAdvance: false, customForm: true, minSum: 0, ruleMaxSum: 99999, rate: 0.05, minCost: 1000, ruleMaxDays: 1860 },
{ procType: "3", guarType: "4", hasAdvance: false, customForm: false, minSum: 0, ruleMaxSum: 99999, rate: 0.05, minCost: 1000, ruleMaxDays: 1860 },
{ procType: "3", guarType: "4", hasAdvance: false, customForm: true, minSum: 100000, ruleMaxSum: 499999, rate: 0.045, minCost: 1000, ruleMaxDays: 1860 },
{ procType: "3", guarType: "4", hasAdvance: false, customForm: false, minSum: 100000, ruleMaxSum: 499999, rate: 0.045, minCost: 1000, ruleMaxDays: 1860 },
{ procType: "3", guarType: "4", hasAdvance: false, customForm: true, minSum: 500000, ruleMaxSum: 999999, rate: 0.035, minCost: 1000, ruleMaxDays: 1860 },
{ procType: "3", guarType: "4", hasAdvance: false, customForm: false, minSum: 500000, ruleMaxSum: 999999, rate: 0.035, minCost: 1000, ruleMaxDays: 1860 },
{ procType: "3", guarType: "4", hasAdvance: false, customForm: true, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.032, minCost: 1000, ruleMaxDays: 1860 },
{ procType: "3", guarType: "4", hasAdvance: false, customForm: false, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.032, minCost: 1000, ruleMaxDays: 1860 },
{ procType: "3", guarType: "4", hasAdvance: false, customForm: true, minSum: 5000000, ruleMaxSum: 10000000, rate: 0.03, minCost: 1000, ruleMaxDays: 1860 },
{ procType: "3", guarType: "4", hasAdvance: false, customForm: false, minSum: 5000000, ruleMaxSum: 10000000, rate: 0.03, minCost: 1000, ruleMaxDays: 1860 },
{ procType: "4", guarType: "4", hasAdvance: false, customForm: true, minSum: 0, ruleMaxSum: 999999, rate: 0.05, minCost: 5000, ruleMaxDays: 1860 },
{ procType: "4", guarType: "4", hasAdvance: false, customForm: false, minSum: 0, ruleMaxSum: 999999, rate: 0.05, minCost: 5000, ruleMaxDays: 1860 },
{ procType: "4", guarType: "4", hasAdvance: false, customForm: true, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.04, minCost: 5000, ruleMaxDays: 1860 },
{ procType: "4", guarType: "4", hasAdvance: false, customForm: false, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.04, minCost: 5000, ruleMaxDays: 1860 },
{ procType: "4", guarType: "4", hasAdvance: false, customForm: true, minSum: 5000000, ruleMaxSum: 50000000, rate: 0.039, minCost: 5000, ruleMaxDays: 1860 },
{ procType: "4", guarType: "4", hasAdvance: false, customForm: false, minSum: 5000000, ruleMaxSum: 50000000, rate: 0.039, minCost: 5000, ruleMaxDays: 1860 },




      ]
    },

    {
      name: "АО Газпромбанк",
      logo: "/delta-garant/images/banks-logo/gpb.svg",
      data: 'Решение от 1-2 дня\nБез поручительства\nБез открытия расчетного счета',
      conditions: [
        // На исполнение
        { procType: "1", guarType: "2", hasAdvance: true, customForm: true, minSum: 0, ruleMaxSum: 150000000, rate: 0.038, minCost: 1999, ruleMaxDays: 1860 },
{ procType: "1", guarType: "2", hasAdvance: false, customForm: true, minSum: 0, ruleMaxSum: 150000000, rate: 0.038, minCost: 1999, ruleMaxDays: 1860 },
{ procType: "1", guarType: "2", hasAdvance: true, customForm: false, minSum: 0, ruleMaxSum: 150000000, rate: 0.038, minCost: 1999, ruleMaxDays: 1860 },
{ procType: "1", guarType: "2", hasAdvance: false, customForm: false, minSum: 0, ruleMaxSum: 150000000, rate: 0.038, minCost: 1999, ruleMaxDays: 1860 },
{ procType: "2", guarType: "2", hasAdvance: true, customForm: true, minSum: 0, ruleMaxSum: Infinity, rate: 0.0345, minCost: 1999, ruleMaxDays: 1860 },
{ procType: "2", guarType: "2", hasAdvance: false, customForm: true, minSum: 0, ruleMaxSum: Infinity, rate: 0.0345, minCost: 1999, ruleMaxDays: 1860 },
{ procType: "2", guarType: "2", hasAdvance: true, customForm: false, minSum: 0, ruleMaxSum: Infinity, rate: 0.0345, minCost: 1999, ruleMaxDays: 1860 },
{ procType: "2", guarType: "2", hasAdvance: false, customForm: false, minSum: 0, ruleMaxSum: Infinity, rate: 0.0345, minCost: 1999, ruleMaxDays: 1860 },
{ procType: "3", guarType: "2", hasAdvance: true, customForm: true, minSum: 0, ruleMaxSum: 150000000, rate: 0.038, minCost: 1999, ruleMaxDays: 1860 },
{ procType: "3", guarType: "2", hasAdvance: false, customForm: true, minSum: 0, ruleMaxSum: 150000000, rate: 0.038, minCost: 1999, ruleMaxDays: 1860 },
{ procType: "3", guarType: "2", hasAdvance: true, customForm: false, minSum: 0, ruleMaxSum: 150000000, rate: 0.038, minCost: 1999, ruleMaxDays: 1860 },
{ procType: "3", guarType: "2", hasAdvance: false, customForm: false, minSum: 0, ruleMaxSum: 150000000, rate: 0.038, minCost: 1999, ruleMaxDays: 1860 },
{ procType: "4", guarType: "2", hasAdvance: true, customForm: true, minSum: 0, ruleMaxSum: Infinity, rate: 0.0465, minCost: 1999, ruleMaxDays: 1860 },
{ procType: "4", guarType: "2", hasAdvance: false, customForm: true, minSum: 0, ruleMaxSum: Infinity, rate: 0.0465, minCost: 1999, ruleMaxDays: 1860 },
{ procType: "4", guarType: "2", hasAdvance: true, customForm: false, minSum: 0, ruleMaxSum: Infinity, rate: 0.0465, minCost: 1999, ruleMaxDays: 1860 },
{ procType: "4", guarType: "2", hasAdvance: false, customForm: false, minSum: 0, ruleMaxSum: Infinity, rate: 0.0465, minCost: 1999, ruleMaxDays: 1860 },
                   
{ procType: "1", guarType: "1", hasAdvance: false, customForm: true, minSum: 0, ruleMaxSum: 150000000, rate: 0.038, minCost: 1999, ruleMaxDays: 1860 },
{ procType: "1", guarType: "1", hasAdvance: false, customForm: false, minSum: 0, ruleMaxSum: 150000000, rate: 0.038, minCost: 1999, ruleMaxDays: 1860 },
{ procType: "2", guarType: "1", hasAdvance: false, customForm: true, minSum: 0, ruleMaxSum: Infinity, rate: 0.0345, minCost: 1999, ruleMaxDays: 1860 },
{ procType: "2", guarType: "1", hasAdvance: false, customForm: false, minSum: 0, ruleMaxSum: Infinity, rate: 0.0345, minCost: 1999, ruleMaxDays: 1860 },         
{ procType: "4", guarType: "1", hasAdvance: false, customForm: true, minSum: 0, ruleMaxSum: Infinity, rate: 0.0465, minCost: 1999, ruleMaxDays: 1860 },
{ procType: "4", guarType: "1", hasAdvance: false, customForm: false, minSum: 0, ruleMaxSum: Infinity, rate: 0.0465, minCost: 1999, ruleMaxDays: 1860 },
                   
{ procType: "2", guarType: "3", hasAdvance: false, customForm: true, minSum: 0, ruleMaxSum: Infinity, rate: 0.038, minCost: 1999, ruleMaxDays: 1860 },
{ procType: "2", guarType: "3", hasAdvance: false, customForm: false, minSum: 0, ruleMaxSum: Infinity, rate: 0.038, minCost: 1999, ruleMaxDays: 1860 },               
{ procType: "4", guarType: "3", hasAdvance: false, customForm: true, minSum: 0, ruleMaxSum: Infinity, rate: 0.0465, minCost: 1999, ruleMaxDays: 1860 },
{ procType: "4", guarType: "3", hasAdvance: false, customForm: false, minSum: 0, ruleMaxSum: Infinity, rate: 0.0465, minCost: 1999, ruleMaxDays: 1860 },
                   
{ procType: "1", guarType: "4", hasAdvance: false, customForm: true, minSum: 0, ruleMaxSum: 150000000, rate: 0.038, minCost: 1999, ruleMaxDays: 1860 },
{ procType: "1", guarType: "4", hasAdvance: false, customForm: false, minSum: 0, ruleMaxSum: 150000000, rate: 0.038, minCost: 1999, ruleMaxDays: 1860 },
{ procType: "2", guarType: "4", hasAdvance: false, customForm: true, minSum: 0, ruleMaxSum: 999999, rate: 0.04, minCost: 1999, ruleMaxDays: 1860 },
{ procType: "2", guarType: "4", hasAdvance: false, customForm: false, minSum: 0, ruleMaxSum: 999999, rate: 0.04, minCost: 1999, ruleMaxDays: 1860 },
{ procType: "2", guarType: "4", hasAdvance: false, customForm: true, minSum: 1000000, ruleMaxSum: 150000000, rate: 0.038, minCost: 1999, ruleMaxDays: 1860 },
{ procType: "2", guarType: "4", hasAdvance: false, customForm: false, minSum: 1000000, ruleMaxSum: 150000000, rate: 0.038, minCost: 1999, ruleMaxDays: 1860 },


      ]
    },

    {
      name: "ПАО «Московский Кредитный Банк»",
      logo: "/delta-garant/images/banks-logo/mkb.svg",
      data: 'Решение от 1 дня\nБез поручительства\nБез открытия расчетного счета',
      conditions: [
        // На исполнение
        { procType: "1", guarType: "2", hasAdvance: true, customForm: true, minSum: 0, ruleMaxSum: 99999, rate: 0.08, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "1", guarType: "2", hasAdvance: false, customForm: true, minSum: 0, ruleMaxSum: 99999, rate: 0.08, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "1", guarType: "2", hasAdvance: true, customForm: false, minSum: 0, ruleMaxSum: 99999, rate: 0.08, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "1", guarType: "2", hasAdvance: false, customForm: false, minSum: 0, ruleMaxSum: 99999, rate: 0.08, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "1", guarType: "2", hasAdvance: true, customForm: true, minSum: 0, ruleMaxSum: 99999, rate: 0.07, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "1", guarType: "2", hasAdvance: false, customForm: true, minSum: 0, ruleMaxSum: 99999, rate: 0.07, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "1", guarType: "2", hasAdvance: true, customForm: false, minSum: 0, ruleMaxSum: 99999, rate: 0.07, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "1", guarType: "2", hasAdvance: false, customForm: false, minSum: 0, ruleMaxSum: 99999, rate: 0.07, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "1", guarType: "2", hasAdvance: true, customForm: true, minSum: 100000, ruleMaxSum: 499999, rate: 0.07, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "1", guarType: "2", hasAdvance: false, customForm: true, minSum: 100000, ruleMaxSum: 499999, rate: 0.07, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "1", guarType: "2", hasAdvance: true, customForm: false, minSum: 100000, ruleMaxSum: 499999, rate: 0.07, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "1", guarType: "2", hasAdvance: false, customForm: false, minSum: 100000, ruleMaxSum: 499999, rate: 0.07, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "1", guarType: "2", hasAdvance: true, customForm: true, minSum: 100000, ruleMaxSum: 499999, rate: 0.06, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "1", guarType: "2", hasAdvance: false, customForm: true, minSum: 100000, ruleMaxSum: 499999, rate: 0.06, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "1", guarType: "2", hasAdvance: true, customForm: false, minSum: 100000, ruleMaxSum: 499999, rate: 0.06, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "1", guarType: "2", hasAdvance: false, customForm: false, minSum: 100000, ruleMaxSum: 499999, rate: 0.06, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "1", guarType: "2", hasAdvance: true, customForm: true, minSum: 500000, ruleMaxSum: 999999, rate: 0.06, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "1", guarType: "2", hasAdvance: false, customForm: true, minSum: 500000, ruleMaxSum: 999999, rate: 0.06, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "1", guarType: "2", hasAdvance: true, customForm: false, minSum: 500000, ruleMaxSum: 999999, rate: 0.06, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "1", guarType: "2", hasAdvance: false, customForm: false, minSum: 500000, ruleMaxSum: 999999, rate: 0.06, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "1", guarType: "2", hasAdvance: true, customForm: true, minSum: 500000, ruleMaxSum: 999999, rate: 0.05, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "1", guarType: "2", hasAdvance: false, customForm: true, minSum: 500000, ruleMaxSum: 999999, rate: 0.05, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "1", guarType: "2", hasAdvance: true, customForm: false, minSum: 500000, ruleMaxSum: 999999, rate: 0.05, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "1", guarType: "2", hasAdvance: false, customForm: false, minSum: 500000, ruleMaxSum: 999999, rate: 0.05, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "1", guarType: "2", hasAdvance: true, customForm: true, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.042, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "1", guarType: "2", hasAdvance: false, customForm: true, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.042, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "1", guarType: "2", hasAdvance: true, customForm: false, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.042, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "1", guarType: "2", hasAdvance: false, customForm: false, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.042, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "1", guarType: "2", hasAdvance: true, customForm: true, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.04, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "1", guarType: "2", hasAdvance: false, customForm: true, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.04, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "1", guarType: "2", hasAdvance: true, customForm: false, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.04, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "1", guarType: "2", hasAdvance: false, customForm: false, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.04, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "1", guarType: "2", hasAdvance: true, customForm: true, minSum: 5000000, ruleMaxSum: 150000000, rate: 0.037, minCost: 990, ruleMinDays: 0, ruleMaxDays: 1930 },
{ procType: "1", guarType: "2", hasAdvance: false, customForm: true, minSum: 5000000, ruleMaxSum: 150000000, rate: 0.037, minCost: 990, ruleMinDays: 0, ruleMaxDays: 1930 },
{ procType: "1", guarType: "2", hasAdvance: true, customForm: false, minSum: 5000000, ruleMaxSum: 150000000, rate: 0.037, minCost: 990, ruleMinDays: 0, ruleMaxDays: 1930 },
{ procType: "1", guarType: "2", hasAdvance: false, customForm: false, minSum: 5000000, ruleMaxSum: 150000000, rate: 0.037, minCost: 990, ruleMinDays: 0, ruleMaxDays: 1930 },
{ procType: "2", guarType: "2", hasAdvance: true, customForm: true, minSum: 0, ruleMaxSum: 99999, rate: 0.08, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "2", guarType: "2", hasAdvance: false, customForm: true, minSum: 0, ruleMaxSum: 99999, rate: 0.08, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "2", guarType: "2", hasAdvance: true, customForm: false, minSum: 0, ruleMaxSum: 99999, rate: 0.08, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "2", guarType: "2", hasAdvance: false, customForm: false, minSum: 0, ruleMaxSum: 99999, rate: 0.08, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "2", guarType: "2", hasAdvance: true, customForm: true, minSum: 0, ruleMaxSum: 99999, rate: 0.07, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "2", guarType: "2", hasAdvance: false, customForm: true, minSum: 0, ruleMaxSum: 99999, rate: 0.07, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "2", guarType: "2", hasAdvance: true, customForm: false, minSum: 0, ruleMaxSum: 99999, rate: 0.07, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "2", guarType: "2", hasAdvance: false, customForm: false, minSum: 0, ruleMaxSum: 99999, rate: 0.07, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "2", guarType: "2", hasAdvance: true, customForm: true, minSum: 100000, ruleMaxSum: 499999, rate: 0.07, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "2", guarType: "2", hasAdvance: false, customForm: true, minSum: 100000, ruleMaxSum: 499999, rate: 0.07, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "2", guarType: "2", hasAdvance: true, customForm: false, minSum: 100000, ruleMaxSum: 499999, rate: 0.07, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "2", guarType: "2", hasAdvance: false, customForm: false, minSum: 100000, ruleMaxSum: 499999, rate: 0.07, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "2", guarType: "2", hasAdvance: true, customForm: true, minSum: 100000, ruleMaxSum: 499999, rate: 0.06, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "2", guarType: "2", hasAdvance: false, customForm: true, minSum: 100000, ruleMaxSum: 499999, rate: 0.06, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "2", guarType: "2", hasAdvance: true, customForm: false, minSum: 100000, ruleMaxSum: 499999, rate: 0.06, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "2", guarType: "2", hasAdvance: false, customForm: false, minSum: 100000, ruleMaxSum: 499999, rate: 0.06, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "2", guarType: "2", hasAdvance: true, customForm: true, minSum: 500000, ruleMaxSum: 999999, rate: 0.06, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "2", guarType: "2", hasAdvance: false, customForm: true, minSum: 500000, ruleMaxSum: 999999, rate: 0.06, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "2", guarType: "2", hasAdvance: true, customForm: false, minSum: 500000, ruleMaxSum: 999999, rate: 0.06, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "2", guarType: "2", hasAdvance: false, customForm: false, minSum: 500000, ruleMaxSum: 999999, rate: 0.06, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "2", guarType: "2", hasAdvance: true, customForm: true, minSum: 500000, ruleMaxSum: 999999, rate: 0.05, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "2", guarType: "2", hasAdvance: false, customForm: true, minSum: 500000, ruleMaxSum: 999999, rate: 0.05, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "2", guarType: "2", hasAdvance: true, customForm: false, minSum: 500000, ruleMaxSum: 999999, rate: 0.05, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "2", guarType: "2", hasAdvance: false, customForm: false, minSum: 500000, ruleMaxSum: 999999, rate: 0.05, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "2", guarType: "2", hasAdvance: true, customForm: true, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.042, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "2", guarType: "2", hasAdvance: false, customForm: true, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.042, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "2", guarType: "2", hasAdvance: true, customForm: false, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.042, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "2", guarType: "2", hasAdvance: false, customForm: false, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.042, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "2", guarType: "2", hasAdvance: true, customForm: true, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.04, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "2", guarType: "2", hasAdvance: false, customForm: true, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.04, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "2", guarType: "2", hasAdvance: true, customForm: false, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.04, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "2", guarType: "2", hasAdvance: false, customForm: false, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.04, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "2", guarType: "2", hasAdvance: true, customForm: true, minSum: 5000000, ruleMaxSum: 150000000, rate: 0.037, minCost: 990, ruleMinDays: 0, ruleMaxDays: 1930 },
{ procType: "2", guarType: "2", hasAdvance: false, customForm: true, minSum: 5000000, ruleMaxSum: 150000000, rate: 0.037, minCost: 990, ruleMinDays: 0, ruleMaxDays: 1930 },
{ procType: "2", guarType: "2", hasAdvance: true, customForm: false, minSum: 5000000, ruleMaxSum: 150000000, rate: 0.037, minCost: 990, ruleMinDays: 0, ruleMaxDays: 1930 },
{ procType: "2", guarType: "2", hasAdvance: false, customForm: false, minSum: 5000000, ruleMaxSum: 150000000, rate: 0.037, minCost: 990, ruleMinDays: 0, ruleMaxDays: 1930 },
{ procType: "4", guarType: "2", hasAdvance: true, customForm: true, minSum: 0, ruleMaxSum: 150000000, rate: 0.06, minCost: 990, ruleMinDays: 0, ruleMaxDays: 1930 },
{ procType: "4", guarType: "2", hasAdvance: false, customForm: true, minSum: 0, ruleMaxSum: 150000000, rate: 0.06, minCost: 990, ruleMinDays: 0, ruleMaxDays: 1930 },
{ procType: "4", guarType: "2", hasAdvance: true, customForm: false, minSum: 0, ruleMaxSum: 150000000, rate: 0.06, minCost: 990, ruleMinDays: 0, ruleMaxDays: 1930 },
{ procType: "4", guarType: "2", hasAdvance: false, customForm: false, minSum: 0, ruleMaxSum: 150000000, rate: 0.06, minCost: 990, ruleMinDays: 0, ruleMaxDays: 1930 },
        // На участие
        { procType: "1", guarType: "1", hasAdvance: true, customForm: true, minSum: 0, ruleMaxSum: 99999, rate: 0.08, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "1", guarType: "1", hasAdvance: false, customForm: true, minSum: 0, ruleMaxSum: 99999, rate: 0.08, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "1", guarType: "1", hasAdvance: true, customForm: false, minSum: 0, ruleMaxSum: 99999, rate: 0.08, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "1", guarType: "1", hasAdvance: false, customForm: false, minSum: 0, ruleMaxSum: 99999, rate: 0.08, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "1", guarType: "1", hasAdvance: true, customForm: true, minSum: 0, ruleMaxSum: 99999, rate: 0.07, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "1", guarType: "1", hasAdvance: false, customForm: true, minSum: 0, ruleMaxSum: 99999, rate: 0.07, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "1", guarType: "1", hasAdvance: true, customForm: false, minSum: 0, ruleMaxSum: 99999, rate: 0.07, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "1", guarType: "1", hasAdvance: false, customForm: false, minSum: 0, ruleMaxSum: 99999, rate: 0.07, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "1", guarType: "1", hasAdvance: true, customForm: true, minSum: 100000, ruleMaxSum: 499999, rate: 0.07, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "1", guarType: "1", hasAdvance: false, customForm: true, minSum: 100000, ruleMaxSum: 499999, rate: 0.07, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "1", guarType: "1", hasAdvance: true, customForm: false, minSum: 100000, ruleMaxSum: 499999, rate: 0.07, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "1", guarType: "1", hasAdvance: false, customForm: false, minSum: 100000, ruleMaxSum: 499999, rate: 0.07, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "1", guarType: "1", hasAdvance: true, customForm: true, minSum: 100000, ruleMaxSum: 499999, rate: 0.06, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "1", guarType: "1", hasAdvance: false, customForm: true, minSum: 100000, ruleMaxSum: 499999, rate: 0.06, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "1", guarType: "1", hasAdvance: true, customForm: false, minSum: 100000, ruleMaxSum: 499999, rate: 0.06, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "1", guarType: "1", hasAdvance: false, customForm: false, minSum: 100000, ruleMaxSum: 499999, rate: 0.06, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "1", guarType: "1", hasAdvance: true, customForm: true, minSum: 500000, ruleMaxSum: 999999, rate: 0.06, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "1", guarType: "1", hasAdvance: false, customForm: true, minSum: 500000, ruleMaxSum: 999999, rate: 0.06, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "1", guarType: "1", hasAdvance: true, customForm: false, minSum: 500000, ruleMaxSum: 999999, rate: 0.06, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "1", guarType: "1", hasAdvance: false, customForm: false, minSum: 500000, ruleMaxSum: 999999, rate: 0.06, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "1", guarType: "1", hasAdvance: true, customForm: true, minSum: 500000, ruleMaxSum: 999999, rate: 0.05, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "1", guarType: "1", hasAdvance: false, customForm: true, minSum: 500000, ruleMaxSum: 999999, rate: 0.05, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "1", guarType: "1", hasAdvance: true, customForm: false, minSum: 500000, ruleMaxSum: 999999, rate: 0.05, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "1", guarType: "1", hasAdvance: false, customForm: false, minSum: 500000, ruleMaxSum: 999999, rate: 0.05, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "1", guarType: "1", hasAdvance: true, customForm: true, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.042, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "1", guarType: "1", hasAdvance: false, customForm: true, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.042, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "1", guarType: "1", hasAdvance: true, customForm: false, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.042, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "1", guarType: "1", hasAdvance: false, customForm: false, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.042, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "1", guarType: "1", hasAdvance: true, customForm: true, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.04, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "1", guarType: "1", hasAdvance: false, customForm: true, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.04, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "1", guarType: "1", hasAdvance: true, customForm: false, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.04, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "1", guarType: "1", hasAdvance: false, customForm: false, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.04, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "1", guarType: "1", hasAdvance: true, customForm: true, minSum: 5000000, ruleMaxSum: 150000000, rate: 0.037, minCost: 990, ruleMinDays: 0, ruleMaxDays: 1930 },
{ procType: "1", guarType: "1", hasAdvance: false, customForm: true, minSum: 5000000, ruleMaxSum: 150000000, rate: 0.037, minCost: 990, ruleMinDays: 0, ruleMaxDays: 1930 },
{ procType: "1", guarType: "1", hasAdvance: true, customForm: false, minSum: 5000000, ruleMaxSum: 150000000, rate: 0.037, minCost: 990, ruleMinDays: 0, ruleMaxDays: 1930 },
{ procType: "1", guarType: "1", hasAdvance: false, customForm: false, minSum: 5000000, ruleMaxSum: 150000000, rate: 0.037, minCost: 990, ruleMinDays: 0, ruleMaxDays: 1930 },
{ procType: "2", guarType: "1", hasAdvance: true, customForm: true, minSum: 0, ruleMaxSum: 99999, rate: 0.08, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "2", guarType: "1", hasAdvance: false, customForm: true, minSum: 0, ruleMaxSum: 99999, rate: 0.08, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "2", guarType: "1", hasAdvance: true, customForm: false, minSum: 0, ruleMaxSum: 99999, rate: 0.08, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "2", guarType: "1", hasAdvance: false, customForm: false, minSum: 0, ruleMaxSum: 99999, rate: 0.08, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "2", guarType: "1", hasAdvance: true, customForm: true, minSum: 0, ruleMaxSum: 99999, rate: 0.07, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "2", guarType: "1", hasAdvance: false, customForm: true, minSum: 0, ruleMaxSum: 99999, rate: 0.07, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "2", guarType: "1", hasAdvance: true, customForm: false, minSum: 0, ruleMaxSum: 99999, rate: 0.07, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "2", guarType: "1", hasAdvance: false, customForm: false, minSum: 0, ruleMaxSum: 99999, rate: 0.07, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "2", guarType: "1", hasAdvance: true, customForm: true, minSum: 100000, ruleMaxSum: 499999, rate: 0.07, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "2", guarType: "1", hasAdvance: false, customForm: true, minSum: 100000, ruleMaxSum: 499999, rate: 0.07, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "2", guarType: "1", hasAdvance: true, customForm: false, minSum: 100000, ruleMaxSum: 499999, rate: 0.07, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "2", guarType: "1", hasAdvance: false, customForm: false, minSum: 100000, ruleMaxSum: 499999, rate: 0.07, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "2", guarType: "1", hasAdvance: true, customForm: true, minSum: 100000, ruleMaxSum: 499999, rate: 0.06, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "2", guarType: "1", hasAdvance: false, customForm: true, minSum: 100000, ruleMaxSum: 499999, rate: 0.06, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "2", guarType: "1", hasAdvance: true, customForm: false, minSum: 100000, ruleMaxSum: 499999, rate: 0.06, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "2", guarType: "1", hasAdvance: false, customForm: false, minSum: 100000, ruleMaxSum: 499999, rate: 0.06, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "2", guarType: "1", hasAdvance: true, customForm: true, minSum: 500000, ruleMaxSum: 999999, rate: 0.06, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "2", guarType: "1", hasAdvance: false, customForm: true, minSum: 500000, ruleMaxSum: 999999, rate: 0.06, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "2", guarType: "1", hasAdvance: true, customForm: false, minSum: 500000, ruleMaxSum: 999999, rate: 0.06, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "2", guarType: "1", hasAdvance: false, customForm: false, minSum: 500000, ruleMaxSum: 999999, rate: 0.06, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "2", guarType: "1", hasAdvance: true, customForm: true, minSum: 500000, ruleMaxSum: 999999, rate: 0.05, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "2", guarType: "1", hasAdvance: false, customForm: true, minSum: 500000, ruleMaxSum: 999999, rate: 0.05, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "2", guarType: "1", hasAdvance: true, customForm: false, minSum: 500000, ruleMaxSum: 999999, rate: 0.05, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "2", guarType: "1", hasAdvance: false, customForm: false, minSum: 500000, ruleMaxSum: 999999, rate: 0.05, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "2", guarType: "1", hasAdvance: true, customForm: true, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.042, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "2", guarType: "1", hasAdvance: false, customForm: true, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.042, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "2", guarType: "1", hasAdvance: true, customForm: false, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.042, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "2", guarType: "1", hasAdvance: false, customForm: false, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.042, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "2", guarType: "1", hasAdvance: true, customForm: true, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.04, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "2", guarType: "1", hasAdvance: false, customForm: true, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.04, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "2", guarType: "1", hasAdvance: true, customForm: false, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.04, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "2", guarType: "1", hasAdvance: false, customForm: false, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.04, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "2", guarType: "1", hasAdvance: true, customForm: true, minSum: 5000000, ruleMaxSum: 150000000, rate: 0.037, minCost: 990, ruleMinDays: 0, ruleMaxDays: 1930 },
{ procType: "2", guarType: "1", hasAdvance: false, customForm: true, minSum: 5000000, ruleMaxSum: 150000000, rate: 0.037, minCost: 990, ruleMinDays: 0, ruleMaxDays: 1930 },
{ procType: "2", guarType: "1", hasAdvance: true, customForm: false, minSum: 5000000, ruleMaxSum: 150000000, rate: 0.037, minCost: 990, ruleMinDays: 0, ruleMaxDays: 1930 },
{ procType: "2", guarType: "1", hasAdvance: false, customForm: false, minSum: 5000000, ruleMaxSum: 150000000, rate: 0.037, minCost: 990, ruleMinDays: 0, ruleMaxDays: 1930 },
{ procType: "4", guarType: "1", hasAdvance: true, customForm: true, minSum: 0, ruleMaxSum: 150000000, rate: 0.06, minCost: 990, ruleMinDays: 0, ruleMaxDays: 1930 },
{ procType: "4", guarType: "1", hasAdvance: false, customForm: true, minSum: 0, ruleMaxSum: 150000000, rate: 0.06, minCost: 990, ruleMinDays: 0, ruleMaxDays: 1930 },
{ procType: "4", guarType: "1", hasAdvance: true, customForm: false, minSum: 0, ruleMaxSum: 150000000, rate: 0.06, minCost: 990, ruleMinDays: 0, ruleMaxDays: 1930 },
{ procType: "4", guarType: "1", hasAdvance: false, customForm: false, minSum: 0, ruleMaxSum: 150000000, rate: 0.06, minCost: 990, ruleMinDays: 0, ruleMaxDays: 1930 },
{ procType: "2", guarType: "3", hasAdvance: true, customForm: true, minSum: 0, ruleMaxSum: 99999, rate: 0.08, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "2", guarType: "3", hasAdvance: false, customForm: true, minSum: 0, ruleMaxSum: 99999, rate: 0.08, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "2", guarType: "3", hasAdvance: true, customForm: false, minSum: 0, ruleMaxSum: 99999, rate: 0.08, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "2", guarType: "3", hasAdvance: false, customForm: false, minSum: 0, ruleMaxSum: 99999, rate: 0.08, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "2", guarType: "3", hasAdvance: true, customForm: true, minSum: 0, ruleMaxSum: 99999, rate: 0.07, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "2", guarType: "3", hasAdvance: false, customForm: true, minSum: 0, ruleMaxSum: 99999, rate: 0.07, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "2", guarType: "3", hasAdvance: true, customForm: false, minSum: 0, ruleMaxSum: 99999, rate: 0.07, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "2", guarType: "3", hasAdvance: false, customForm: false, minSum: 0, ruleMaxSum: 99999, rate: 0.07, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "2", guarType: "3", hasAdvance: true, customForm: true, minSum: 100000, ruleMaxSum: 499999, rate: 0.07, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "2", guarType: "3", hasAdvance: false, customForm: true, minSum: 100000, ruleMaxSum: 499999, rate: 0.07, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "2", guarType: "3", hasAdvance: true, customForm: false, minSum: 100000, ruleMaxSum: 499999, rate: 0.07, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "2", guarType: "3", hasAdvance: false, customForm: false, minSum: 100000, ruleMaxSum: 499999, rate: 0.07, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "2", guarType: "3", hasAdvance: true, customForm: true, minSum: 100000, ruleMaxSum: 499999, rate: 0.06, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "2", guarType: "3", hasAdvance: false, customForm: true, minSum: 100000, ruleMaxSum: 499999, rate: 0.06, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "2", guarType: "3", hasAdvance: true, customForm: false, minSum: 100000, ruleMaxSum: 499999, rate: 0.06, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "2", guarType: "3", hasAdvance: false, customForm: false, minSum: 100000, ruleMaxSum: 499999, rate: 0.06, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "2", guarType: "3", hasAdvance: true, customForm: true, minSum: 500000, ruleMaxSum: 999999, rate: 0.06, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "2", guarType: "3", hasAdvance: false, customForm: true, minSum: 500000, ruleMaxSum: 999999, rate: 0.06, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "2", guarType: "3", hasAdvance: true, customForm: false, minSum: 500000, ruleMaxSum: 999999, rate: 0.06, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "2", guarType: "3", hasAdvance: false, customForm: false, minSum: 500000, ruleMaxSum: 999999, rate: 0.06, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "2", guarType: "3", hasAdvance: true, customForm: true, minSum: 500000, ruleMaxSum: 999999, rate: 0.05, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "2", guarType: "3", hasAdvance: false, customForm: true, minSum: 500000, ruleMaxSum: 999999, rate: 0.05, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "2", guarType: "3", hasAdvance: true, customForm: false, minSum: 500000, ruleMaxSum: 999999, rate: 0.05, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "2", guarType: "3", hasAdvance: false, customForm: false, minSum: 500000, ruleMaxSum: 999999, rate: 0.05, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "2", guarType: "3", hasAdvance: true, customForm: true, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.042, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "2", guarType: "3", hasAdvance: false, customForm: true, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.042, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "2", guarType: "3", hasAdvance: true, customForm: false, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.042, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "2", guarType: "3", hasAdvance: false, customForm: false, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.042, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "2", guarType: "3", hasAdvance: true, customForm: true, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.04, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "2", guarType: "3", hasAdvance: false, customForm: true, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.04, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "2", guarType: "3", hasAdvance: true, customForm: false, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.04, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "2", guarType: "3", hasAdvance: false, customForm: false, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.04, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "2", guarType: "3", hasAdvance: true, customForm: true, minSum: 5000000, ruleMaxSum: 150000000, rate: 0.037, minCost: 990, ruleMinDays: 0, ruleMaxDays: 1930 },
{ procType: "2", guarType: "3", hasAdvance: false, customForm: true, minSum: 5000000, ruleMaxSum: 150000000, rate: 0.037, minCost: 990, ruleMinDays: 0, ruleMaxDays: 1930 },
{ procType: "2", guarType: "3", hasAdvance: true, customForm: false, minSum: 5000000, ruleMaxSum: 150000000, rate: 0.037, minCost: 990, ruleMinDays: 0, ruleMaxDays: 1930 },
{ procType: "2", guarType: "3", hasAdvance: false, customForm: false, minSum: 5000000, ruleMaxSum: 150000000, rate: 0.037, minCost: 990, ruleMinDays: 0, ruleMaxDays: 1930 },
{ procType: "4", guarType: "3", hasAdvance: true, customForm: true, minSum: 0, ruleMaxSum: 150000000, rate: 0.06, minCost: 990, ruleMinDays: 0, ruleMaxDays: 1930 },
{ procType: "4", guarType: "3", hasAdvance: false, customForm: true, minSum: 0, ruleMaxSum: 150000000, rate: 0.06, minCost: 990, ruleMinDays: 0, ruleMaxDays: 1930 },
{ procType: "4", guarType: "3", hasAdvance: true, customForm: false, minSum: 0, ruleMaxSum: 150000000, rate: 0.06, minCost: 990, ruleMinDays: 0, ruleMaxDays: 1930 },
{ procType: "4", guarType: "3", hasAdvance: false, customForm: false, minSum: 0, ruleMaxSum: 150000000, rate: 0.06, minCost: 990, ruleMinDays: 0, ruleMaxDays: 1930 },
        // На гарантийный период
{ procType: "1", guarType: "4", hasAdvance: true, customForm: true, minSum: 0, ruleMaxSum: 99999, rate: 0.08, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "1", guarType: "4", hasAdvance: false, customForm: true, minSum: 0, ruleMaxSum: 99999, rate: 0.08, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "1", guarType: "4", hasAdvance: true, customForm: false, minSum: 0, ruleMaxSum: 99999, rate: 0.08, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "1", guarType: "4", hasAdvance: false, customForm: false, minSum: 0, ruleMaxSum: 99999, rate: 0.08, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "1", guarType: "4", hasAdvance: true, customForm: true, minSum: 0, ruleMaxSum: 99999, rate: 0.07, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "1", guarType: "4", hasAdvance: false, customForm: true, minSum: 0, ruleMaxSum: 99999, rate: 0.07, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "1", guarType: "4", hasAdvance: true, customForm: false, minSum: 0, ruleMaxSum: 99999, rate: 0.07, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "1", guarType: "4", hasAdvance: false, customForm: false, minSum: 0, ruleMaxSum: 99999, rate: 0.07, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "1", guarType: "4", hasAdvance: true, customForm: true, minSum: 100000, ruleMaxSum: 499999, rate: 0.07, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "1", guarType: "4", hasAdvance: false, customForm: true, minSum: 100000, ruleMaxSum: 499999, rate: 0.07, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "1", guarType: "4", hasAdvance: true, customForm: false, minSum: 100000, ruleMaxSum: 499999, rate: 0.07, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "1", guarType: "4", hasAdvance: false, customForm: false, minSum: 100000, ruleMaxSum: 499999, rate: 0.07, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "1", guarType: "4", hasAdvance: true, customForm: true, minSum: 100000, ruleMaxSum: 499999, rate: 0.06, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "1", guarType: "4", hasAdvance: false, customForm: true, minSum: 100000, ruleMaxSum: 499999, rate: 0.06, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "1", guarType: "4", hasAdvance: true, customForm: false, minSum: 100000, ruleMaxSum: 499999, rate: 0.06, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "1", guarType: "4", hasAdvance: false, customForm: false, minSum: 100000, ruleMaxSum: 499999, rate: 0.06, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "1", guarType: "4", hasAdvance: true, customForm: true, minSum: 500000, ruleMaxSum: 999999, rate: 0.06, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "1", guarType: "4", hasAdvance: false, customForm: true, minSum: 500000, ruleMaxSum: 999999, rate: 0.06, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "1", guarType: "4", hasAdvance: true, customForm: false, minSum: 500000, ruleMaxSum: 999999, rate: 0.06, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "1", guarType: "4", hasAdvance: false, customForm: false, minSum: 500000, ruleMaxSum: 999999, rate: 0.06, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "1", guarType: "4", hasAdvance: true, customForm: true, minSum: 500000, ruleMaxSum: 999999, rate: 0.05, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "1", guarType: "4", hasAdvance: false, customForm: true, minSum: 500000, ruleMaxSum: 999999, rate: 0.05, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "1", guarType: "4", hasAdvance: true, customForm: false, minSum: 500000, ruleMaxSum: 999999, rate: 0.05, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "1", guarType: "4", hasAdvance: false, customForm: false, minSum: 500000, ruleMaxSum: 999999, rate: 0.05, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "1", guarType: "4", hasAdvance: true, customForm: true, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.042, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "1", guarType: "4", hasAdvance: false, customForm: true, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.042, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "1", guarType: "4", hasAdvance: true, customForm: false, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.042, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "1", guarType: "4", hasAdvance: false, customForm: false, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.042, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "1", guarType: "4", hasAdvance: true, customForm: true, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.04, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "1", guarType: "4", hasAdvance: false, customForm: true, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.04, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "1", guarType: "4", hasAdvance: true, customForm: false, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.04, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "1", guarType: "4", hasAdvance: false, customForm: false, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.04, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "1", guarType: "4", hasAdvance: true, customForm: true, minSum: 5000000, ruleMaxSum: 150000000, rate: 0.037, minCost: 990, ruleMinDays: 0, ruleMaxDays: 1930 },
{ procType: "1", guarType: "4", hasAdvance: false, customForm: true, minSum: 5000000, ruleMaxSum: 150000000, rate: 0.037, minCost: 990, ruleMinDays: 0, ruleMaxDays: 1930 },
{ procType: "1", guarType: "4", hasAdvance: true, customForm: false, minSum: 5000000, ruleMaxSum: 150000000, rate: 0.037, minCost: 990, ruleMinDays: 0, ruleMaxDays: 1930 },
{ procType: "1", guarType: "4", hasAdvance: false, customForm: false, minSum: 5000000, ruleMaxSum: 150000000, rate: 0.037, minCost: 990, ruleMinDays: 0, ruleMaxDays: 1930 },
{ procType: "2", guarType: "4", hasAdvance: true, customForm: true, minSum: 0, ruleMaxSum: 99999, rate: 0.08, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "2", guarType: "4", hasAdvance: false, customForm: true, minSum: 0, ruleMaxSum: 99999, rate: 0.08, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "2", guarType: "4", hasAdvance: true, customForm: false, minSum: 0, ruleMaxSum: 99999, rate: 0.08, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "2", guarType: "4", hasAdvance: false, customForm: false, minSum: 0, ruleMaxSum: 99999, rate: 0.08, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "2", guarType: "4", hasAdvance: true, customForm: true, minSum: 0, ruleMaxSum: 99999, rate: 0.07, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "2", guarType: "4", hasAdvance: false, customForm: true, minSum: 0, ruleMaxSum: 99999, rate: 0.07, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "2", guarType: "4", hasAdvance: true, customForm: false, minSum: 0, ruleMaxSum: 99999, rate: 0.07, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "2", guarType: "4", hasAdvance: false, customForm: false, minSum: 0, ruleMaxSum: 99999, rate: 0.07, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "2", guarType: "4", hasAdvance: true, customForm: true, minSum: 100000, ruleMaxSum: 499999, rate: 0.07, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "2", guarType: "4", hasAdvance: false, customForm: true, minSum: 100000, ruleMaxSum: 499999, rate: 0.07, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "2", guarType: "4", hasAdvance: true, customForm: false, minSum: 100000, ruleMaxSum: 499999, rate: 0.07, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "2", guarType: "4", hasAdvance: false, customForm: false, minSum: 100000, ruleMaxSum: 499999, rate: 0.07, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "2", guarType: "4", hasAdvance: true, customForm: true, minSum: 100000, ruleMaxSum: 499999, rate: 0.06, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "2", guarType: "4", hasAdvance: false, customForm: true, minSum: 100000, ruleMaxSum: 499999, rate: 0.06, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "2", guarType: "4", hasAdvance: true, customForm: false, minSum: 100000, ruleMaxSum: 499999, rate: 0.06, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "2", guarType: "4", hasAdvance: false, customForm: false, minSum: 100000, ruleMaxSum: 499999, rate: 0.06, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "2", guarType: "4", hasAdvance: true, customForm: true, minSum: 500000, ruleMaxSum: 999999, rate: 0.06, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "2", guarType: "4", hasAdvance: false, customForm: true, minSum: 500000, ruleMaxSum: 999999, rate: 0.06, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "2", guarType: "4", hasAdvance: true, customForm: false, minSum: 500000, ruleMaxSum: 999999, rate: 0.06, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "2", guarType: "4", hasAdvance: false, customForm: false, minSum: 500000, ruleMaxSum: 999999, rate: 0.06, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "2", guarType: "4", hasAdvance: true, customForm: true, minSum: 500000, ruleMaxSum: 999999, rate: 0.05, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "2", guarType: "4", hasAdvance: false, customForm: true, minSum: 500000, ruleMaxSum: 999999, rate: 0.05, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "2", guarType: "4", hasAdvance: true, customForm: false, minSum: 500000, ruleMaxSum: 999999, rate: 0.05, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "2", guarType: "4", hasAdvance: false, customForm: false, minSum: 500000, ruleMaxSum: 999999, rate: 0.05, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "2", guarType: "4", hasAdvance: true, customForm: true, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.042, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "2", guarType: "4", hasAdvance: false, customForm: true, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.042, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "2", guarType: "4", hasAdvance: true, customForm: false, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.042, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "2", guarType: "4", hasAdvance: false, customForm: false, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.042, minCost: 990, ruleMinDays: 0, ruleMaxDays: 179 },
{ procType: "2", guarType: "4", hasAdvance: true, customForm: true, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.04, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "2", guarType: "4", hasAdvance: false, customForm: true, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.04, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "2", guarType: "4", hasAdvance: true, customForm: false, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.04, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "2", guarType: "4", hasAdvance: false, customForm: false, minSum: 1000000, ruleMaxSum: 4999999, rate: 0.04, minCost: 990, ruleMinDays: 180, ruleMaxDays: 1930 },
{ procType: "2", guarType: "4", hasAdvance: true, customForm: true, minSum: 5000000, ruleMaxSum: 150000000, rate: 0.037, minCost: 990, ruleMinDays: 0, ruleMaxDays: 1930 },
{ procType: "2", guarType: "4", hasAdvance: false, customForm: true, minSum: 5000000, ruleMaxSum: 150000000, rate: 0.037, minCost: 990, ruleMinDays: 0, ruleMaxDays: 1930 },
{ procType: "2", guarType: "4", hasAdvance: true, customForm: false, minSum: 5000000, ruleMaxSum: 150000000, rate: 0.037, minCost: 990, ruleMinDays: 0, ruleMaxDays: 1930 },
{ procType: "2", guarType: "4", hasAdvance: false, customForm: false, minSum: 5000000, ruleMaxSum: 150000000, rate: 0.037, minCost: 990, ruleMinDays: 0, ruleMaxDays: 1930 },






,
        ]

    } 
  ];

  // ГЛАВНЫЙ КОД РАСЧЕТА • ГЛАВНЫЙ КОД РАСЧЕТА • ГЛАВНЫЙ КОД РАСЧЕТА • ГЛАВНЫЙ КОД РАСЧЕТА • ГЛАВНЫЙ КОД РАСЧЕТА • ГЛАВНЫЙ КОД РАСЧЕТА
  const results = banks.map(bank => {
    console.log("Проверяем банк:", bank.name);

    // Фильтруем условия банка, которые соответствуют заданным параметрам
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

    // Если подходящих условий нет, добавляем банк в стоп-факторы
    if (matchingConditions.length === 0) {
        console.error(`Не найдено подходящих условий для банка ${bank.name}`);
        return {
            name: bank.name,
            logo: bank.logo,
            cost: "Стоп-факторы",
            rate: "Нет подходящих условий",
            isStopFactor: true
        };
    }

    // Выбираем лучшее условие (например, с минимальной ставкой)
    const bestCondition = matchingConditions.reduce((best, current) => {
        return current.rate < best.rate ? current : best;
    });

    console.log("Выбранное условие:", bestCondition);

    // Расчёт стоимости
    const rate = bestCondition.rate;
    const calculatedCost = (sum * rate * days) / 365;
    const cost = Math.max(calculatedCost, bestCondition.minCost);

    return {
        name: bank.name,
        logo: bank.logo,
        data: bank.data,
        cost: parseFloat(cost.toFixed(2)),
        rate: `${(rate * 100).toFixed(2)}%`,
        isStopFactor: false
    };
});

  
// ГЛАВНЫЙ КОД РАСЧЕТА • ГЛАВНЫЙ КОД РАСЧЕТА • ГЛАВНЫЙ КОД РАСЧЕТА • ГЛАВНЫЙ КОД РАСЧЕТА • ГЛАВНЫЙ КОД РАСЧЕТА • ГЛАВНЫЙ КОД РАСЧЕТА
  
  
  
  
  
  
  


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

// Генерация результатов
const offerList = document.getElementById("offer-list");

offerList.innerHTML = finalResults
  .map((result, index) => 
    `<div class="offer" style="display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
        <div class="offer__logo" style="background-image: url('${result.logo}')"></div>
        <div class="offer__details" style="flex: 1;">
            <strong>${result.name}</strong>
        </div>
        <div class="offer__personal-data">
               ${
                result.data 
                ? result.data.split('\n').map(line => `<div>${line}</div>`).join('') 
                : ' '
              }
        </div>
        <div class="offer__separator"></div> <!-- Разделительная линия -->
        ${!result.isStopFactor ? `  
          <div class="offer__rate">
            Ставка: ${result.rate}%<br>
            ${result.cost.toLocaleString()} руб.
          </div>
        ` : `  
          <div class="offer__rate">
            Стоп-факторы:<br>${result.rate}
          </div>
        `}
        <div class="offer__buttons">
          ${!result.isStopFactor ? `  
            <button class="btn_primary offer__button" data-index="${index}">Оформить</button>
          ` : ''}
        </div>
    </div>`
  )
  .join("");

// Добавляем стили к блоку вывода результатов "offer" для мобильных устройств
// Функция для переключения стилей в зависимости от ширины экрана
function applyResponsiveStyles() {
  const isMobile = window.innerWidth <= 768;

  // Найти все элементы с классом offer
  const offers = document.querySelectorAll('.offer');
  
  offers.forEach(offer => {
    if (isMobile) {
      offer.style.flexDirection = 'column'; // Вертикальное выравнивание
      offer.style.justifyContent = 'center'; // Центровка по горизонтали
      offer.style.alignItems = 'center'; // Центровка по вертикали
      offer.style.gap = '16px'; // Отступы между элементами
    } else {
      offer.style.flexDirection = 'row'; // Горизонтальное выравнивание
      offer.style.justifyContent = 'space-between'; // Распределение пространства
      offer.style.alignItems = 'center'; // Выравнивание по вертикали
    }
  });
}

// Применить стили при загрузке страницы
window.addEventListener('load', applyResponsiveStyles);

// Применить стили при изменении размера окна
window.addEventListener('resize', applyResponsiveStyles);

// Конец кода стилей - - - - - - - - - - - - - - - - - - - - - - -  





// Показать блок результатов
document.getElementById("result-output").style.display = "block";

// Обработчик на родительский элемент
offerList.addEventListener("click", (event) => {
  if (event.target.classList.contains("offer__button")) {
      const button = event.target;
      const index = parseInt(button.dataset.index, 10); // Преобразуем индекс в число
      const selectedOffer = finalResults[index]; // Выбираем данные предложения

      if (selectedOffer) {
          // Сохраняем выбранное предложение в глобальном контексте для виртуальной страницы
          window.selectedOffer = selectedOffer;

          // Собираем параметры, введённые пользователем
          const sumField = document.getElementById("guarantee-sum").value;
          const daysField = document.getElementById("guarantee-days").value;
          const procType = document.getElementById("procedure-type").value;
          const guarType = document.getElementById("guarantee-type").value;
          const hasAdvance = document.getElementById("has-advance").checked;
          const customForm = document.getElementById("custom-form").checked;

          const selectedParams = {
              sum: parseFloat(sumField),
              days: parseInt(daysField, 10),
              procType,
              guarType,
              hasAdvance,
              customForm,
          };

          // Передать данные предложения и параметры в функцию создания виртуальной страницы
          openVirtualPage(selectedOffer, selectedParams);
      } else {
          console.error("Не удалось найти предложение с указанным индексом.");
      }
  }
});



});
// КНОПКА СБРОСА • КНОПКА СБРОСА • КНОПКА СБРОСА • КНОПКА СБРОСА • КНОПКА СБРОСА • КНОПКА СБРОСА • КНОПКА СБРОСА • КНОПКА СБРОСА • КНОПКА СБРОСА
// Скрываем кнопку сброса по умолчанию
document.getElementById("reset-btn").style.display = "none";

// Слушаем клик на кнопке "Рассчитать"
document.getElementById("calculate-btn").addEventListener("click", function () {
  // Показать кнопку сброса
  document.getElementById("reset-btn").style.display = "inline-block";

  // Здесь добавьте код расчета, если нужно
  // Пример: document.getElementById("result-output").style.display = "block";
  // document.getElementById("offer-list").innerHTML = "<div>Результаты расчета</div>";
});

// Слушаем клик на кнопке "Сбросить"
document.getElementById("reset-btn").addEventListener("click", function () {
  // Скрыть результаты и очистить список предложений
  document.getElementById("result-output").style.display = "none";
  document.getElementById("offer-list").innerHTML = "";

  // Скрыть кнопку сброса снова
  document.getElementById("reset-btn").style.display = "none";

  // Сброс значений формы к значениям по умолчанию
  const form = document.getElementById("guarantee-calculator");
  form.reset();

  // Установить дефолтные значения вручную, если они заданы через HTML (value, selected)
  document.getElementById("guarantee-sum").value = "1 000 000";
  document.getElementById("guarantee-days").value = "365";
  document.getElementById("procedure-type").value = "1"; // 44-ФЗ
  document.getElementById("guarantee-type").value = "2"; // На исполнение контракта

  // Убедитесь, что чекбоксы сняты
  document.getElementById("has-advance").checked = false;
  document.getElementById("custom-form").checked = false;
});

// КНОПКА СБРОСА • КНОПКА СБРОСА • КНОПКА СБРОСА • КНОПКА СБРОСА • КНОПКА СБРОСА • КНОПКА СБРОСА • КНОПКА СБРОСА • КНОПКА СБРОСА • КНОПКА СБРОСА

// Функция для управления состоянием guarType - ВОЗВРАТ АВАНСА ПРОПАДАЕТ ПРИ 44-ФЗ
function updateGuarTypeAvailability() {
  // Получаем элементы procType и guarType
  const procTypeElement = document.querySelector('#procedure-type'); // Исправил селектор на корректный id
  const guarTypeElement = document.querySelector('[name="guar-type"]'); // Привязан к name="guar-type"

  // Проверяем, существуют ли элементы
  if (!procTypeElement || !guarTypeElement) {
      console.error("Элементы procedure-type или guar-type не найдены.");
      return;
  }

  // Получаем текущее значение procType
  const procType = procTypeElement.value;

  // Если procType: "1", делаем guarType: "3" некликабельным
  const guarTypeOption = guarTypeElement.querySelector('option[value="3"]');
  if (guarTypeOption) {
      if (procType === "1") {
          // Делаем опцию некликабельной
          guarTypeOption.disabled = true;
          guarTypeOption.style.color = "gray"; // Меняем цвет текста
      } else {
          // Если procType не "1", возвращаем guarType: "3" в нормальное состояние
          guarTypeOption.disabled = false;
          guarTypeOption.style.color = ""; // Восстанавливаем цвет текста
      }
  }
}

// Добавляем обработчик события на изменение значения procType
document.getElementById('procedure-type').addEventListener('change', updateGuarTypeAvailability);

// Вызываем функцию один раз при загрузке страницы для первоначальной проверки
document.addEventListener('DOMContentLoaded', updateGuarTypeAvailability);

// Добавляем крутилку при загрузке
document.getElementById('calculate-btn').addEventListener('click', function () {
  const loadingSpinner = document.getElementById('loading-spinner');
  const resultOutput = document.getElementById('result-output');
  const offerList = document.getElementById('offer-list');

  // Скрываем результаты и показываем анимацию
  resultOutput.style.display = 'none';
  loadingSpinner.style.display = 'block';

  // Скроллим к блоку с крутилкой
  loadingSpinner.scrollIntoView({ behavior: 'smooth', block: 'center' });

  // Симулируем запрос (2 секунды)
  setTimeout(() => {
      // Скрываем анимацию загрузки и показываем результаты
      loadingSpinner.style.display = 'none';
      resultOutput.style.display = 'block';
      offerList.innerHTML = finalResults

      // Скроллим к блоку с результатами
      resultOutput.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 2000);
});
