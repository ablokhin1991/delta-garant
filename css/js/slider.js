// JS: бесконечный автоскролл вправо→влево
document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.slider-container');
  const track = document.querySelector('.slider-track');
  const items = document.querySelectorAll('.slider-item');
  const totalItems = items.length;
  const visibleWidth = container.clientWidth;

  // скорость в пикселях за кадр
  const speed = 0.6;
  let offset = 0;

  function step() {
    offset += speed;
    // когда прокрутили ровно половину трека (оригиналы), сбрасываем
    if (offset >= track.scrollWidth / 2) {
      offset = 0;
    }
    // перемещаем трек с помощью transform
    track.style.transform = `translateX(-${offset}px)`;
    requestAnimationFrame(step);
  }

  // старт
  requestAnimationFrame(step);
});
