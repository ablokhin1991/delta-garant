document.addEventListener('DOMContentLoaded', () => {
  const sliderContainer = document.getElementById('govclientsSliderContainer');
  const sliderTrack = document.getElementById('govclientsSliderTrack');
  let baseSpeed = 1; // Регулируйте скорость

  // Клонирование элементов
  const originalItems = Array.from(sliderTrack.children);
  const cloneItems = () => {
    originalItems.forEach(item => {
      const clone = item.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      sliderTrack.appendChild(clone);
    });
  };

  cloneItems();
  cloneItems();

  let animationFrame;
  let currentPosition = 0;
  const itemWidth = originalItems[0].offsetWidth +
    parseInt(window.getComputedStyle(originalItems[0]).marginRight);

  const animate = () => {
    currentPosition -= baseSpeed;
    if (-currentPosition >= itemWidth * originalItems.length) {
      currentPosition += itemWidth * originalItems.length;
    }
    sliderTrack.style.transform = `translateX(${currentPosition}px)`;
    animationFrame = requestAnimationFrame(animate);
  };

  const startAnimation = () => {
    if (!animationFrame) animate();
  };

  const stopAnimation = () => {
    cancelAnimationFrame(animationFrame);
    animationFrame = null;
  };

  startAnimation();

  window.addEventListener('resize', () => {
    baseSpeed = window.innerWidth <= 768 ? 0.7 : 1;
  });

  document.addEventListener('visibilitychange', () => {
    document.hidden ? stopAnimation() : startAnimation();
  });
});
