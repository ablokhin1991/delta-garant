window.addEventListener('load', () => {
  const container = document.getElementById('sliderContainer');
  const track = document.getElementById('sliderTrack');
  const speed = 1;

  let originalWidth = 0;
  let pos = 0;

  // Шаг 1: Получаем оригинальные элементы (до клонирования)
  const originals = Array.from(track.children);
  const originalItems = originals.slice(); // копия для клонирования

  // Шаг 2: Клонируем, пока не перекроем 2× ширину контейнера
  function cloneItemsUntilFilled() {
    originalWidth = track.scrollWidth;

    while (track.scrollWidth < container.offsetWidth * 2) {
      originalItems.forEach(item => {
        const clone = item.cloneNode(true);
        clone.classList.add('clone');
        track.appendChild(clone);
      });
    }

    originalWidth = originalWidth; // сохранить ширину оригиналов как точку сброса
  }

  // Шаг 3: Запускаем анимацию
  function animate() {
    pos -= speed;
    if (Math.abs(pos) >= originalWidth) {
      pos = 0; // Сброс ровно после оригинальных слайдов
    }
    track.style.transform = `translateX(${pos}px)`;
    requestAnimationFrame(animate);
  }

  cloneItemsUntilFilled();
  requestAnimationFrame(animate);
});
