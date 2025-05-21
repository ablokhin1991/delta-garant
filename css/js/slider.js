document.addEventListener('DOMContentLoaded', () => {
  const sliderContainer = document.getElementById('sliderContainer');
  const sliderTrack = document.getElementById('sliderTrack');
  const baseSpeed = 1; // Регулируйте скорость (1px за кадр)

  // Клонирование элементов для бесконечности
  const originalItems = Array.from(sliderTrack.children);
  const cloneItems = () => {
    originalItems.forEach(item => {
      const clone = item.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      sliderTrack.appendChild(clone);
    });
  };
  
  // Создаем 2 копии для плавности
  cloneItems();
  cloneItems();

  // Настройка анимации
  let animationFrame;
  let currentPosition = 0;
  const itemWidth = originalItems[0].offsetWidth + 
                   parseInt(window.getComputedStyle(originalItems[0]).marginRight);

  const animate = () => {
    currentPosition -= baseSpeed;
    
    // Плавный сброс позиции
    if (-currentPosition >= itemWidth * originalItems.length) {
      currentPosition += itemWidth * originalItems.length;
    }
    
    sliderTrack.style.transform = `translateX(${currentPosition}px)`;
    animationFrame = requestAnimationFrame(animate);
  };

  // Управление анимацией
  const startAnimation = () => {
    if (!animationFrame) animate();
  };

  const stopAnimation = () => {
    cancelAnimationFrame(animationFrame);
    animationFrame = null;
  };

  // События
  //sliderContainer.addEventListener('mouseenter', stopAnimation);
  //sliderContainer.addEventListener('mouseleave', startAnimation);
  
  // Запуск при загрузке
  startAnimation();

  // Оптимизация для мобильных
  window.addEventListener('resize', () => {
    const newSpeed = window.innerWidth <= 768 ? 0.7 : 1;
    baseSpeed = newSpeed;
  });

  // Остановка при скрытии вкладки
  document.addEventListener('visibilitychange', () => {
    document.hidden ? stopAnimation() : startAnimation();
  });
});