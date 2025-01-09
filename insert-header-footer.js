// Функция для вставки шапки
function loadHeader() {
    fetch('header.html')
        .then(response => response.text())
        .then(html => {
            document.querySelector('body').insertAdjacentHTML('afterbegin', html);
        })
        .catch(err => console.warn('Ошибка загрузки шапки:', err));
}

// Функция для вставки подвала
function loadFooter() {
    fetch('footer.html')
        .then(response => response.text())
        .then(html => {
            document.querySelector('body').insertAdjacentHTML('beforeend', html);
        })
        .catch(err => console.warn('Ошибка загрузки подвала:', err));
}

// Вызов функций
loadHeader();
loadFooter();
