document.getElementById("guarantee-type").addEventListener("change", function () {
    const guarType = this.value;
    const advanceCheckbox = document.getElementById("has-advance");

    if (guarType === "1" || guarType === "3" || guarType === "4") {
        advanceCheckbox.parentElement.style.display = "none";
        advanceCheckbox.disabled = true;
    } else {
        advanceCheckbox.parentElement.style.display = "flex";
        advanceCheckbox.disabled = false;
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const guarType = document.getElementById("guarantee-type").value;
    const advanceCheckbox = document.getElementById("has-advance");

    if (guarType === "1" || guarType === "3" || guarType === "4") {
        advanceCheckbox.parentElement.style.display = "none";
        advanceCheckbox.disabled = true;
    } else {
        advanceCheckbox.parentElement.style.display = "flex";
        advanceCheckbox.disabled = false;
    }
});

document.getElementById("calculate-btn").addEventListener("click", function () {
    const guaranteeSumField = document.getElementById("guarantee-sum");
    const guaranteeDaysField = document.getElementById("guarantee-days");

    const errorSumMessage = document.getElementById("error-message");
    const errorDaysMessage = document.getElementById("error-period-message");

    guaranteeSumField.classList.remove("error");
    guaranteeDaysField.classList.remove("error");
    errorSumMessage.style.display = "none";
    errorDaysMessage.style.display = "none";

    let isValid = true;

    const sum = guaranteeSumField.value.trim().replace(/\s+/g, "");
    if (!sum || isNaN(sum)) {
        guaranteeSumField.classList.add("error");
        errorSumMessage.style.display = "flex";
        isValid = false;
    }

    const days = guaranteeDaysField.value.trim();
    if (!days || isNaN(days) || parseInt(days) <= 0) {
        guaranteeDaysField.classList.add("error");
        errorDaysMessage.style.display = "flex";
        isValid = false;
    }

    if (isValid) {
        console.log(`Сумма гарантии: ${sum} ₽`);
        console.log(`Срок действия: ${days} дней`);
    }
});

document.getElementById("calculate-btn").addEventListener("click", function () {
    const sum = parseFloat(document.getElementById("guarantee-sum").value.replace(/\s+/g, ""));
    const days = parseInt(document.getElementById("guarantee-days").value, 10);
    const procType = document.getElementById("procedure-type").value;
    const guarType = document.getElementById("guarantee-type").value;
    const hasAdvance = document.getElementById("has-advance").checked;
    const customForm = document.getElementById("custom-form").checked;

    if (sum > 150000000 || days > 3652) {
        alert("Превышены ограничения ПАО 'Альфа-Банк': Максимальная сумма 150 000 000 руб. и срок 3652 дня.");
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
        { procType: "4", guarType: "4", hasAdvance: false, customForm: false, rate: 0.04 },
    ];

    const alfaBankLogo = "https://static.tildacdn.com/tild3133-3932-4535-b135-363932343362/alfa_bank.png";

    const matchingCondition = alfaBankConditions.find((condition) => {
        return (
            condition.procType === procType &&
            condition.guarType === guarType &&
            condition.hasAdvance === hasAdvance &&
            condition.customForm === customForm
        );
    });

    if (!matchingCondition) {
        alert("Подходящих условий для выбранных параметров не найдено в ПАО 'Альфа-Банк'.");
        return;
    }

    const rate = matchingCondition.rate;
    const cost = Math.max((sum * rate * days) / 365, 1000).toFixed(2);

    const resultOutput = document.getElementById("result-output");
    const offerList = document.getElementById("offer-list");

    offerList.innerHTML = "";

    const offerDiv = document.createElement("div");
    offerDiv.className = "offer";
    offerDiv.innerHTML = `
        <div class="offer__wrap-left">
            <div class="offer__title-wrap">
                <img src="${alfaBankLogo}" alt="ПАО Альфа-Банк" style="width: 40px; margin-right: 10px;">
                <span class="link">ПАО АЛЬФА-БАНК</span>
            </div>
            <div class="offer__text">Ставка: ${(rate * 100).toFixed(1)}%</div>
        </div>
        
        <div class="offer__wrap-center">
            <div class="offer__title-wrap2">
                <span class="link">✓ Без открытия расчетного счета</span>
            </div>
            <div class="offer__title-wrap3">
                <span class="link">✓ Без залога и поручительства</span>
            </div>
        </div>
        
        <div class="offer__wrap-right">
            <div class="offer__text_block">
                <p class="offer__percent amount">${cost.replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ₽</p>
            </div>
            <button class="btn btn_primary btn_md btn_price">Оформить</button>
        </div>
    `;

    offerList.appendChild(offerDiv);
    resultOutput.style.display = "block";

    if (guarType === "1" || guarType === "3" || guarType === "4") {
        document.getElementById("has-advance").parentElement.style.display = "none";
    } else {
        document.getElementById("has-advance").parentElement.style.display = "block";
    }
});

