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

    // HTML для крутилки
    const loadingHTML = `
        <div id="loading-spinner" style="
            display: flex;
            align-items: center;
            justify-content: center;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(255, 255, 255, 0.9);
            z-index: 9999;
            font-family: Arial, sans-serif;
            color: #0E214C;
            font-size: 18px;
        ">
            <div style="text-align: center;">
                <div class="spinner" style="
                    border: 5px solid rgba(0, 0, 0, 0.1);
                    border-top: 5px solid #0E214C;
                    border-radius: 50%;
                    width: 50px;
                    height: 50px;
                    animation: spin 1s linear infinite;
                    margin: 0 auto;
                "></div>
                <p style="margin-top: 20px;">Загружаем ваше предложение...</p>
            </div>
        </div>
        <style>
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>
    `;

    // Открытие новой вкладки
    const newWindow = window.open();
    if (!newWindow) {
        alert("Не удалось открыть новую вкладку. Пожалуйста, отключите блокировщик всплывающих окон.");
        return;
    }

    // Показ крутилки в новой вкладке
    newWindow.document.open();
    newWindow.document.write(loadingHTML);
    newWindow.document.close();

    // Задержка перед отображением основной страницы (2 секунды)
    setTimeout(() => {
        // Используем исходную строку суммы без изменения
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
            </head>
            <body>
                <div class="virtual-page">
                    <section class="hero">
                        <div class="container">
                            <h1>Оформление банковской гарантии</h1>
                            <p>Подтвердите свои данные для продолжения</p>
                        </div>
                    </section>

                    <div class="content-vp">
                        <div class="offer">
                            <div class="offer__logo" style="background-image: url('${offer.logo}');"></div>
                            <div class="offer__details">
                                <p class="offer__title-wrap"><strong>${offer.name}</strong></p>
                                <p class="offer__text">Ставка: ${offer.rate}%</p>
                                <p class="offer__text">Стоимость: ${offer.cost.toLocaleString()} руб.</p>
                            </div>
                        </div>
                    </div>

                    <div class="content-vp">
                        <h2>Выбранные параметры</h2>
                        <div class="form-row">
                         
                            <div class="form-column">
                                <div class="upload-row">
                                 <p>Сумма гарантии: ${formattedSum}</p>
                                </div>
                                <div class="upload-row">
                                 <p>Срок действия: ${selectedParams.days} дней</p>
                                </div>
                            </div>
                            
                            <div class="form-column">
                                <div class="upload-row">
                                 <p>Тип процедуры: ${getProcedureTypeName(selectedParams.procType)}</p>
                                </div>
                                <div class="upload-row">
                                 <p>Тип гарантии: ${getGuaranteeTypeName(selectedParams.guarType)}</p>
                                </div>
                            </div>

                            <div class="form-column">
                                <div class="upload-row">
                                 <p>Наличие аванса: ${selectedParams.hasAdvance ? "Да" : "Нет"}</p>
                                </div>
                                <div class="upload-row">
                                 <p>Гарантия по форме заказчика: ${selectedParams.customForm ? "Да" : "Нет"}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="content-vp">
                        <h2>Контактные данные</h2>
                        <div class="form-row">
                            <div class="form-column styled-column">
                              <label class="styled-label" for="full-name">ФИО</label>
                              <input class="styled-input" type="text" id="full-name" name="full-name" placeholder="Введите ваше ФИО">

                              <label class="styled-label" for="email">Email</label>
                              <input class="styled-input" type="email" id="email" name="email" placeholder="Введите ваш email">

                              <label class="styled-label" for="phone">Телефон</label>
                              <input class="styled-input" type="tel" id="phone" name="phone" placeholder="Введите ваш телефон">
                            </div>
                        </div>

                    </div>

                    <div class="content-vp">
                        <h2>Загрузите ваши документы (не обязательно, но это ускорит процесс оформления)</h2>
                        <p>Не обязательно, но это ускорит процесс оформления гарантии</p>
                        ${generateDocumentFields()}
                    </div>

                    <div class="content-vp-btn-chek">
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

        newWindow.document.open();
        newWindow.document.write(virtualPageHTML);
        newWindow.document.close();
    }, 2000);
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

/* Добавление автомаски для телефона*/
document.addEventListener('DOMContentLoaded', () => {
        const phoneInput = document.getElementById('phone');
        Inputmask({ 
            mask: "+7 (999) 999-99-99",
            showMaskOnHover: false
        }).mask(phoneInput);
    });
    document.getElementById('phone').addEventListener('blur', function() {
    const phoneValue = this.value;
    const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
    if (!phoneRegex.test(phoneValue)) {
        alert('Введите корректный номер телефона!');
    }
});

document.getElementById('phone').addEventListener('blur', function() {
    const phoneValue = this.value;
    const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
    if (!phoneRegex.test(phoneValue)) {
        alert('Введите корректный номер телефона!');
    }
});
