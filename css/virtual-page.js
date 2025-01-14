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

    // Генерируем HTML для виртуальной страницы
    const virtualPageHTML = `
        <div class="virtual-page">
            <section class="hero">
                <div class="container">
                    <h1>Оформление банковской гарантии</h1>
                    <p>Подтвердите свои данные для продолжения</p>
                </div>
            </section>

            <div class="result">
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
                <div class="form-row">
                    <div class="form-column">
                        <p><strong>Сумма гарантии:</strong> ${selectedParams.sum.toLocaleString()} руб.</p>
                    </div>
                    <div class="form-column">
                        <p><strong>Срок действия:</strong> ${selectedParams.days} дней</p>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-column">
                        <p><strong>Тип процедуры:</strong> ${selectedParams.procType}</p>
                    </div>
                    <div class="form-column">
                        <p><strong>Тип гарантии:</strong> ${selectedParams.guarType}</p>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-column">
                        <p><strong>Наличие аванса:</strong> ${selectedParams.hasAdvance ? "Да" : "Нет"}</p>
                    </div>
                    <div class="form-column">
                        <p><strong>Гарантия по форме заказчика:</strong> ${selectedParams.customForm ? "Да" : "Нет"}</p>
                    </div>
                </div>
            </div>

            <div class="document-upload">
                <h2>Загрузите ваши документы (не обязательно, но ускорит процесс оформления)</h2>
                ${generateDocumentFields()}
            </div>

            <button class="btn_primary" id="submit-button">Отправить</button>
            <label class="agreement">
                <input type="checkbox" id="agreement" name="agreement" required>
                Я согласен с политикой обработки персональных данных
            </label>
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
            (doc) => `
        <div class="upload-row">
            <div class="upload-icon"></div>
            <p class="upload-name">${doc.name}</p>
            <button class="btn_primary" onclick="document.getElementById('${doc.id}').click()">Выбрать файл</button>
            <input type="file" id="${doc.id}" name="${doc.id}" style="display: none;">
        </div>
    `
        )
        .join("");
}
