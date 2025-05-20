const container = document.querySelector('.slider-container');
const track = document.querySelector('.slider-track');
const slides = document.querySelectorAll('.slider-item');
const slideCount = slides.length / 2; // половина - оригиналы

let scrollPos = 0;
const speed = 0.5; // px за кадр, можно регулировать

function loopScroll() {
  scrollPos += speed;
  if (scrollPos >= track.scrollWidth / 2) {
    // Когда дошли до середины (конца оригиналов + дубликатов)
    scrollPos = 0; // мгновенно сбрасываем прокрутку
  }
  container.scrollLeft = scrollPos;
  requestAnimationFrame(loopScroll);
}

requestAnimationFrame(loopScroll);
