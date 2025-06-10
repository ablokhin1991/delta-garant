document.addEventListener('DOMContentLoaded', function() {
  const items = document.querySelectorAll('.problems-modern-item');
  const isMobile = window.matchMedia('(max-width: 992px)').matches;
  
  if (!isMobile) return;

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('animate-item');
          observer.unobserve(entry.target);
        }, index * 300); // Задержка между анимациями
      }
    });
  }, {
    threshold: 0.5,
    rootMargin: '0px 0px -50px 0px'
  });

  items.forEach(item => {
    // Добавляем задержку для transition
    item.style.transitionDelay = '0s';
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    
    // Инициализация наблюдения
    observer.observe(item);
  });
});