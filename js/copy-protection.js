// Обработчики событий
function handleCopy(e) {
  e.preventDefault();
}

function handleContextMenu(e) {
  e.preventDefault();
}

// Функция для управления защитой копирования
function toggleCopyProtection(enable) {
  if (enable) {
    document.addEventListener('copy', handleCopy);
    document.addEventListener('contextmenu', handleContextMenu);
    console.log('Защита копирования ВКЛЮЧЕНА');
  } else {
    document.removeEventListener('copy', handleCopy);
    document.removeEventListener('contextmenu', handleContextMenu);
    console.log('Защита копирования ВЫКЛЮЧЕНА');
  }
}

// Включаем защиту по умолчанию (отключить false)
toggleCopyProtection(true);
