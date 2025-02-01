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

// Функция сокрытия чекбокса наличия аванса
document.getElementById("guarantee-type").addEventListener("change", function () {
  const guaranteeType = this.value;
  const advanceCheckbox = document.getElementById("has-advance");

  if (guaranteeType === "1" || guaranteeType === "3" || guaranteeType === "4") {
    advanceCheckbox.parentElement.style.display = "none";
  } else {
    advanceCheckbox.parentElement.style.display = "block";
  }
});

// Функция сокрытия опции возврата аванса
function updateGuarTypeAvailability() {
  // Получаем элементы procType и guarType
  const procTypeElement = document.getElementById('procedure-type'); // Поле с типом процедуры
  const guarTypeElement = document.querySelector('[name="guar-type"]'); // Поле с типом гарантии

  // Проверяем, существуют ли элементы
  if (!procTypeElement || !guarTypeElement) {
    console.error("Элементы 'procedure-type' или 'guar-type' не найдены в DOM.");
    return;
  }

  // Получаем текущее значение procType
  const procType = procTypeElement.value;

  // Получаем опцию guarType с value="3"
  const guarTypeOption = guarTypeElement.querySelector('option[value="3"]');
  if (!guarTypeOption) {
    console.error("Опция с value='3' в элементе 'guar-type' не найдена.");
    return;
  }

  // Проверяем значение procType и скрываем/отключаем опцию guarType
  if (procType === "1") {
    guarTypeOption.disabled = true; // Делаем опцию некликабельной
    guarTypeOption.style.color = "gray"; // Меняем цвет текста для визуального эффекта
  } else {
    guarTypeOption.disabled = false; // Возвращаем опцию в активное состояние
    guarTypeOption.style.color = ""; // Убираем стилизацию
  }
}

// Привязка функции к событиям
document.getElementById("procedure-type").addEventListener("change", updateGuarTypeAvailability); // Обновляем при изменении
window.addEventListener("DOMContentLoaded", updateGuarTypeAvailability); // Применяем на начальной загрузке


// Функция расчёта предложений на основе параметров
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
    let cost = calculatedCost;

    // Если расчетная стоимость меньше минимальной стоимости, применяем минимальную стоимость
    let rateDisplay = `${(rate * 100).toFixed(2)}`; // Ставка по умолчанию в процентах
    if (calculatedCost < bestCondition.minCost) {
      cost = bestCondition.minCost; // Устанавливаем минимальную стоимость
      rateDisplay = "min "; // Ставка заменяется на "min"
    }

    return {
      name: bank.name,
      logo: bank.logo,
      data: bank.data,
      rating: bank.rating || 0, // Добавляем rating
      cost: parseFloat(cost.toFixed(2)), // Округляем до двух знаков
      rate: rateDisplay, // Отображаем либо "min", либо процент
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
  console.log('Results after calculation:', results); // Проверка результатов после расчета
  const sortedResults = sortOffers(results); // Сортировка оферов
  displayResults(results); // Отображаем результаты
});

// Функция отображения результатов
// Функция отображения результатов с метками
function displayResults(results) {
  const offerList = document.getElementById("offer-list");
  const resultOutput = document.getElementById("result-output");
  const resultCount = document.getElementById("result-count");

  if (!offerList || !resultOutput || !resultCount) {
    console.error("Элементы для отображения результатов не найдены.");
    return;
  }

  const validOffers = results.filter(result => !result.isStopFactor);
  resultCount.textContent = `Найдено ${validOffers.length} предложений`;

  const bestOffer = validOffers.length ? validOffers[0] : null;

  offerList.innerHTML = results
    .map((result, index) => {
      const isBestOffer = bestOffer && result === bestOffer;
      const isFastBank = result.rating === 1;
      
      let labels = "";
      if (isBestOffer) labels += '<span class="label best-offer">Самый выгодный</span>';
      if (isFastBank) labels += '<span class="label fast-bank">Быстро и удобно</span>';
      
      return `
        <div class="offer">
          <div class="offer__logo" style="background-image: url('${result.logo}');"></div>
          <div class="offer__details">
            <strong>${result.name}</strong>
            <div class="offer__labels">${labels}</div>
          </div>
          <div class="offer__rate">
            <div>${result.cost.toLocaleString()} руб.</div>
            <div>${result.rate}% годовых</div>
          </div>
          <button class="offer__button" data-index="${index}">Оформить</button>
        </div>`;
    })
    .join("");



  // Добавляем текст отказа от ответственности внизу блока offer-list
  const disclaimerText = `
    <div style="font-size: 12px; font-weight: 300; color: #555; text-align: left; padding: 10px 20px;">
      Данный расчет является предварительным и не является публичной офертой. Все приведенные данные носят информационный характер и могут отличаться от окончательных условий. Для получения точной информации и консультации, пожалуйста, позвоните нам или напишите на нашу почту info@delta-garant.ru. Администрация сайта не несет ответственности за возможные неточности в расчетах.
    </div>
  `;

  offerList.insertAdjacentHTML('beforeend', disclaimerText);
}

// Функция сортировки оферов
function sortOffers(offers) {
  return offers.sort((a, b) => {
    if (a.isStopFactor && !b.isStopFactor) {
      return 1; // Переместить офер со стоп-фактором вниз
    }
    if (!a.isStopFactor && b.isStopFactor) {
      return -1; // Переместить офер без стоп-фактора вверх
    }
    if (a.isStopFactor && b.isStopFactor) {
      return 0; // Два стоп-фактора остаются на месте
    }
    return a.cost - b.cost; // Сравнение по стоимости
  });
}
