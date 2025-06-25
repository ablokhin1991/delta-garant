<?php
header('Content-Type: application/json');

// Получение данных из запроса
$data = json_decode(file_get_contents('php://input'), true);

// Проверка обязательных полей
if (empty($data['fullname']) || empty($data['email']) || empty($data['phone'])) {
    echo json_encode(['success' => false, 'message' => 'Заполните обязательные поля']);
    exit;
}

// Подготовка данных для письма
$to = 'your-email@example.com'; // Замените на ваш email
$subject = 'Новая заявка с сайта';

$message = "<h2>Новая заявка</h2>";
$message .= "<p><strong>ФИО:</strong> " . htmlspecialchars($data['fullname']) . "</p>";
$message .= "<p><strong>Телефон:</strong> " . htmlspecialchars($data['phone']) . "</p>";
$message .= "<p><strong>Email:</strong> " . htmlspecialchars($data['email']) . "</p>";
$message .= "<p><strong>Компания:</strong> " . htmlspecialchars($data['company'] ?? '-') . "</p>";
$message .= "<p><strong>ИНН:</strong> " . htmlspecialchars($data['inn'] ?? '-') . "</p>";
$message .= "<p><strong>Ссылка на конкурс:</strong> " . htmlspecialchars($data['auction_link'] ?? '-') . "</p>";
$message .= "<p><strong>Сумма гарантии:</strong> " . htmlspecialchars($data['guarantee_amount'] ?? '-') . " руб.</p>";
$message .= "<p><strong>Срок гарантии:</strong> " . htmlspecialchars($data['guarantee_days'] ?? '-') . " дней</p>";
$message .= "<p><strong>Тип процедуры:</strong> " . htmlspecialchars($data['procedure_type'] ?? '-') . "</p>";
$message .= "<p><strong>Тип гарантии:</strong> " . htmlspecialchars($data['guarantee_type'] ?? '-') . "</p>";

// Заголовки письма
$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers .= "From: website@yourdomain.com\r\n";
$headers .= "Reply-To: " . $data['email'] . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Отправка письма
if (mail($to, $subject, $message, $headers)) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Ошибка отправки письма']);
}
?>