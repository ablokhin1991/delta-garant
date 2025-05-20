const container = document.getElementById('sliderContainer');
const track = document.getElementById('sliderTrack');

let clonesWidth = 0;
let scrollPos = 0;
const speed = 1;

function cloneSlides() {
  const slides = Array.from(track.children);
  slides.forEach(slide => {
    const clone = slide.cloneNode(true);
    clone.classList.add('clone');
    track.appendChild(clone);
  });
}

function getClonesWidth() {
  const clones = track.querySelectorAll('.clone');
  let width = 0;
  clones.forEach(clone => {
    const style = getComputedStyle(clone);
    const marginRight = parseInt(style.marginRight) || 0;
    width += clone.offsetWidth + marginRight;
  });
  return width;
}

function scrollLoop() {
  scrollPos += speed;
  if (scrollPos >= clonesWidth) {
    scrollPos = 0;
  }
  track.style.transform = `translateX(-${scrollPos}px)`;
  requestAnimationFrame(scrollLoop);
}

// Инициализация с ожиданием рендера
cloneSlides();

requestAnimationFrame(() => {
  clonesWidth = getClonesWidth();
  requestAnimationFrame(scrollLoop);
});
