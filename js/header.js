document.addEventListener('DOMContentLoaded', function() {
  const burgerCheckbox = document.getElementById('burger-checkbox');
  const overlay = document.querySelector('.overlay');
  
  // Блокировка скролла
  burgerCheckbox.addEventListener('change', function() {
    if (this.checked) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  });
  
  // Закрытие меню по клику на оверлей
  overlay.addEventListener('click', function() {
    burgerCheckbox.checked = false;
    document.body.classList.remove('menu-open');
    document.querySelector('.menu-list').style.transform = 'translateX(100%)';
    this.style.opacity = '0';
    this.style.visibility = 'hidden';
  });
});