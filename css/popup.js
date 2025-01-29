document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.querySelector(".offer__overlay");
  const offerList = document.getElementById("offer-list");

  document.body.addEventListener("click", (event) => {
    if (event.target.classList.contains("offer__button")) {
      const offerElement = event.target.closest(".offer");
      if (offerElement) {
        showPopupEffect(offerElement, overlay, offerList);
      }
    }

    if (event.target.classList.contains("offer__close") || event.target.classList.contains("offer__overlay")) {
      const activeOffer = document.querySelector(".offer--active");
      if (activeOffer) {
        hidePopupEffect(activeOffer, overlay, offerList);
      }
    }
  });
});

function showPopupEffect(offerElement, overlay, offerList) {
  overlay.classList.add("offer__overlay--active");

  const offerRect = offerElement.getBoundingClientRect();
  offerElement.dataset.originalPosition = JSON.stringify({
    top: offerRect.top + window.scrollY,
    left: offerRect.left,
    width: offerRect.width,
    height: offerRect.height
  });

  // Устанавливаем фиксированное положение
  offerElement.style.position = "fixed";
  offerElement.style.top = `${offerRect.top}px`;
  offerElement.style.left = `${offerRect.left}px`;
  offerElement.style.width = `${offerRect.width}px`;
  offerElement.style.height = `${offerRect.height}px`;
  offerElement.style.zIndex = "1000";
  offerElement.style.transition = "all 0.4s ease-in-out";
  offerElement.classList.add("offer--active");

  // Всплытие оффера
  setTimeout(() => {
    offerElement.style.transform = "translate(-50%, -50%) scale(1.2)";
    offerElement.style.top = "50%";
    offerElement.style.left = "50%";
    offerElement.style.width = "80%";
    offerElement.style.height = "500px"; // Увеличиваем высоту
    offerElement.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.3)";
    offerElement.style.borderRadius = "10px";
  }, 0);

  offerList.classList.add("offer-list--adjust");
}

function hidePopupEffect(offerElement, overlay, offerList) {
  overlay.classList.remove("offer__overlay--active");

  const originalPosition = JSON.parse(offerElement.dataset.originalPosition);

  // Плавное опускание обратно
  offerElement.style.transform = "translate(0, 0) scale(1)";
  offerElement.style.top = `${originalPosition.top}px`;
  offerElement.style.left = `${originalPosition.left}px`;
  offerElement.style.width = `${originalPosition.width}px`;
  offerElement.style.height = `${originalPosition.height}px`;
  offerElement.style.transition = "all 0.5s ease-in-out";

  setTimeout(() => {
    offerElement.classList.remove("offer--active");

    offerElement.style.position = "";
    offerElement.style.top = "";
    offerElement.style.left = "";
    offerElement.style.width = "";
    offerElement.style.height = "";
    offerElement.style.zIndex = "";
    offerElement.style.boxShadow = "";
    offerElement.style.borderRadius = "";
    offerElement.style.transition = "";

    offerList.classList.remove("offer-list--adjust");

    const closeButton = offerElement.querySelector(".offer__close");
    if (closeButton) closeButton.remove();
  }, 500);
}
