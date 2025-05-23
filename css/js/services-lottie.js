// Подключи lottie-web
import lottie from 'https://cdn.jsdelivr.net/npm/lottie-web@5.10.2/build/player/lottie.min.js';

const services = [
  { id: 'lottie1' },
  { id: 'lottie2' },
  { id: 'lottie3' },
  { id: 'lottie4' }
];

// Путь к JSON-анимации
const animationPath = 'css/json/animated-icons/wired-flat-1780-medal-first-place-hover-pinch.json';

services.forEach(service => {
  const container = document.getElementById(service.id);

  const anim = lottie.loadAnimation({
    container,
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: animationPath
  });

  // Храним ссылку на анимацию, чтобы перезапускать
  service.animation = anim;

  // При загрузке показываем только первый кадр
  anim.addEventListener('DOMLoaded', () => {
    anim.goToAndStop(0, true);
  });

  // Найдём родительскую карточку
  const card = document.querySelector(`[data-lottie-id="${service.id}"]`);

  card.addEventListener('mouseenter', () => {
    anim.goToAndPlay(0, true);
  });

  card.addEventListener('mouseleave', () => {
    anim.goToAndStop(0, true);
  });
});
