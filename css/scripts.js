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
        { procType: "2", guarType: "3", hasAdvance: false, customForm: true, minSum: 0, maxSum: 99999, rate: 0.05 },
        { procType: "2", guarType: "3", hasAdvance: false, customForm: false, minSum: 0, maxSum: 99999, rate: 0.05 },
        { procType: "2", guarType: "3", hasAdvance: false, customForm: true, minSum: 100000, maxSum: 499999, rate: 0.045 },
        { procType: "2", guarType: "3", hasAdvance: false, customForm: false, minSum: 100000, maxSum: 499999, rate: 0.045 },
        { procType: "2", guarType: "3", hasAdvance: false, customForm: true, minSum: 500000, maxSum: 999999, rate: 0.035 },
        { procType: "2", guarType: "3", hasAdvance: false, customForm: false, minSum: 500000, maxSum: 999999, rate: 0.035 },
        { procType: "2", guarType: "3", hasAdvance: false, customForm: true, minSum: 1000000, maxSum: 4999999, rate: 0.032 },
        { procType: "2", guarType: "3", hasAdvance: false, customForm: false, minSum: 1000000, maxSum: 4999999, rate: 0.032 },
        { procType: "2", guarType: "3", hasAdvance: false, customForm: true, minSum: 5000000, maxSum: 10000000, rate: 0.03 },
        { procType: "2", guarType: "3", hasAdvance: false, customForm: false, minSum: 5000000, maxSum: 10000000, rate: 0.03 },
        { procType: "3", guarType: "3", hasAdvance: false, customForm: true, minSum: 0, maxSum: 99999, rate: 0.05 },
        { procType: "3", guarType: "3", hasAdvance: false, customForm: false, minSum: 0, maxSum: 99999, rate: 0.05 },
        { procType: "3", guarType: "3", hasAdvance: false, customForm: true, minSum: 100000, maxSum: 499999, rate: 0.045 },
        { procType: "3", guarType: "3", hasAdvance: false, customForm: false, minSum: 100000, maxSum: 499999, rate: 0.045 },
        { procType: "3", guarType: "3", hasAdvance: false, customForm: true, minSum: 500000, maxSum: 999999, rate: 0.035 },
        { procType: "3", guarType: "3", hasAdvance: false, customForm: false, minSum: 500000, maxSum: 999999, rate: 0.035 },
        { procType: "3", guarType: "3", hasAdvance: false, customForm: true, minSum: 1000000, maxSum: 4999999, rate: 0.032 },
        { procType: "3", guarType: "3", hasAdvance: false, customForm: false, minSum: 1000000, maxSum: 4999999, rate: 0.032 },
        { procType: "3", guarType: "3", hasAdvance: false, customForm: true, minSum: 5000000, maxSum: 10000000, rate: 0.03 },
        { procType: "3", guarType: "3", hasAdvance: false, customForm: false, minSum: 5000000, maxSum: 10000000, rate: 0.03 },
        { procType: "4", guarType: "3", hasAdvance: false, customForm: true, minSum: 0, maxSum: 999999, rate: 0.05 },
        { procType: "4", guarType: "3", hasAdvance: false, customForm: false, minSum: 0, maxSum: 999999, rate: 0.05 },
        { procType: "4", guarType: "3", hasAdvance: false, customForm: true, minSum: 1000000, maxSum: 4999999, rate: 0.04 },
        { procType: "4", guarType: "3", hasAdvance: false, customForm: false, minSum: 1000000, maxSum: 4999999, rate: 0.04 },
        { procType: "4", guarType: "3", hasAdvance: false, customForm: true, minSum: 5000000, maxSum: 10000000, rate: 0.039 },
        { procType: "4", guarType: "3", hasAdvance: false, customForm: false, minSum: 5000000, maxSum: 10000000, rate: 0.039 },
        // На гарантийный период
        { procType: "1", guarType: "4", hasAdvance: false, customForm: true, minSum: 0, maxSum: 99999, rate: 0.05 },
        { procType: "1", guarType: "4", hasAdvance: false, customForm: false, minSum: 0, maxSum: 99999, rate: 0.05 },
        { procType: "1", guarType: "4", hasAdvance: false, customForm: true, minSum: 100000, maxSum: 499999, rate: 0.045 },
        { procType: "1", guarType: "4", hasAdvance: false, customForm: false, minSum: 100000, maxSum: 499999, rate: 0.045 },
        { procType: "1", guarType: "4", hasAdvance: false, customForm: true, minSum: 500000, maxSum: 999999, rate: 0.035 },
        { procType: "1", guarType: "4", hasAdvance: false, customForm: false, minSum: 500000, maxSum: 999999, rate: 0.035 },
        { procType: "1", guarType: "4", hasAdvance: false, customForm: true, minSum: 1000000, maxSum: 4999999, rate: 0.032 },
        { procType: "1", guarType: "4", hasAdvance: false, customForm: false, minSum: 1000000, maxSum: 4999999, rate: 0.032 },
        { procType: "1", guarType: "4", hasAdvance: false, customForm: true, minSum: 5000000, maxSum: 29999999, rate: 0.03 },
        { procType: "1", guarType: "4", hasAdvance: false, customForm: false, minSum: 5000000, maxSum: 29999999, rate: 0.03 },
        { procType: "1", guarType: "4", hasAdvance: false, customForm: true, minSum: 30000000, maxSum: 200000000, rate: 0.028 },
        { procType: "1", guarType: "4", hasAdvance: false, customForm: false, minSum: 30000000, maxSum: 200000000, rate: 0.028 },
        { procType: "2", guarType: "4", hasAdvance: false, customForm: true, minSum: 0, maxSum: 99999, rate: 0.05 },
        { procType: "2", guarType: "4", hasAdvance: false, customForm: false, minSum: 0, maxSum: 99999, rate: 0.05 },
        { procType: "2", guarType: "4", hasAdvance: false, customForm: true, minSum: 100000, maxSum: 499999, rate: 0.045 },
        { procType: "2", guarType: "4", hasAdvance: false, customForm: false, minSum: 100000, maxSum: 499999, rate: 0.045 },
        { procType: "2", guarType: "4", hasAdvance: false, customForm: true, minSum: 500000, maxSum: 999999, rate: 0.035 },
        { procType: "2", guarType: "4", hasAdvance: false, customForm: false, minSum: 500000, maxSum: 999999, rate: 0.035 },
        { procType: "2", guarType: "4", hasAdvance: false, customForm: true, minSum: 1000000, maxSum: 4999999, rate: 0.032 },
        { procType: "2", guarType: "4", hasAdvance: false, customForm: false, minSum: 1000000, maxSum: 4999999, rate: 0.032 },
        { procType: "2", guarType: "4", hasAdvance: false, customForm: true, minSum: 5000000, maxSum: 29999999, rate: 0.03 },
        { procType: "2", guarType: "4", hasAdvance: false, customForm: false, minSum: 5000000, maxSum: 29999999, rate: 0.03 },
        { procType: "2", guarType: "4", hasAdvance: false, customForm: true, minSum: 30000000, maxSum: 200000000, rate: 0.028 },
        { procType: "2", guarType: "4", hasAdvance: false, customForm: false, minSum: 30000000, maxSum: 200000000, rate: 0.028 },
        { procType: "3", guarType: "4", hasAdvance: false, customForm: true, minSum: 0, maxSum: 99999, rate: 0.05 },
        { procType: "3", guarType: "4", hasAdvance: false, customForm: false, minSum: 0, maxSum: 99999, rate: 0.05 },
        { procType: "3", guarType: "4", hasAdvance: false, customForm: true, minSum: 100000, maxSum: 499999, rate: 0.045 },
        { procType: "3", guarType: "4", hasAdvance: false, customForm: false, minSum: 100000, maxSum: 499999, rate: 0.045 },
        { procType: "3", guarType: "4", hasAdvance: false, customForm: true, minSum: 500000, maxSum: 999999, rate: 0.035 },
        { procType: "3", guarType: "4", hasAdvance: false, customForm: false, minSum: 500000, maxSum: 999999, rate: 0.035 },
        { procType: "3", guarType: "4", hasAdvance: false, customForm: true, minSum: 1000000, maxSum: 4999999, rate: 0.032 },
        { procType: "3", guarType: "4", hasAdvance: false, customForm: false, minSum: 1000000, maxSum: 4999999, rate: 0.032 },
        { procType: "3", guarType: "4", hasAdvance: false, customForm: true, minSum: 5000000, maxSum: 10000000, rate: 0.03 },
        { procType: "3", guarType: "4", hasAdvance: false, customForm: false, minSum: 5000000, maxSum: 10000000, rate: 0.03 },
        { procType: "4", guarType: "4", hasAdvance: false, customForm: true, minSum: 0, maxSum: 999999, rate: 0.05 },
        { procType: "4", guarType: "4", hasAdvance: false, customForm: false, minSum: 0, maxSum: 999999, rate: 0.05 },
        { procType: "4", guarType: "4", hasAdvance: false, customForm: true, minSum: 1000000, maxSum: 4999999, rate: 0.04 },
        { procType: "4", guarType: "4", hasAdvance: false, customForm: false, minSum: 1000000, maxSum: 4999999, rate: 0.04 },
        { procType: "4", guarType: "4", hasAdvance: false, customForm: true, minSum: 5000000, maxSum: 50000000, rate: 0.039 },
        { procType: "4", guarType: "4", hasAdvance: false, customForm: false, minSum: 5000000, maxSum: 50000000, rate: 0.039 },
      ]
    }
  ];

  const results = banks.map(bank => {
    // Ищем подходящие условия для банка
    // Проверяем специальное условие для Промсвязьбанка
    let adjustedMaxDays = bank.maxDays; // По умолчанию используем базовый maxDays
    
    if (bank.name === "ПАО Промсвязьбанк" && guarType === "4") {
        adjustedMaxDays = 1860; // Для гарантийного периода используем 1860 дней
    }

    // Проверяем, если срок превышает скорректированный adjustedMaxDays
    if (days > adjustedMaxDays) {
        return {
            name: bank.name,
            logo: bank.logo,
            cost: 'Стоп-факторы',
            rate: `Превышен максимальный срок гарантии - ${adjustedMaxDays} дней.`,
            isStopFactor: true // Помечаем как стоп-фактор
        };
    }

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
      "3": " 615-ПП/185-ФЗ",
      "4": "Коммерческий тендер"
    };
  
    // Проверяем maxSum независимо от того, найдено условие или нет
    if (sum > bank.maxSum) {
        const stopMessage = `Превышена максимальная сумма гарантии - ${bank.maxSum.toLocaleString()} руб.`;
        return {
            name: bank.name,
            logo: bank.logo,
            cost: 'Стоп-факторы',
            rate: stopMessage,
            isStopFactor: true // Помечаем как стоп-фактор
        };
    }
  
    // Если подходящее условие не найдено
    if (!condition) {
      const procedureName = procedureNames[procType] || `Процедура №${procType}`;
      const stopMessage = `По выбранным парматерам выпуск БГ невозможен с данным типом процедуры - ${procedureName}`;
      return {
        name: bank.name,
        logo: bank.logo,
        cost: 'Стоп-факторы',
        rate: stopMessage,
        isStopFactor: true // помечаем как стоп-фактор
      };
    }
  
    // Если все проверки пройдены, рассчитываем ставку и стоимость
    let rate = condition.rate;
    let cost = Math.max((sum * rate * days) / 365, 1000);
  
    // Лог для проверки данных
    console.log(`Банк: ${bank.name}, Тип процедуры: ${procType}, Расчетная стоимость: ${cost}`);
  
    // Специальное условие для Промсвязьбанка при procType: "4"
    if (bank.name === "ПАО Промсвязьбанк" && procType === "4" && cost < 5000) {
      cost = 5000; // Устанавливаем минимальную стоимость - 5000 руб.
      rate = "min "; // Указываем "min %" вместо расчетной ставки
    }
    
  
    return {
      name: bank.name,
      logo: bank.logo,
      cost: parseFloat(cost.toFixed(2)),
      rate: typeof rate === "string" ? rate : (rate * 100).toFixed(1), // Если строка, оставляем как есть
      isStopFactor: false
    };
  });
  // ВОТ ДО СЮДА ПОМЕЩЕАЕТСЯ В ОКНО
  


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
  .map(result => 
    `<div class="offer">
        <div class="offer__logo" style="background-image: url('${result.logo}')"></div>
        <div class="offer__details">
            <strong>${result.name}</strong>
        </div>
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
        ${!result.isStopFactor ? '<button class="btn_primary offer__button" id="submit-btn">Оформить</button>' : ''}
    </div>`
  )
  .join("");


document.getElementById("result-output").style.display = "block";
});

document.getElementById("reset-btn").addEventListener("click", function () {
  document.getElementById("result-output").style.display = "none";
  document.getElementById("offer-list").innerHTML = "";
});

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

