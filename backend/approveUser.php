<?php
// CORS Headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// DB connection
$host = 'localhost';
$user = 'root';
$password = '';
$dbname = 'roomcloud';
$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed.']);
    exit();
}

// Parse JSON input
$data = json_decode(file_get_contents("php://input"), true);
if (!isset($data['id'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing id.']);
    exit();
}

$id = intval($data['id']);

// Update user verification status
$updateStmt = $conn->prepare("UPDATE users SET verification_status = 'verified' WHERE id = ?");
$updateStmt->bind_param("i", $id);

if ($updateStmt->execute()) {

    // ✅ Insert a notification into the notifications table
    $message = "✅ Your transcript has been verified and approved by the admin!";
    $timestamp = date("Y-m-d H:i:s");

    $notifStmt = $conn->prepare("INSERT INTO notifications (user_id, message, created_at) VALUES (?, ?, ?)");
    $notifStmt->bind_param("iss", $id, $message, $timestamp);

    if ($notifStmt->execute()) {
        echo json_encode(['success' => true, 'notified' => true]);
    } else {
        echo json_encode(['success' => true, 'notified' => false, 'error' => 'Failed to insert notification.']);
    }

    $notifStmt->close();

} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to approve user.']);
}

$updateStmt->close();
$conn->close();
?>
