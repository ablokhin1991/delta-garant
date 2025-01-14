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

    // Используем исходную строку суммы без изменения формата
    const rawSum = String(selectedParams.sum);
    console.log("Raw sum received:", rawSum);

    // Проверяем формат суммы (удаляем только лишние символы, оставляя пробелы)
    const formattedSum = rawSum.replace(/[^\d\s]/g, "").trim() + " руб.";

    console.log("Formatted sum:", formattedSum);

    // Генерируем HTML для виртуальной страницы
    const virtualPageHTML = `
        <html>
        <head>
            <title>Оформление банковской гарантии</title>
            <link rel="stylesheet" href="css/styles.css">
            <style>
                /* Основные стили для виртуальной страницы */
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    margin: 0;
                    padding: 0;
                    background-color: #f4f4f4;
                }

                .hero {
                    background-color: #f4f4f4;
                    color: #0E214C;
                    text-align: center;
                    padding: 20px 10px;
                }

                .hero h1 {
                    font-size: 1.8em;
                    margin-bottom: 10px;
                }

                .content {
                    margin-top: 20px;
                }

                h2 {
                    font-size: 1.4em;
                    margin-bottom: 10px;
                    color: #0E214C;
                }

                .offer {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 20px;
                    padding: 10px;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    background-color: #f9f9f9;
                }

                .offer__logo {
                    width: 60px;
                    height: 60px;
                    background-size: cover;
                    background-position: center;
                }

                .offer__details {
                    flex: 1;
                    margin-left: 20px;
                    font-size: 14px;
                }

                .form-row {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 20px;
                }

                .form-column {
                    width: 48%;
                }

                label {
                    display: block;
                    margin-bottom: 5px;
                }

                input, select {
                    width: 100%;
                    padding: 8px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                }

                button {
                    display: block;
                    width: 100%;
                    padding: 10px;
                    background-color: #0E214C;
                    color: #fff;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                }

                button:hover {
                    background-color: #08162d;
                }

                /* Адаптивность для мобильных устройств */
                @media (max-width: 768px) {
                    .form-row {
                        flex-direction: column;
                    }

                    .form-column {
                        width: 100%;
                        margin-bottom: 20px;
                    }

                    .offer {
                        flex-direction: column;
                        align-items: flex-start;
                    }

                    .offer__logo {
                        margin-bottom: 10px;
                    }

                    button {
                        width: 100%;
                    }

                    h2 {
                        font-size: 1.2em;
                    }

                    .hero h1 {
                        font-size: 1.5em;
                    }
                }
            </style>
        </head>
        <body>
            <div class="virtual-page">
                <section class="hero">
                    <div class="container">
                        <h1>Оформление банковской гарантии</h1>
                        <p>Подтвердите свои данные для продолжения</p>
                    </div>
                </section>

                <div class="content">
                    <h2>Выбранный банк</h2>
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
        </body>
        </html>
    `;

    // Открытие новой вкладки
    const newWindow = window.open();
    if (newWindow) {
        newWindow.document.open();
        newWindow.document.write(virtualPageHTML);
        newWindow.document.close();
    } else {
        alert("Не удалось открыть новую вкладку. Пожалуйста, отключите блокировщик всплывающих окон.");
    }

    // Перезагрузка текущей страницы
    location.reload();
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
