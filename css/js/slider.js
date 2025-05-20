const container = document.getElementById('sliderContainer');
const track = document.getElementById('sliderTrack');
let speed = 1; // px/frame

function cloneItemsUntilFilled() {
  const items = Array.from(track.children);
  let totalWidth = track.scrollWidth;
  const containerWidth = container.offsetWidth;

  while (totalWidth < containerWidth * 2) {
    items.forEach(item => {
      const clone = item.cloneNode(true);
      clone.classList.add('clone');
      track.appendChild(clone);
    });
    totalWidth = track.scrollWidth;
  }
}

let pos = 0;

function animate() {
  pos -= speed;
  if (Math.abs(pos) >= track.scrollWidth / 2) {
    pos = 0; // сбросим в начале, потому что 1-я половина = оригинал
  }
  track.style.transform = `translateX(${pos}px)`;
  requestAnimationFrame(animate);
}

// Инициализация
cloneItemsUntilFilled();
requestAnimationFrame(animate);
