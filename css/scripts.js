document.getElementById("calculate-btn").addEventListener("click", function () {
    const sumField = document.getElementById("guarantee-sum");
    const daysField = document.getElementById("guarantee-days");
    const procType = document.getElementById("procedure-type").value;
    const guarType = document.getElementById("guarantee-type").value;
    const hasAdvance = document.getElementById("has-advance").checked;
    const customForm = document.getElementById("custom-form").checked;
  
    const sum = parseFloat(sumField.value.replace(/\s+/g, "").replace(",", "."));
    const days = parseInt(daysField.value, 10);
  
    // Проверка на корректность введенных данных
    if (!sum || isNaN(sum) || !days || isNaN(days)) {
      alert("Пожалуйста, заполните все поля корректно.");
      return;
    }
  
    const alfaBankConditions = [
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
        { procType: "4", guarType: "4", hasAdvance: false, customForm: false, rate: 0.04 }
    ];
  
    const condition = alfaBankConditions.find(c => 
      c.procType === procType &&
      c.guarType === guarType &&
      c.hasAdvance === hasAdvance &&
      c.customForm === customForm
    );
  
    if (!condition) {
      alert("Условия для выбранных параметров не найдены.");
      return;
    }
  
    const rate = condition.rate;
    const cost = Math.max((sum * rate * days) / 365, 1000).toFixed(2);
  
    const resultOutput = document.getElementById("result-output");
    const offerList = document.getElementById("offer-list");
  
    offerList.innerHTML = `
      <div class="offer">
        <div>
          <strong>ПАО Альфа-Банк</strong><br>
          Ставка: ${(rate * 100).toFixed(1)}%
        </div>
        <div>
          ${cost.replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ₽
        </div>
      </div>
    `;
  
    resultOutput.style.display = "block";
});

// Получаем элементы
const resetButton = document.getElementById('reset-btn');
const resultOutput = document.getElementById('result-output');

// Добавляем событие сброса
resetButton.addEventListener('click', function () {
    // Скрываем блок с результатами
    resultOutput.style.display = 'none';

    // Если нужно, сбрасываем содержимое результата
    const resultSummary = document.getElementById('result-summary');
    const offerList = document.getElementById('offer-list');
    if (resultSummary) resultSummary.innerHTML = '';
    if (offerList) offerList.innerHTML = '';
});
