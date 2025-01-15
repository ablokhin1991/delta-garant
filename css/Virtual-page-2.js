// Virtual-page-2.js

/**
 * Обработчик для кнопки "Оформить".
 */
document.querySelector('.btn_primary.offer__button').addEventListener('click', function () {
    const selectedParams = getSelectedParams();
    const selectedOffer = getSelectedOffer();

    if (!selectedParams || !selectedOffer) {
        alert("Выберите параметры и предложение для оформления.");
        return;
    }

    // Открытие новой вкладки с крутилкой
    const newWindow = window.open();
    if (!newWindow) {
        alert("Не удалось открыть новую вкладку. Отключите блокировщик всплывающих окон.");
        return;
    }

    showLoadingSpinner(newWindow);

    setTimeout(() => {
        renderVirtualPage(newWindow, selectedOffer, selectedParams);
    }, 2000);
});

/**
 * Показывает крутилку загрузки.
 * @param {Window} newWindow
 */
function showLoadingSpinner(newWindow) {
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

    newWindow.document.open();
    newWindow.document.write(loadingHTML);
    newWindow.document.close();
}

/**
 * Рендерит виртуальную страницу.
 * @param {Window} newWindow
 * @param {Object} offer
 * @param {Object} selectedParams
 */
function renderVirtualPage(newWindow, offer, selectedParams) {
    const formattedSum = `${selectedParams.sum.replace(/[\D]/g, "")} руб.`;

    const virtualPageHTML = `
        <!DOCTYPE html>
        <html lang="ru">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Оформление банковской гарантии</title>
            <link rel="stylesheet" href="css/styles.css">
        </head>
        <body>
            <div class="content">
                <header class="hero">
                    <h1>Оформление банковской гарантии</h1>
                </header>

                <section class="content-vp">
                    <h2 class="result__title-wrap">Выбранные параметры</h2>
                    <div class="form-row">
                        <div class="form-column">
                            <p>Сумма гарантии: ${formattedSum}</p>
                            <p>Срок действия: ${selectedParams.days} дней</p>
                        </div>
                        <div class="form-column">
                            <p>Тип процедуры: ${getProcedureTypeName(selectedParams.procType)}</p>
                            <p>Тип гарантии: ${getGuaranteeTypeName(selectedParams.guarType)}</p>
                        </div>
                        <div class="form-column">
                            <p>Наличие аванса: ${selectedParams.hasAdvance ? "Да" : "Нет"}</p>
                            <p>Гарантия по форме заказчика: ${selectedParams.customForm ? "Да" : "Нет"}</p>
                        </div>
                    </div>
                </section>

                <section class="content-vp">
                    <h2 class="result__title-wrap">Выбранный банк</h2>
                    <div class="offer">
                        <div class="offer__logo" style="background-image: url('${offer.logo}');"></div>
                        <div class="offer__details">
                            <p class="offer__title-wrap"><strong>${offer.name}</strong></p>
                            <p class="offer__text">Ставка: ${offer.rate}%</p>
                            <p class="offer__text">Стоимость: ${offer.cost.toLocaleString()} руб.</p>
                        </div>
                    </div>
                </section>

                <section class="content-vp">
                    <h2 class="result__title-wrap">Контактные данные</h2>
                    <form>
                        <div class="field">
                            <label class="field__label-placeholder">ФИО</label>
                            <input type="text" class="field__input" required />
                        </div>
                        <div class="field">
                            <label class="field__label-placeholder">Email</label>
                            <input type="email" class="field__input" required />
                        </div>
                        <div class="field">
                            <label class="field__label-placeholder">Телефон</label>
                            <input type="tel" class="field__input" required />
                        </div>
                    </form>
                </section>

                <section class="content-vp">
                    <h2 class="result__title-wrap">Загрузите ваши документы</h2>
                    ${generateDocumentFields()}
                </section>

                <section class="content-vp content-vp-btn-chek">
                    <button class="btn_primary offer__button">Отправить заявку</button>
                    <div class="agreement">
                        <input type="checkbox" id="policy-check" checked />
                        <label for="policy-check">Я согласен с <a href="/policy.html" target="_blank">политикой обработки персональных данных</a>.</label>
                    </div>
                </section>
            </div>
        </body>
        </html>
    `;

    newWindow.document.open();
    newWindow.document.write(virtualPageHTML);
    newWindow.document.close();
}

/**
 * Получает выбранные параметры из формы.
 */
function getSelectedParams() {
    const sum = document.getElementById('guarantee-sum').value;
    const days = document.getElementById('guarantee-days').value;
    const procType = document.getElementById('procedure-type').value;
    const guarType = document.getElementById('guarantee-type').value;
    const hasAdvance = document.getElementById('has-advance').checked;
    const customForm = document.getElementById('custom-form').checked;

    return { sum, days, procType, guarType, hasAdvance, customForm };
}

/**
 * Получает выбранное предложение из блока результатов.
 */
function getSelectedOffer() {
    const offerElement = document.querySelector('.result__offers .offer');
    if (!offerElement) return null;

    return {
        name: offerElement.querySelector('.offer__title-wrap').textContent,
        rate: offerElement.querySelector('.offer__text').textContent.match(/\d+/)[0],
        cost: parseFloat(offerElement.querySelector('.offer__text:nth-child(3)').textContent.replace(/[\D]/g, '')),
        logo: offerElement.querySelector('.offer__logo').style.backgroundImage.slice(5, -2),
    };
}

/**
 * Генерирует поля загрузки документов.
 */
function generateDocumentFields() {
    const documents = [
        { id: 'passport', name: 'Паспорт' },
        { id: 'charter', name: 'Устав' },
    ];

    return documents.map(doc => `
        <div class="upload-row">
            <img src="images/icons/doc.svg" class="upload-icon" alt="${doc.name}" />
            <p class="upload-name">${doc.name}</p>
            <button class="btn_primary" onclick="document.getElementById('${doc.id}').click()">Выбрать файл</button>
            <input type="file" id="${doc.id}" style="display: none;">
        </div>
    `).join('');
}

/**
 * Получает название типа процедуры.
 */
function getProcedureTypeName(procType) {
    const types = {
        '1': '44-ФЗ',
        '2': '223-ФЗ',
        '3': '615-ПП/185-ФЗ',
        '4': 'Коммерческий тендер',
    };
    return types[procType] || 'Неизвестный тип';
}

/**
 * Получает название типа гарантии.
 */
function getGuaranteeTypeName(guarType) {
    const types = {
        '1': 'На участие',
        '2': 'На исполнение контракта',
        '3': 'На возврат аванса',
        '4': 'На гарантийный период',
    };
    return types[guarType] || 'Неизвестный тип';
}
