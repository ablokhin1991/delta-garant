// Virtual-page-2.js

document.querySelector('.btn_primary.offer__button').addEventListener('click', function () {
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

    document.body.insertAdjacentHTML('beforeend', loadingHTML);

    setTimeout(() => {
        document.getElementById('loading-spinner').remove();

        const newWindow = window.open('');
        const selectedData = getSelectedData();

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
                        <form class="main-block" id="guarantee-calculator" style="pointer-events: none; opacity: 0.8;">
                            ${selectedData.parametersHTML}
                        </form>
                    </section>

                    <section class="content-vp">
                        <h2 class="result__title-wrap">Выбранный банк</h2>
                        ${selectedData.bankHTML}
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
                        <div class="upload-row">
                            <img src="images/icons/doc.svg" class="upload-icon" alt="Icon" />
                            <span class="upload-name">Паспорт</span>
                            <button class="btn_primary offer__button">Выбрать файл</button>
                        </div>
                        <div class="upload-row">
                            <img src="images/icons/doc.svg" class="upload-icon" alt="Icon" />
                            <span class="upload-name">Устав</span>
                            <button class="btn_primary offer__button">Выбрать файл</button>
                        </div>
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

        newWindow.document.write(virtualPageHTML);
        newWindow.document.close();
    }, 2000);
});

function getSelectedData() {
    const calculatorForm = document.getElementById('guarantee-calculator').cloneNode(true);
    calculatorForm.querySelector('.main-block__btn-wrap').remove();

    const bankOffer = document.querySelector('.result__offers').cloneNode(true);
    bankOffer.querySelector('.btn_primary.offer__button').remove();

    return {
        parametersHTML: calculatorForm.innerHTML,
        bankHTML: bankOffer.innerHTML,
    };
}
