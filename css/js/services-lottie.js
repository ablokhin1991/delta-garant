const services = [
  {
    id: 'lottie1',
    path: 'css/json/animated-icons/First-Place.json'
  },
  {
    id: 'lottie2',
    path: 'css/json/animated-icons/Truck.json' 
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


anim.addEventListener('DOMLoaded', () => {
  anim.goToAndStop(anim.totalFrames - 1, true); // ❗ Показать последний кадр после загрузки
});

card.addEventListener('mouseleave', () => {
  anim.goToAndStop(anim.totalFrames - 1, true); // ❗ Остановиться на последнем кадре
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
