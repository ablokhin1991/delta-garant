
  const container = document.getElementById('sliderContainer');
  const track = document.getElementById('sliderTrack');

  // Клонируем контент для создания бесшовной петли
  let clonesWidth = 0;
  let scrollPos = 0;
  const speed = 1;

  function cloneSlides() {
    const slides = track.children;
    const total = slides.length;
    for (let i = 0; i < total; i++) {
      const clone = slides[i].cloneNode(true);
      clone.classList.add('clone');
      track.appendChild(clone);
    }
  }

  function getClonesWidth() {
    const clones = track.querySelectorAll('.clone');
    let width = 0;
    clones.forEach(clone => width += clone.offsetWidth + 30); // gap=30px
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

  // Инициализация
  cloneSlides();
  clonesWidth = getClonesWidth();
  requestAnimationFrame(scrollLoop);
