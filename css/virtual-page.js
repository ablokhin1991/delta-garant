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

    // Сохраняем текущую страницу в переменной
    const originalPage = document.body.innerHTML;

    // Генерируем HTML для виртуальной страницы
    const virtualPageHTML = `
        <div class="virtual-page">
            <h1>Оформление банковской гарантии</h1>
            <div class="offer-details">
                <p><strong>Банк:</strong> ${offer.name}</p>
                <p><strong>Ставка:</strong> ${offer.rate}%</p>
                <p><strong>Стоимость:</strong> ${offer.cost.toLocaleString()} руб.</p>
            </div>
            <form id="application-form">
                <h2>Контактные данные</h2>
                <label for="fullname">ФИО*</label>
                <input type="text" id="fullname" name="fullname" required>
                
                <label for="email">Email*</label>
                <input type="email" id="email" name="email" required>
                
                <label for="phone">Телефон*</label>
                <input type="tel" id="phone" name="phone" required placeholder="+7 (___) ___-__-__">
                
                <h2>Загрузите ваши документы (не обязательно, но ускорит процесс оформления)</h2>
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
                
                <label>
                    <input type="checkbox" id="agreement" name="agreement" required>
                    Я согласен с политикой обработки персональных данных
                </label><br>
                <button type="submit">Отправить</button>
            </form>
            <button id="close-page">Закрыть</button>
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
