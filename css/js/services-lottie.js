// Подключение Lottie Web — без использования import
// Убедись, что lottie.min.js уже подключён в HTML ДО этого скрипта

const services = [
  {
    id: 'lottie1',
    path: 'css/json/animated-icons/wired-flat-1780-medal-first-place-hover-pinch.json'
  },
  {
    id: 'lottie2',
    path: 'css/json/animated-icons/example-icon-2.json' // 🔧 Заменить позже
  },
  {
    id: 'lottie3',
    path: 'css/json/animated-icons/example-icon-3.json' // 🔧 Заменить позже
  },
  {
    id: 'lottie4',
    path: 'css/json/animated-icons/example-icon-4.json' // 🔧 Заменить позже
  }
];

services.forEach(service => {
  const container = document.getElementById(service.id);

  if (!container) {
    console.warn(`Не найден контейнер с id: ${service.id}`);
    return;
  }

  const anim = lottie.loadAnimation({
    container: container,
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: service.path
  });

  // Показываем первый кадр
  anim.addEventListener('DOMLoaded', () => {
    anim.goToAndStop(0, true);
  });

  const card = document.querySelector(`[data-lottie-id="${service.id}"]`);

  if (!card) {
    console.warn(`Не найдена карточка с data-lottie-id="${service.id}"`);
    return;
  }

  card.addEventListener('mouseenter', () => {
    anim.goToAndPlay(0, true);
  });

  card.addEventListener('mouseleave', () => {
    anim.goToAndStop(0, true);
  });
});
