document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.querySelector(".offer__overlay");

  document.body.addEventListener("click", (event) => {
    if (event.target.classList.contains("offer__button")) {
      const offerElement = event.target.closest(".offer");
      if (offerElement) {
        showPopupEffect(offerElement, overlay);
      }
    }

    if (event.target.classList.contains("offer__close") || event.target.classList.contains("offer__overlay")) {
      const activeOffer = document.querySelector(".offer--active");
      if (activeOffer) {
        hidePopupEffect(activeOffer, overlay);
      }
    }
  });
});

function showPopupEffect(offerElement, overlay) {
  overlay.classList.add("offer__overlay--active"); // Показать затемнение

  const offerRect = offerElement.getBoundingClientRect();
  offerElement.dataset.originalStyles = JSON.stringify({
    position: offerElement.style.position || "",
    top: offerElement.style.top || "",
    left: offerElement.style.left || "",
    width: offerElement.style.width || "",
    height: offerElement.style.height || "",
    zIndex: offerElement.style.zIndex || "",
    transform: offerElement.style.transform || "",
    boxShadow: offerElement.style.boxShadow || "",
    borderRadius: offerElement.style.borderRadius || "",
  });

  offerElement.style.position = "fixed";
  offerElement.style.top = `${offerRect.top}px`;
  offerElement.style.left = `${offerRect.left}px`;
  offerElement.style.width = `${offerRect.width}px`;
  offerElement.style.height = `${offerRect.height}px`;
  offerElement.style.zIndex = "2";
  offerElement.style.transition = "all 0.4s ease-in-out";
  offerElement.classList.add("offer--active");

  setTimeout(() => {
    offerElement.style.transform = "translate(-50%, -50%) scale(1.2)";
    offerElement.style.top = "50%";
    offerElement.style.left = "50%";
    offerElement.style.width = "80%";
    offerElement.style.height = "auto";
    offerElement.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.3)";
    offerElement.style.borderRadius = "10px";
  }, 0);

  const closeButton = document.createElement("button");
  closeButton.textContent = "Закрыть";
  closeButton.classList.add("offer__close");
  closeButton.style.cssText = `
    position: absolute;
    top: 10px;
    right: 10px;
    background: #ff4d4d;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 5px 10px;
    cursor: pointer;
    font-size: 14px;
  `;
  offerElement.appendChild(closeButton);
}

function hidePopupEffect(offerElement, overlay) {
  overlay.classList.remove("offer__overlay--active"); // Скрыть затемнение

  const originalStyles = JSON.parse(offerElement.dataset.originalStyles);
  Object.keys(originalStyles).forEach((key) => {
    offerElement.style[key] = originalStyles[key];
  });

  offerElement.style.boxShadow = "";
  offerElement.style.transform = "";
  offerElement.style.borderRadius = "";
  offerElement.style.transition = "all 0.4s ease-in-out";

  offerElement.classList.remove("offer--active");

  setTimeout(() => {
    const closeButton = offerElement.querySelector(".offer__close");
    if (closeButton) closeButton.remove();
  }, 400);
}
