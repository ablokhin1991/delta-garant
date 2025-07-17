const services = [
  {
    id: 'lottie1',
    path: 'css/json/animated-icons/First-Place.json'
  },
  {
    id: 'lottie2',
    path: 'css/json/animated-icons/Contract.json' 
  },
  {
    id: 'lottie3',
    path: 'css/json/animated-icons/Advance.json' 
  },
  {
    id: 'lottie4',
    path: 'css/json/animated-icons/Warranty.json' 
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

  let isReady = false;

  anim.addEventListener('DOMLoaded', () => {
    // ждем полной загрузки — totalFrames будет доступен
    isReady = true;
    anim.goToAndStop(anim.totalFrames - 1, true); // показать последний кадр по умолчанию
  });

  const card = document.querySelector(`[data-lottie-id="${service.id}"]`);

  if (!card) {
    console.warn(`Не найдена карточка с data-lottie-id="${service.id}"`);
    return;
  }

  card.addEventListener('mouseenter', () => {
    if (isReady) {
      anim.goToAndPlay(0, true); // проигрываем с начала
    }
  });

  card.addEventListener('mouseleave', () => {
    if (isReady) {
      anim.goToAndStop(anim.totalFrames - 1, true); // возвращаемся на последний кадр
    }
  });
});


