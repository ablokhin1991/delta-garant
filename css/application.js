const DROPBOX_ACCESS_TOKEN = "dropbox-3715e991647962423764cc";

document.addEventListener("DOMContentLoaded", () => {
  // Заполняем параметры заявки из URL
  const urlParams = new URLSearchParams(window.location.search);
  document.getElementById("bank-name").value = urlParams.get("bankName");
  document.getElementById("guarantee-sum").value = urlParams.get("guaranteeSum");
  document.getElementById("guarantee-days").value = urlParams.get("guaranteeDays");
  document.getElementById("procedure-type").value = urlParams.get("procedureType");
  document.getElementById("guarantee-type").value = urlParams.get("guaranteeType");
  document.getElementById("has-advance").value = urlParams.get("hasAdvance") === "yes" ? "Да" : "Нет";
  document.getElementById("custom-form").value = urlParams.get("customForm") === "yes" ? "Да" : "Нет";

  const form = document.getElementById("application-form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);

    // Сохраняем файлы в Dropbox
    const uploadedFiles = [];
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        const response = await uploadFileToDropbox(key, value);
        uploadedFiles.push(response.link); // Сохраняем ссылку на файл
      }
    }

    // Собираем данные для отправки
    const emailData = {
      "contact-name": formData.get("contact-name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      "bank-name": formData.get("bank-name"),
      "guarantee-sum": formData.get("guarantee-sum"),
      "guarantee-days": formData.get("guarantee-days"),
      "procedure-type": formData.get("procedure-type"),
      "guarantee-type": formData.get("guarantee-type"),
      "has-advance": formData.get("has-advance"),
      "custom-form": formData.get("custom-form"),
      "uploaded-files": uploadedFiles.join(", "),
    };

    // Отправляем данные на почту
    await sendEmail(emailData);
    alert("Заявка отправлена!");
  });
});

// Функция загрузки файла в Dropbox
async function uploadFileToDropbox(filename, file) {
  const response = await fetch("https://content.dropboxapi.com/2/files/upload", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${DROPBOX_ACCESS_TOKEN}`,
      "Content-Type": "application/octet-stream",
      "Dropbox-API-Arg": JSON.stringify({
        path: `/applications/${filename}`,
        mode: "add",
        autorename: true,
      }),
    },
    body: file,
  });

  if (!response.ok) throw new Error("Ошибка загрузки файла в Dropbox");

  const fileData = await response.json();

  // Генерация общей ссылки на файл
  const linkResponse = await fetch("https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${DROPBOX_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      path: fileData.path_lower,
      settings: { requested_visibility: "public" },
    }),
  });

  if (!linkResponse.ok) throw new Error("Ошибка создания ссылки на файл");

  return await linkResponse.json();
}

// Функция отправки данных на почту
async function sendEmail(data) {
  const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error("Ошибка отправки данных на почту");
}
