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
      data: 'Преимущество 1\nПреимущество 2\nПреимущество 3',
      conditions: [
        { procType: "1", guarType: "2", hasAdvance: true, customForm: true, minSum: 0, maxSum: 150000000, rate: 0.03 },
        { procType: "1", guarType: "2", hasAdvance: false, customForm: true, minSum: 0, maxSum: 150000000, rate: 0.03 },
        { procType: "1", guarType: "2", hasAdvance: true, customForm: false, minSum: 0, maxSum: 150000000, rate: 0.03 },
        { procType: "1", guarType: "2", hasAdvance: false, customForm: false, minSum: 0, maxSum: 150000000, rate: 0.03 },
        { procType: "2", guarType: "2", hasAdvance: true, customForm: true, minSum: 0, maxSum: 150000000, rate: 0.034 },
        { procType: "2", guarType: "2", hasAdvance: false, customForm: true, minSum: 0, maxSum: 150000000, rate: 0.034 },
        { procType: "2", guarType: "2", hasAdvance: true, customForm: false, minSum: 0, maxSum: 150000000, rate: 0.034 },
        { procType: "2", guarType: "2", hasAdvance: false, customForm: false, minSum: 0, maxSum: 150000000, rate: 0.034 },
        { procType: "3", guarType: "2", hasAdvance: true, customForm: true, minSum: 0, maxSum: 150000000, rate: 0.034 },
        { procType: "3", guarType: "2", hasAdvance: false, customForm: true, minSum: 0, maxSum: 150000000, rate: 0.034 },
        { procType: "3", guarType: "2", hasAdvance: true, customForm: false, minSum: 0, maxSum: 150000000, rate: 0.034 },
        { procType: "3", guarType: "2", hasAdvance: false, customForm: false, minSum: 0, maxSum: 150000000, rate: 0.034 },
        { procType: "4", guarType: "2", hasAdvance: true, customForm: true, minSum: 0, maxSum: 150000000, rate: 0.04 },
        { procType: "4", guarType: "2", hasAdvance: false, customForm: true, minSum: 0, maxSum: 150000000, rate: 0.04 },
        { procType: "4", guarType: "2", hasAdvance: true, customForm: false, minSum: 0, maxSum: 150000000, rate: 0.04 },
        { procType: "4", guarType: "2", hasAdvance: false, customForm: false, minSum: 0, maxSum: 150000000, rate: 0.04 },
        { procType: "1", guarType: "1", hasAdvance: false, customForm: true, minSum: 0, maxSum: 150000000, rate: 0.032 },
        { procType: "1", guarType: "1", hasAdvance: false, customForm: false, minSum: 0, maxSum: 150000000, rate: 0.032 },
        { procType: "2", guarType: "1", hasAdvance: false, customForm: true, minSum: 0, maxSum: 150000000, rate: 0.035 },
        { procType: "2", guarType: "1", hasAdvance: false, customForm: false, minSum: 0, maxSum: 150000000, rate: 0.035 },
        { procType: "3", guarType: "1", hasAdvance: false, customForm: true, minSum: 0, maxSum: 150000000, rate: 0.035 },
        { procType: "3", guarType: "1", hasAdvance: false, customForm: false, minSum: 0, maxSum: 150000000, rate: 0.035 },
        { procType: "4", guarType: "1", hasAdvance: false, customForm: true, minSum: 0, maxSum: 150000000, rate: 0.04 },
        { procType: "4", guarType: "1", hasAdvance: false, customForm: false, minSum: 0, maxSum: 150000000, rate: 0.04 },
        { procType: "1", guarType: "3", hasAdvance: false, customForm: true, minSum: 0, maxSum: 150000000, rate: 0.03 },
        { procType: "1", guarType: "3", hasAdvance: false, customForm: false, minSum: 0, maxSum: 150000000, rate: 0.03 },
        { procType: "2", guarType: "3", hasAdvance: false, customForm: true, minSum: 0, maxSum: 150000000, rate: 0.034 },
        { procType: "2", guarType: "3", hasAdvance: false, customForm: false, minSum: 0, maxSum: 150000000, rate: 0.034 },
        { procType: "3", guarType: "3", hasAdvance: false, customForm: true, minSum: 0, maxSum: 150000000, rate: 0.034 },
        { procType: "3", guarType: "3", hasAdvance: false, customForm: false, minSum: 0, maxSum: 150000000, rate: 0.034 },
        { procType: "4", guarType: "3", hasAdvance: false, customForm: true, minSum: 0, maxSum: 150000000, rate: 0.04 },
        { procType: "4", guarType: "3", hasAdvance: false, customForm: false, minSum: 0, maxSum: 150000000, rate: 0.04 },
        { procType: "1", guarType: "4", hasAdvance: false, customForm: true, minSum: 0, maxSum: 150000000, rate: 0.03 },
        { procType: "1", guarType: "4", hasAdvance: false, customForm: false, minSum: 0, maxSum: 150000000, rate: 0.03 },
        { procType: "2", guarType: "4", hasAdvance: false, customForm: true, minSum: 0, maxSum: 150000000, rate: 0.034 },
        { procType: "2", guarType: "4", hasAdvance: false, customForm: false, minSum: 0, maxSum: 150000000, rate: 0.034 },
        { procType: "3", guarType: "4", hasAdvance: false, customForm: true, minSum: 0, maxSum: 150000000, rate: 0.034 },
        { procType: "3", guarType: "4", hasAdvance: false, customForm: false, minSum: 0, maxSum: 150000000, rate: 0.034 },
        { procType: "4", guarType: "4", hasAdvance: false, customForm: true, minSum: 0, maxSum: 150000000, rate: 0.04 },
        { procType: "4", guarType: "4", hasAdvance: false, customForm: false, minSum: 0, maxSum: 150000000, rate: 0.04 },
      ]
    },
    {
      name: "ПАО Промсвязьбанк",
      logo: "/delta-garant/images/banks-logo/psb.svg",
      data: 'Преимущество 1\nПреимущество 2\nПреимущество 3',
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
      data: 'Преимущество 1\nПреимущество 2\nПреимущество 3',
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
    }  
  ];

  // ГЛАВНЫЙ КОД РАСЧЕТА • ГЛАВНЫЙ КОД РАСЧЕТА • ГЛАВНЫЙ КОД РАСЧЕТА • ГЛАВНЫЙ КОД РАСЧЕТА • ГЛАВНЫЙ КОД РАСЧЕТА • ГЛАВНЫЙ КОД РАСЧЕТА
  const results = banks.map(bank => {
    console.log("Проверяем банк:", bank.name);
    console.log("Параметры для поиска условия:", { procType, guarType, hasAdvance, customForm, sum });
  
    // Проверяем, превышает ли срок общий максимум для банка
    if (days > bank.maxDays) {
      return {
        name: bank.name,
        logo: bank.logo,
        cost: "Стоп-факторы",
        rate: `Превышен максимальный срок гарантии - ${bank.maxDays} дней.`,
        isStopFactor: true
      };
    }
  
    // Находим подходящее условие, учитывая диапазоны `minSum` и `ruleMaxSum`
    const condition = bank.conditions.find(c =>
      c.procType === procType &&
      c.guarType === guarType &&
      c.hasAdvance === hasAdvance &&
      c.customForm === customForm &&
      sum >= (c.minSum || 0) && sum <= (c.ruleMaxSum || Infinity)
    );
  
    if (!condition) {
      console.error("Не найдено подходящее условие. Проверьте параметры фильтрации.");
      return {
        name: bank.name,
        logo: bank.logo,
        cost: "Стоп-факторы",
        rate: "Не найдено подходящее условие",
        isStopFactor: true
      };
    }
  
    console.log("Найденное условие:", condition);
  
    // Проверяем, превышает ли срок максимум по условию
    if (days > condition.ruleMaxDays) {
      return {
        name: bank.name,
        logo: bank.logo,
        cost: "Стоп-факторы",
        rate: `Превышен максимальный срок гарантии - ${condition.ruleMaxDays} дней.`,
        isStopFactor: true
      };
    }
  
    // Расчет стоимости
    let rate = condition.rate;
    let calculatedCost = (sum * rate * days) / 365;
    let cost;
  
    // Проверяем, была ли использована минимальная стоимость
    if (calculatedCost < condition.minCost) {
      cost = condition.minCost;
      rate = "Min"; // Меняем ставку на "Min", если сработал minCost
    } else {
      cost = calculatedCost;
    }
  
    return {
      name: bank.name,
      logo: bank.logo,
      data: bank.data,
      cost: parseFloat(cost.toFixed(2)),
      rate: typeof rate === "string" ? rate : (rate * 100).toFixed(1),
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
    `<div class="offer">
        <div class="offer__logo" style="background-image: url('${result.logo}')"></div>
        <div class="offer__details">
            <strong>${result.name}</strong>
        </div>
        <div class="offer__personal-data" style="margin-top: 20px; color: #E2E8F0; font-weight: normal; text-align: left; display: flex; flex-direction: column; justify-content: center; align-items: flex-start;">
               ${
                result.data 
                ? result.data.split('\n').map(line => `<div>${line}</div>`).join('')
                : '<div>Данные отсутствуют</div>'
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
  document.getElementById("result-output").style.display = "none";
  document.getElementById("offer-list").innerHTML = "";
  
  // Скрыть кнопку сброса снова
  document.getElementById("reset-btn").style.display = "none";
});

// document.getElementById("reset-btn").addEventListener("click", function () {
 //  document.getElementById("result-output").style.display = "none";
 //  document.getElementById("offer-list").innerHTML = "";
// });

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
