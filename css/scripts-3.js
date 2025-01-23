// Функция для загрузки JSON-данных
async function loadBankData() {
  try {
    const response = await fetch('data/banks-data.json'); // Замените путь на корректный
    if (!response.ok) {
      throw new Error(`Ошибка загрузки данных банков: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Ошибка загрузки данных банков:', error);
    return [];
  }
}


// Функция для инициализации калькулятора
async function initCalculator() {
  const banks = await loadBankData();

  if (!banks || banks.length === 0) {
    console.error('Данные банков не загружены или пусты.');
    return;
  }
  console.log('Данные банков:', banks);

  // Привязка событий
  bindInputFormatting();
  bindGuaranteeTypeChange();
  bindCalculateButton(banks);
  bindResetButton();
  applyResponsiveStyles();
}

// Функция для форматирования ввода суммы
function bindInputFormatting() {
  document.getElementById("guarantee-sum").addEventListener("input", function (e) {
    const rawValue = e.target.value.replace(/\s+/g, "").replace(/[^\d,.]/g, "");
    const formattedValue = rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    e.target.value = formattedValue;
  });
};

// Функция для форматирования ввода суммы
function bindInputFormatting() {
  document.getElementById("guarantee-sum").addEventListener("input", function (e) {
    const rawValue = e.target.value.replace(/\s+/g, "").replace(/[^\d,.]/g, "");
    const formattedValue = rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    e.target.value = formattedValue;
  });
}

// Функция для обработки клика на кнопке "Рассчитать"
function bindCalculateButton(banks) {
  document.getElementById("calculate-btn").addEventListener("click", async function () {
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

    const results = banks.map(bank => {
      const matchingConditions = bank.conditions.filter(c => {
        return (
          c.procType === procType &&
          c.guarType === guarType &&
          c.hasAdvance === hasAdvance &&
          c.customForm === customForm &&
          sum >= (c.minSum || 0) &&
          sum <= (c.ruleMaxSum || Infinity) &&
          days <= (c.ruleMaxDays || Infinity)
        );
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

    displayResults(results);
  });
}

// Функция для отображения результатов
function displayResults(results) {
  const offerList = document.getElementById("offer-list");
  const normalResults = results.filter(r => !r.isStopFactor);
  const stopFactorResults = results.filter(r => r.isStopFactor);

  normalResults.sort((a, b) => a.cost - b.cost);

  const finalResults = [...normalResults, ...stopFactorResults];

  if (finalResults.length === 0) {
    alert("Условия для выбранных параметров не найдены.");
    return;
  }

  offerList.innerHTML = finalResults
    .map((result, index) =>
      `
        <div class="offer">
          <div class="offer__logo" style="background-image: url('${result.logo}')"></div>
          <div class="offer__details"><strong>${result.name}</strong></div>
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

// Функция для применения стилей адаптации
function applyResponsiveStyles() {
  window.addEventListener("resize", function () {
    const isMobile = window.innerWidth <= 768;

    document.querySelectorAll(".offer").forEach(offer => {
      offer.style.flexDirection = isMobile ? "column" : "row";
    });
  });
}

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


// Функция для обработки кнопки сброса
function bindResetButton() {
  document.getElementById("reset-btn").addEventListener("click", function () {
    document.getElementById("result-output").style.display = "none";
    document.getElementById("offer-list").innerHTML = "";
    document.getElementById("reset-btn").style.display = "none";

    const form = document.getElementById("guarantee-calculator");
    form.reset();

    document.getElementById("guarantee-sum").value = "1 000 000";
    document.getElementById("guarantee-days").value = "365";
    document.getElementById("procedure-type").value = "1";
    document.getElementById("guarantee-type").value = "2";
    document.getElementById("has-advance").checked = false;
    document.getElementById("custom-form").checked = false;
  });
}


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



// КРУТИЛКА • КРУТИЛКА • КРУТИЛКА • КРУТИЛКА • КРУТИЛКА • КРУТИЛКА • КРУТИЛКА • КРУТИЛКА • КРУТИЛКА • КРУТИЛКА • КРУТИЛКА • 
// Добавляем крутилку при загрузке
document.getElementById("calculate-btn").addEventListener("click", function () {
  const loadingSpinner = document.getElementById("loading-spinner");
  const resultOutput = document.getElementById("result-output");
  const offerList = document.getElementById("offer-list");

  // Показываем крутилку и скрываем результаты
  resultOutput.style.display = "none";
  loadingSpinner.style.display = "block";
  loadingSpinner.scrollIntoView({ behavior: "smooth", block: "center" });

  // Симулируем загрузку
  setTimeout(() => {
      loadingSpinner.style.display = "none";
      resultOutput.style.display = "block";

      // Убедитесь, что DOM обновился перед прокруткой
      setTimeout(() => {
          if (offerList && offerList.offsetHeight > 0) {
              const rect = offerList.getBoundingClientRect();
              const scrollY = window.scrollY || window.pageYOffset;

              // Рассчитываем смещение
              const offset = window.innerWidth <= 768 ? 70 : 70; // 70px для мобильных, 150px для десктопов
              const targetPosition = rect.top + scrollY - offset;

              // Прокручиваем с кастомной скоростью
              window.scrollTo({
                  top: targetPosition,
                  behavior: "smooth", // Используем плавный скроллинг
              });
          } else {
              console.error("offerList не найден или не видим.");
          }
      }, 100); // Задержка для завершения перерисовки DOM
  }, 2000);
});


// КРУТИЛКА • КРУТИЛКА • КРУТИЛКА • КРУТИЛКА • КРУТИЛКА • КРУТИЛКА • КРУТИЛКА • КРУТИЛКА • КРУТИЛКА • КРУТИЛКА • КРУТИЛКА • 

// Запуск калькулятора
document.addEventListener("DOMContentLoaded", initCalculator);