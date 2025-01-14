// Обработчик загрузки документа
document.addEventListener("DOMContentLoaded", () => {
    console.log("virtual-page.js загружен");
});

/**
 * Функция для создания виртуальной страницы.
 * @param {Object} offer - Данные выбранного предложения.
 * @param {Object} selectedParams - Выбранные параметры для отображения.
 */
function openVirtualPage(offer, selectedParams) {
    if (!offer || !selectedParams) {
        console.error("Не переданы данные для отображения.");
        return;
    }

    // Сохраняем текущую страницу в переменной
    const originalPage = document.body.innerHTML;

    // Используем исходную строку суммы без изменения формата
    const rawSum = String(selectedParams.sum);
    console.log("Raw sum received:", rawSum);

    // Проверяем формат суммы (удаляем только лишние символы, оставляя пробелы)
    const formattedSum = rawSum.replace(/[^\d\s]/g, "").trim() + " руб.";

    console.log("Formatted sum:", formattedSum);

    // Генерируем HTML для виртуальной страницы
    const virtualPageHTML = 
        `<div class="virtual-page">
            <section class="hero">
                <div class="container">
                    <h1>Оформление банковской гарантии</h1>
                    <p>Подтвердите свои данные для продолжения</p>
                </div>
            </section>

            <div class="content">
                <div class="offer">
                    <div class="offer__logo" style="background-image: url('${offer.logo}');"></div>
                    <div class="offer__details">
                        <p class="offer__title-wrap"><strong>${offer.name}</strong></p>
                        <p class="offer__text">Ставка: ${offer.rate}%</p>
                        <p class="offer__text">Стоимость: ${offer.cost.toLocaleString()} руб.</p>
                    </div>
                </div>
            </div>

            <div class="content">
                <h2>Выбранные параметры</h2>
                <div class="form-row">
                    <div class="form-column">
                        <p>Сумма гарантии: ${formattedSum}</p>
                        <p><strong>Срок действия:</strong> ${selectedParams.days} дней</p>
                    </div>
                    <div class="form-column">
                        <p><strong>Тип процедуры:</strong> ${getProcedureTypeName(selectedParams.procType)}</p>
                        <p><strong>Тип гарантии:</strong> ${getGuaranteeTypeName(selectedParams.guarType)}</p>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-column">
                        <p><strong>Наличие аванса:</strong> ${selectedParams.hasAdvance ? "Да" : "Нет"}</p>
                        <p><strong>Гарантия по форме заказчика:</strong> ${selectedParams.customForm ? "Да" : "Нет"}</p>
                    </div>
                </div>
            </div>

            <div class="content">
                <h2>Контактные данные</h2>
                <div class="form-row">
                    <div class="form-column">
                        <label for="full-name">ФИО</label>
                        <input type="text" id="full-name" name="full-name" placeholder="Введите ваше ФИО">
                    </div>
                    <div class="form-column">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="Введите ваш email">
                    </div>
                    <div class="form-column">
                        <label for="phone">Телефон</label>
                        <input type="tel" id="phone" name="phone" placeholder="Введите ваш телефон">
                    </div>
                </div>
            </div>

            <div class="content">
                <h2>Загрузите ваши документы (не обязательно, но ускорит процесс оформления)</h2>
                ${generateDocumentFields()}
            </div>

            <div class="content">
                <button class="btn_primary" id="submit-button">Отправить</button>
                <label class="agreement">
                    <input type="checkbox" id="agreement" name="agreement" required>
                    Я согласен с политикой обработки персональных данных
                </label>
            </div>
        </div>
    `;

    // Заменяем содержимое страницы
    document.body.innerHTML = virtualPageHTML;

    // Обработчик отправки формы
    const submitButton = document.getElementById("submit-button");
    submitButton.addEventListener("click", () => {
        if (!document.getElementById("agreement").checked) {
            alert("Вы должны согласиться с политикой обработки персональных данных.");
            return;
        }
        alert("Форма успешно отправлена!");
        document.body.innerHTML = originalPage; // Возвращаем исходное содержимое
    });
}

/**
 * Функция для генерации полей загрузки документов.
 */
function generateDocumentFields() {
    const documents = [
        { id: "passport", name: "Паспорт" },
        { id: "appointment", name: "Решение о назначении" },
        { id: "lease", name: "Договор аренды" },
        { id: "charter", name: "Устав" },
        { id: "finance-report", name: "Финансовая отчетность" },
        { id: "contract", name: "Контракт" },
    ];

    return documents
        .map(
            (doc) => 
        `<div class="upload-row">
            <div class="upload-icon"></div>
            <p class="upload-name">${doc.name}</p>
            <button class="btn_primary" onclick="document.getElementById('${doc.id}').click()">Выбрать файл</button>
            <input type="file" id="${doc.id}" name="${doc.id}" style="display: none;">
        </div>`
        )
        .join("");
}

/**
 * Функция для получения названия типа процедуры.
 */
function getProcedureTypeName(procType) {
    const procedureTypes = {
        "1": "44-ФЗ",
        "2": "223-ФЗ",
        "3": "615-ПП/185-ФЗ",
        "4": "Коммерческий тендер",
    };
    return procedureTypes[procType] || "Неизвестный тип";
}

/**
 * Функция для получения названия типа гарантии.
 */
function getGuaranteeTypeName(guarType) {
    const guaranteeTypes = {
        "1": "На участие",
        "2": "На исполнение контракта",
        "3": "На возврат аванса",
        "4": "На гарантийный период",
    };
    return guaranteeTypes[guarType] || "Неизвестный тип";
}
