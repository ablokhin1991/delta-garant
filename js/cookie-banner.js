document.addEventListener("DOMContentLoaded", function() {
  const banner = document.getElementById("cookie-banner");
  const acceptBtn = document.getElementById("cookie-accept");

  if (!localStorage.getItem("cookiesAccepted")) {
    banner.classList.remove("hidden");
  }

  acceptBtn.addEventListener("click", function() {
    localStorage.setItem("cookiesAccepted", "true");
    banner.classList.add("hidden");
  });
});
