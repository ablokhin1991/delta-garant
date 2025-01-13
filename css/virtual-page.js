document.addEventListener('DOMContentLoaded', () => {
    const submitBtn = document.getElementById('submit-btn');

    submitBtn.addEventListener('click', () => {
        // Получение параметров предложения из расчета
        const selectedOffer = { 
            name: 'Банк Пример', 
            rate: 5.2, 
            cost: 150000,
            logo: 'https://via.placeholder.com/100'
        }; // Пример, замените на данные из вашего калькулятора

        const guaranteeSum = document.getElementById('guarantee-sum').value;
        const guaranteeDays = document.getElementById('guarantee-days').value;
        const procedureType = document.getElementById('procedure-type').value;
        const guaranteeType = document.getElementById('guarantee-type').value;
        const hasAdvance = document.getElementById('has-advance').checked;
        const customForm = document.getElementById('custom-form').checked;

        // Открытие виртуальной страницы в новой вкладке
        const newWindow = window.open('', '_blank');
        if (!newWindow) {
            alert('Попапы заблокированы вашим браузером. Разрешите всплывающие окна для использования этой функции.');
            return;
        }

        // Генерация содержимого виртуальной страницы
        newWindow.document.write(`
            <!DOCTYPE html>
            <html lang="ru">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Оформление банковской гарантии</title>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; margin: 20px; }
                    h1 { text-align: center; }
                    .offer-summary { margin-bottom: 20px; padding: 15px; border: 1px solid #ccc; border-radius: 5px; }
                    .form-group { margin-bottom: 15px; }
                    label { display: block; margin-bottom: 5px; font-weight: bold; }
                    input, textarea, select { width: 100%; padding: 10px; margin-bottom: 10px; border: 1px solid #ccc; border-radius: 5px; }
                    .upload-section { margin-top: 20px; }
                    .upload-section h3 { margin-bottom: 10px; }
                    .checkbox-group { margin-bottom: 15px; }
                    button { padding: 10px 20px; background: #007BFF; color: #fff; border: none; border-radius: 5px; cursor: pointer; }
                    button:disabled { background: #ccc; cursor: not-allowed; }
                </style>
            </head>
            <body>
                <h1>Оформление банковской гарантии</h1>

                <div class="offer-summary">
                    <h2>Выбранное предложение</h2>
                    <div><strong>Банк:</strong> ${selectedOffer.name}</div>
                    <div><strong>Ставка:</strong> ${selectedOffer.rate}%</div>
                    <div><strong>Стоимость:</strong> ${selectedOffer.cost.toLocaleString()} руб.</div>
                    <div><strong>Сумма гарантии:</strong> ${guaranteeSum}</div>
                    <div><strong>Срок (дней):</strong> ${guaranteeDays}</div>
                    <div><strong>Тип процедуры:</strong> ${procedureType}</div>
                    <div><strong>Тип гарантии:</strong> ${guaranteeType}</div>
                    <div><strong>Аванс:</strong> ${hasAdvance ? 'Да' : 'Нет'}</div>
                    <div><strong>Кастомная форма:</strong> ${customForm ? 'Да' : 'Нет'}</div>
                </div>

                <form>
                    <h2>Контактная информация</h2>
                    <div class="form-group">
                        <label for="full-name">ФИО</label>
                        <input type="text" id="full-name" placeholder="Введите ваше ФИО" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" placeholder="Введите ваш Email" required>
                    </div>
                    <div class="form-group">
                        <label for="phone">Телефон</label>
                        <input type="tel" id="phone" placeholder="+7 (___) ___-__-__" required>
                    </div>

                    <div class="upload-section">
                        <h3>Загрузите ваши документы</h3>
                        <p>Это не обязательно, но это ускорит процесс оформления гарантии.</p>

                        <h4>Правоустанавливающие документы</h4>
                        <ul>
                            <li>Паспорт для физических лиц: всех учредителей, генерального директора и представителей юридического лица</li>
                            <li>Решение или протокол о назначении генерального директора</li>
                            <li>Договор аренды или свидетельство о собственности на юр. адрес</li>
                            <li>Устав организации в действующей редакции</li>
                        </ul>

                        <h4>Финансовые документы</h4>
                        <ul>
                            <li>ОСН / УСН - Финансовая отчетность, Формы 1 и 2 за последнюю квартальную дату</li>
                            <li>ОСН / УСН - Финансовая отчетность, Формы 1 и 2 за полный последний год с квитанцией о принятии в ФНС</li>
                        </ul>

                        <h4>Для гарантии</h4>
                        <ul>
                            <li>Контракт или договор, подтверждающий необходимость предоставления банковской гарантии</li>
                            <li>Тендерная или конкурсная документация и другая информация о сроках проведения конкурса</li>
                        </ul>

                        <input type="file" id="file-upload" multiple>
                    </div>

                    <div class="checkbox-group">
                        <input type="checkbox" id="agree-policy" checked required>
                        <label for="agree-policy">Я согласен с политикой обработки персональных данных</label>
                    </div>

                    <button type="submit">Отправить</button>
                </form>
            </body>
            </html>
        `);
    });
});
