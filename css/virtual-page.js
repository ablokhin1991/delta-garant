// Обработчик загрузки документа
document.addEventListener("DOMContentLoaded", () => {
    console.log("virtual-page.js загружен");
});

/**
 * Функция для создания виртуальной страницы.
 * @param {Object} offer - Данные выбранного предложения.
 */
function openVirtualPage(offer) {
    if (!offer) {
        console.error("Данные предложения не переданы.");
        return;
    }

    // Получение значений выбранных параметров
    const sumField = document.getElementById("guarantee-sum").value;
    const daysField = document.getElementById("guarantee-days").value;
    const procType = document.getElementById("procedure-type").value;
    const guarType = document.getElementById("guarantee-type").value;
    const hasAdvance = document.getElementById("has-advance").checked ? "Да" : "Нет";
    const customForm = document.getElementById("custom-form").checked ? "Да" : "Нет";

    // Сохраняем текущую страницу в переменной
    const originalPage = document.body.innerHTML;

    // Генерируем HTML для виртуальной страницы
    const virtualPageHTML = `
        <section class="hero">
            <div class="container">
                <h1>Оформление банковской гарантии</h1>
                <p>Подтвердите выбранные параметры и отправьте заявку</p>
            </div>
        </section>
        
        <div class="content">
            <!-- Блок выбранного банка -->
            <div class="result">
                <div class="offer">
                    <div class="offer__logo" style="background-image: url('${offer.logo}')"></div>
                    <div class="offer__details">
                        <strong>${offer.name}</strong>
                    </div>
                    <div class="offer__rate">
                        Ставка: ${offer.rate}% <br>
                        ${offer.cost.toLocaleString()} руб.
                    </div>
                </div>
            </div>

            <!-- Блок выбранных параметров -->
            <div class="content">
                <h2>Выбранные параметры</h2>
                <div class="form-row">
                    <div class="form-column">
                        <p><strong>Сумма гарантии:</strong> ${sumField} руб.</p>
                        <p><strong>Срок действия:</strong> ${daysField} дней</p>
                    </div>
                    <div class="form-column">
                        <p><strong>Тип процедуры:</strong> ${procType}</p>
                        <p><strong>Тип гарантии:</strong> ${guarType}</p>
                    </div>
                    <div class="form-column">
                        <p><strong>Наличие аванса:</strong> ${hasAdvance}</p>
                        <p><strong>Гарантия по форме заказчика:</strong> ${customForm}</p>
                    </div>
                </div>
            </div>

            <!-- Поля загрузки документов -->
            <h2>Загрузите ваши документы (не обязательно, но ускорит процесс оформления)</h2>
            <form id="application-form">
                <fieldset>
                    <legend>Правоустанавливающие документы</legend>
                    <label>Паспорт:</label><input type="file" id="passport" name="passport"><br>
                    <label>Решение о назначении:</label><input type="file" id="appointment" name="appointment"><br>
                    <label>Договор аренды:</label><input type="file" id="lease" name="lease"><br>
                    <label>Устав:</label><input type="file" id="charter" name="charter"><br>
                </fieldset>
                <fieldset>
                    <legend>Финансовые документы</legend>
                    <label>Финансовая отчетность:</label><input type="file" id="finance-report" name="finance-report"><br>
                </fieldset>
                <fieldset>
                    <legend>Для гарантии</legend>
                    <label>Контракт:</label><input type="file" id="contract" name="contract"><br>
                </fieldset>

                <!-- Чекбокс согласия -->
                <label>
                    <input type="checkbox" id="agreement" name="agreement" required>
                    Я согласен с политикой обработки персональных данных
                </label>
                <br>

                <!-- Кнопка отправки -->
                <button type="submit" class="btn_primary">Отправить</button>
            </form>
            <button id="close-page" class="btn_secondary">Закрыть</button>
        </div>
    `;

    // Заменяем содержимое страницы
    document.body.innerHTML = virtualPageHTML;

    // Добавляем обработчик закрытия виртуальной страницы
    const closeButton = document.getElementById("close-page");
    closeButton.addEventListener("click", () => {
        document.body.innerHTML = originalPage; // Восстанавливаем исходное содержимое
    });

    // Обработчик отправки формы
    const form = document.getElementById("application-form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        alert("Форма успешно отправлена!");
        document.body.innerHTML = originalPage; // Возвращаем исходное содержимое
    });
}
