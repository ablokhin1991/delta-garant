// Подключение Lottie Web — без использования import
// Убедись, что lottie.min.js уже подключён в HTML ДО этого скрипта

const services = [
  {
    id: 'lottie1',
    path: 'css/json/animated-icons/Red-and-blue-medal.json'
  },
  {
    id: 'lottie2',
    path: 'css/json/animated-icons/wired-flat-497-truck-delivery-hover-pinch.json' // 🔧 Заменить позже
  },
  {
    id: 'lottie3',
    path: 'css/json/animated-icons/wired-flat-298-coins-hover-jump.json' // 🔧 Заменить позже
  },
  {
    id: 'lottie4',
    path: 'css/json/animated-icons/wired-flat-966-privacy-policy-hover-swipe.json' // 🔧 Заменить позже
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
