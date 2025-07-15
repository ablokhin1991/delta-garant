// popup.js
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  // Создаём overlay и popup-контейнер
  const overlay = document.createElement("div");
  overlay.classList.add("popup-new__overlay");
  const popup = document.createElement("div");
  popup.classList.add("popup-new");

  // Внедряем HTML структуры из popup-order, но меняем правую колонку
  popup.innerHTML = `
    <button class="popup-new__close">✖</button>
    <h2 class="popup-new__title">Возьмем на себя всю рутину:</h2>
    <p class="popup-new__text">Подготовим документы, подадим заявку, договоримся с банками.</p>

    <div class="popup-new__content">
      <!-- Левая колонка остаётся как есть -->
      <form class="popup-new__form" id="order-form">
        <div class="popup-new__columns">
          <div class="popup-new__column">
            <input type="text" placeholder="ФИО *" class="popup-new__input" name="fullname" required>
            <input type="tel" id="popup-new-phone" class="popup-new__input" placeholder="Телефон *" required>
            <input type="email" placeholder="Электронная почта *"
                   class="popup-new__input" name="email" required>
            <input type="text" placeholder="ИНН компании / ИП"
                   class="popup-new__input" name="inn" id="inn-input" list="inn-list">
            <datalist id="inn-list"></datalist>
            <input type="text" placeholder="Название компании"
                   class="popup-new__input" name="company">
          </div>

          <!-- ПРАВАЯ колонка: вставляем .popup-new__offer -->
          <div class="popup-new__column">
            <div class="popup-new__offer">
              <div class="popup-new__logo"></div>
              <div class="popup-new__details"></div>
              <div class="popup-new__separator"></div>
              <div class="popup-new__rate"></div>
            </div>
          </div>
        </div>

        <label class="popup-new__checkbox-label">
          <input type="checkbox" class="popup-new__checkbox" required>
          Согласен с <a href="policy.html" class="popup-new__link">политикой обработки персональных данных</a> *
        </label>
        <button type="submit" class="popup-new__submit">Отправить заявку</button>
        <p class="popup-new__note">
          Или получите консультацию по тел. <a href="tel:+74950712020" class="popup-new__phone-link">+7 (495) 071‑20‑20</a>
        </p>
      </form>
    </div>
  `;

  body.appendChild(overlay);
  body.appendChild(popup);

  // Функции открытия/закрытия
  function openPopup() {
    overlay.classList.add("popup-new__overlay--active");
    popup.classList.add("popup-new--active");
    body.style.overflow = "hidden";
  }
  function closePopup() {
    overlay.classList.remove("popup-new__overlay--active");
    popup.classList.remove("popup-new--active");
    body.style.overflow = "";
  }

  // Наполнение .popup-new__offer из выбранного .offer
  function fillOffer(offerEl) {
    const logoUrl = offerEl.querySelector(".offer__logo").style.backgroundImage;
    const detailsHTML = offerEl.querySelector(".offer__details").innerHTML;
    const rateHTML = offerEl.querySelector(".offer__rate").innerHTML;

    // Удаляем лишние узлы
    const tmp = document.createElement("div");
    tmp.innerHTML = detailsHTML;
    tmp.querySelector(".offer__personal-data")?.remove();

    popup.querySelector(".popup-new__logo").style.backgroundImage = logoUrl;
    popup.querySelector(".popup-new__details").innerHTML = tmp.innerHTML;
    popup.querySelector(".popup-new__rate").innerHTML = rateHTML;
  }

  // Обработчики
  document.body.addEventListener("click", e => {
    if (e.target.classList.contains("order-button")) {
      e.preventDefault();
      const offer = e.target.closest(".offer");
      if (offer) {
        fillOffer(offer);
        openPopup();
      }
    }
    if (e.target.classList.contains("popup-new__close") ||
        e.target === overlay) {
      closePopup();
    }
  });

  // Маска и intl-tel-input (как в popup-order.js)
  const phoneInput = document.querySelector("#popup-new-phone");
  if (phoneInput) {
    const iti = window.intlTelInput(phoneInput, {
      initialCountry: "ru",
      preferredCountries: ["ru","by","kz"],
      separateDialCode: true,
      utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
    });
    phoneInput.placeholder = "(999) 999-99-99";
    phoneInput.addEventListener("countrychange", () => {
      const iso = iti.getSelectedCountryData().iso2;
      phoneInput.placeholder = iso==="ru" ? "(999) 999-99-99" : "Введите номер телефона";
    });
    phoneInput.addEventListener("keypress", e => { if (!/\d/.test(e.key)) e.preventDefault(); });
    phoneInput.addEventListener("input", () => {
      if (iti.getSelectedCountryData().iso2==="ru") {
        let v = phoneInput.value.replace(/\D/g,"").slice(0,10),
            f="";
        if(v.length>0){ f="("+v.slice(0,3);
          if(v.length>=4) f+=") "+v.slice(3,6);
          if(v.length>=7) f+="-"+v.slice(6,8);
          if(v.length>=9) f+="-"+v.slice(8,10);
        }
        phoneInput.value=f;
      }
    });
  }

  // Автоформат суммы (если нужно перенести логику из popup-order.js)
  const amt = document.getElementById("guarantee-amount");
  if (amt) {
    amt.addEventListener("input", function(){
      let num = this.value.replace(/\D/g,"");
      if(num) this.value = parseInt(num,10).toLocaleString("ru-RU");
    });
  }

  // Dadata по ИНН
  (function(){
    const TOKEN="2f5c5383769c2db48f7ff0728ef6ab28f0d88e63",
          innIn = document.getElementById("inn-input"),
          dl = document.getElementById("inn-list"),
          compIn = document.querySelector('input[name="company"]');
    if(!innIn||!dl||!compIn) return;
    function fetchSug(){ 
      const q=innIn.value.replace(/\D/g,"");
      if(q.length<3){ dl.innerHTML=""; return; }
      fetch("https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party", {
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "Accept":"application/json",
          "Authorization":"Token "+TOKEN
        },
        body:JSON.stringify({query:q,count:5})
      }).then(r=>r.ok?r.json():Promise.reject(r.statusText))
        .then(json=>{
          dl.innerHTML="";
          json.suggestions.forEach(i=>{
            const opt=document.createElement("option");
            opt.value=i.data.inn;
            opt.label=`${i.value} — ИНН ${i.data.inn}`;
            dl.appendChild(opt);
          });
        }).catch(()=>{});
    }
    innIn.addEventListener("input", (()=>{ let t; return ()=>{ clearTimeout(t); t=setTimeout(fetchSug,300); }; })() );
    innIn.addEventListener("change",()=>{
      const v=innIn.value.trim();
      const found=[...dl.options].find(o=>o.value===v);
      if(found) compIn.value=found.label.split(" — ИНН")[0];
    });
  })();

  // Валидация формы (email/телефон)
  const form = document.getElementById("order-form");
  if(form && phoneInput){
    form.addEventListener("submit", e => {
      const cleanNum = phoneInput.value.replace(/\D/g,""),
            validPhone = window.intlTelInputGlobals.getInstance(phoneInput).isValidNumber(),
            iso = window.intlTelInputGlobals.getInstance(phoneInput).getSelectedCountryData().iso2;
      if((iso==="ru" && cleanNum.length!==10) || !validPhone){
        alert("Введите корректный телефон");
        e.preventDefault();
        return;
      }
      const mail = form.querySelector('input[type="email"]');
      if(mail){
        const ok = /^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(mail.value);
        if(!ok){ alert("Введите корректный email"); e.preventDefault(); }
      }
    });
  }

});
