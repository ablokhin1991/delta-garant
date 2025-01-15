// Проверяем, что документ загружен
document.addEventListener("DOMContentLoaded", () => {
    console.log("Virtual-page-2.js загружен");

    // Определяем глобальную функцию openVirtualPage
    window.openVirtualPage = function (offer, selectedParams) {
        if (!offer || !selectedParams) {
            console.error("Не переданы данные для отображения.");
            return;
        }

        // Открытие новой вкладки
        const newWindow = window.open();
        if (!newWindow) {
            alert("Не удалось открыть новую вкладку. Пожалуйста, отключите блокировщик всплывающих окон.");
            return;
        }

        // Показ крутилки в новой вкладке
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

        newWindow.document.open();
        newWindow.document.write(loadingHTML);
        newWindow.document.close();

        // Задержка перед отображением основной страницы
        setTimeout(() => {
            const formattedSum = `${selectedParams.sum.toLocaleString()} руб.`;

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
                            <p>Сумма гарантии: ${formattedSum}</p>
                            <p>Срок действия: ${selectedParams.days} дней</p>
                            <p>Тип процедуры: ${getProcedureTypeName(selectedParams.procType)}</p>
                            <p>Тип гарантии: ${getGuaranteeTypeName(selectedParams.guarType)}</p>
                            <p>Наличие аванса: ${selectedParams.hasAdvance ? "Да" : "Нет"}</p>
                            <p>Гарантия по форме заказчика: ${selectedParams.customForm ? "Да" : "Нет"}</p>
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

                        <section class="content-vp-btn-chek">
                            <button class="btn_primary">Отправить заявку</button>
                            <label class="agreement">
                                <input type="checkbox" id="agreement" name="agreement" required>
                                Я согласен с <a href="/policy.html" target="_blank">политикой обработки персональных данных</a>.
                            </label>
                        </section>
                    </div>
                </body>
                </html>
            `;

            newWindow.document.open();
            newWindow.document.write(virtualPageHTML);
            newWindow.document.close();
        }, 2000);
    };

    // Дополнительные функции
    function getProcedureTypeName(procType) {
        const types = {
            "1": "44-ФЗ",
            "2": "223-ФЗ",
            "3": "615-ПП/185-ФЗ",
            "4": "Коммерческий тендер",
        };
        return types[procType] || "Неизвестный тип";
    }

    function getGuaranteeTypeName(guarType) {
        const types = {
            "1": "На участие",
            "2": "На исполнение контракта",
            "3": "На возврат аванса",
            "4": "На гарантийный период",
        };
        return types[guarType] || "Неизвестный тип";
    }
});
