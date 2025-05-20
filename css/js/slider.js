window.addEventListener('load', () => {
  const container = document.getElementById('sliderContainer');
  const track = document.getElementById('sliderTrack');
  const speed = 1;
  let animationFrameId;
  let originalItems = Array.from(track.children);
  
  // 1. Клонируем элементы для бесшовности
  const cloneItems = () => {
    // Клонируем все элементы дважды
    const clonesStart = originalItems.map(item => {
      const clone = item.cloneNode(true);
      clone.classList.add('clone');
      return clone;
    });
    
    const clonesEnd = originalItems.map(item => {
      const clone = item.cloneNode(true);
      clone.classList.add('clone');
      return clone;
    });

    track.prepend(...clonesStart);
    track.append(...clonesEnd);
  }

  // 2. Запускаем анимацию
  const animate = () => {
    const trackWidth = track.scrollWidth / 2; // Реальная ширина оригинальных элементов
    const containerWidth = container.offsetWidth;
    
    track.style.transform = `translateX(${-trackWidth}px)`;
    
    let pos = -trackWidth;
    
    const step = () => {
      pos += speed;
      
      // Плавный сброс позиции при достижении границы
      if (pos >= 0) {
        pos = -trackWidth;
      }
      
      track.style.transform = `translateX(${pos}px)`;
      animationFrameId = requestAnimationFrame(step);
    }
    
    animationFrameId = requestAnimationFrame(step);
  }

  // 3. Инициализация
  const init = () => {
    cloneItems();
    animate();
  }

  // Запускаем инициализацию
  init();

  // Очистка при размонтировании
  window.addEventListener('beforeunload', () => {
    cancelAnimationFrame(animationFrameId);
  });
});