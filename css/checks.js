// checks.js

// Проверка переменной ruleMaxSum
export function checkRuleMaxSum(bank, sum) {
    if (sum > bank.ruleMaxSum) {
      return {
        name: bank.name,
        logo: bank.logo,
        cost: "Стоп-факторы",
        rate: `Максимальная сумма гарантии ${bank.ruleMaxSum} руб.`,
        isStopFactor: true,
      };
    }
    return null; // Если проверка пройдена, возвращаем null
  }
  
  // Проверка переменной ruleMaxDays
  export function checkRuleMaxDays(bank, days) {
    if (days > bank.ruleMaxDays) {
      return {
        name: bank.name,
        logo: bank.logo,
        cost: "Стоп-факторы",
        rate: `Максимальный срок гарантии ${bank.ruleMaxDays} дней`,
        isStopFactor: true,
      };
    }
    return null; // Если проверка пройдена, возвращаем null
  }
  
  // Проверка переменной minSum
  export function checkMinSum(bank, sum) {
    if (sum < bank.minSum) {
      return {
        name: bank.name,
        logo: bank.logo,
        cost: "Стоп-факторы",
        rate: `Минимальная сумма гарантии ${bank.minSum} руб.`,
        isStopFactor: true,
      };
    }
    return null; // Если проверка пройдена, возвращаем null
  }
  
  // Проверка переменной procType
  export function checkProcType(bank, procType) {
    if (procType === "3" && bank.procType !== "3") {
      return {
        name: bank.name,
        logo: bank.logo,
        cost: "Стоп-факторы",
        rate: "Банк не работает с 615-ПП/185-ФЗ",
        isStopFactor: true,
      };
    }
    return null; // Если проверка пройдена, возвращаем null
  }
  