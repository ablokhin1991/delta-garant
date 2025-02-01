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
function displayResults(results) {
  const offerList = document.getElementById("offer-list");
  const resultOutput = document.getElementById("result-output");
  const resultCount = document.getElementById("result-count"); // Получаем элемент для отображения количества

  if (!offerList || !resultOutput || !resultCount) {
    console.error("Элементы для отображения результатов не найдены.");
    return;
  }

  // Отображаем количество найденных предложений
  const validOffersCount = results.filter(result => !result.isStopFactor).length; // Считаем только валидные предложения
  resultCount.textContent = `Найдено ${validOffersCount} предложений`;

  // Остальная часть функции остается без изменений
  offerList.innerHTML = results
    .map((result, index) => {
      const rating = Number(result.rating) || 0;
      return `
        <div class="offer" style="display: flex; flex-direction: row; align-items: center; justify-content: space-between; padding: 10px; border-bottom: 1px solid #ddd;">
          <div class="offer__logo" style="width: 50px; height: 50px; background-image: url('${result.logo}'); background-size: cover; background-position: center; margin-left: 20px;"></div>
          <div class="offer__details" style="flex: 1; padding: 0 15px;">
            <strong>${result.name}</strong>
            ${
              result.data 
                ? `<div class="offer__personal-data" style="font-size: 12px; font-weight: 300; color: #555;">
                    ${result.data.split('\n').map(line => `<div>${line}</div>`).join('')}
                    <div style="margin-top: 0px;">
                      <span>Сложность оформления:</span>
                      <div class="offer__rating" style="display: flex; gap: 5px; margin-top: 5px;">
                        ${Array(5).fill(0).map((_, i) => 
                          `<div style="width: 10px; height: 10px; border-radius: 50%; background-color: ${i < rating ? '#9c9c9c' : '#e3e3e3'};"></div>`
                        ).join('')}
                      </div>
                    </div>
                  </div>` 
                : ''
            }
          </div>
          <div class="offer__separator" style="flex-shrink: 0; width: 1px; height: 50px; background: #ddd; margin: 0 15px; ${result.isStopFactor ? 'display: none;' : ''}"></div>
          ${
            !result.isStopFactor
              ?  
                `<div class="offer__rate" style="text-align: right;">
                  <div style="font-size: 16px; font-weight: bold;">${result.cost.toLocaleString()} руб.</div>
                  <div style="font-size: 12px; font-weight: 300; color: #555;">${result.rate}% годовых</div>
                </div>
                <div class="offer__buttons" style="margin-left: 15px; margin-right: 20px;">
                  <button class="offer__button" data-index="${index}" style="padding: 5px 10px;">
                    Оформить
                  </button>
                </div>`
              :  
                `<div class="offer__rate" style="font-size: 14px; font-weight: 300; text-align: right; color: #555; margin-right: 20px;">
                  Стоп-факторы: <br>${result.rate}
                </div>`
          }
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

// Новый скрипт для добавления шевронов без изменения основного кода
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("calculate-btn").addEventListener("click", function () {
    setTimeout(() => { // Ждем загрузки офферов
      fetch("data/banks-data.json")
        .then(response => response.json())
        .then(banksData => {
          addChevrons(banksData);
          updateChevronPositions(); // Первоначальное обновление позиций
        })
        .catch(error => console.error("Ошибка загрузки banks-data.json:", error));
    }, 2100); // Даем время на рендеринг офферов
  });
  
  // Обновляем позиции шевронов при изменении размеров окна
  window.addEventListener("resize", updateChevronPositions);
});

function addChevrons(banksData) {
  const offers = document.querySelectorAll(".offer");
  if (offers.length === 0) return;

  // 🟢 Первый оффер получает "Самый выгодный"
  const firstOffer = offers[0];
  addChevron(firstOffer, "images/icons/samvig1.svg", "Самый выгодный");

  // 🟢 Ищем банки с rating: 1 и добавляем "Быстро и удобно"
  offers.forEach(offer => {
    const bankName = offer.querySelector("strong")?.textContent.trim();
    const bankData = banksData.find(bank => bank.name === bankName);
    if (bankData && bankData.rating === 1) {
      addChevron(offer, "images/icons/bistrud.svg", "Быстро и удобно");
    }
  });
}

function addChevron(offerElement, iconPath, altText) {
  const separator = offerElement.querySelector(".offer__separator"); 
  if (!separator) {
    console.warn("⚠️ Не найден .offer__separator в:", offerElement);
    return;
  }

  console.log(`✅ Добавляем шеврон ${altText} перед .offer__separator`);

  const chevronImg = document.createElement("img");
  chevronImg.src = iconPath;
  chevronImg.alt = altText;
  chevronImg.classList.add("chevron-overlay");

  // Вставляем шеврон перед separator
  separator.parentElement.insertBefore(chevronImg, separator);

  // Обеспечиваем, чтобы offerElement был позиционирован относительно
  offerElement.style.position = "relative";

  // Устанавливаем начальную позицию шеврона
  updateChevronPosition(chevronImg, separator, offerElement);
}

function updateChevronPosition(chevronImg, separator, offerElement) {
  const separatorRect = separator.getBoundingClientRect();
  const offerRect = offerElement.getBoundingClientRect();
  // Смещение separator относительно offerElement
  const leftOffset = separatorRect.left - offerRect.left;
  chevronImg.style.position = "absolute";
  chevronImg.style.top = "-5px"; // Прижимаем по верхнему краю offerElement /////////////////////////////////////////
  chevronImg.style.left = `${leftOffset}px`;
  // Смещаем шеврон влево на его полную ширину, чтобы его правая сторона совпала с левым краем separator
  chevronImg.style.transform = "translateX(-100%)";
}

function updateChevronPositions() {
  document.querySelectorAll(".chevron-overlay").forEach(chevron => {
    // Предполагаем, что следующий sibling является separator
    const separator = chevron.nextElementSibling;
    if (separator && separator.classList.contains("offer__separator")) {
      const offerElement = chevron.parentElement;
      updateChevronPosition(chevron, separator, offerElement);
    }
  });
}
