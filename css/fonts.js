// Функция для динамической загрузки шрифтов
function loadFonts() {
    const robotoLink = document.createElement('link');
    robotoLink.rel = 'stylesheet';
    robotoLink.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap';

    document.head.appendChild(robotoLink);
}

// Вызов функции для подключения шрифтов
loadFonts();
