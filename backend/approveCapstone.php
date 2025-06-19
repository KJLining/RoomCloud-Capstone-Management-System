<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['capstoneId'])) {
    http_response_code(400);
    echo json_encode(["error" => "Missing capstone id"]);
    exit();
}

$capstoneId = $data['capstoneId'];

$mysqli = new mysqli("localhost", "root", "", "roomcloud");

if ($mysqli->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed"]);
    exit();
}

// Approve capstone
$stmt = $mysqli->prepare("UPDATE capstones SET approved = 1 WHERE id = ?");
$stmt->bind_param("i", $capstoneId);

if (!$stmt->execute()) {
    http_response_code(500);
    echo json_encode(["error" => "Failed to approve capstone"]);
    $stmt->close();
    $mysqli->close();
    exit();
}
$stmt->close();

// Get user_id and title from capstone
$infoStmt = $mysqli->prepare("SELECT user_id, title FROM capstones WHERE id = ?");
$infoStmt->bind_param("i", $capstoneId);
$infoStmt->execute();
$result = $infoStmt->get_result();
$row = $result->fetch_assoc();
$userId = $row['user_id'];
$capstoneTitle = $row['title'];
$infoStmt->close();

// Add notification
$message = "🎉 Your capstone titled '{$capstoneTitle}' has been approved by the admin!";
$timestamp = date("Y-m-d H:i:s");

$notifStmt = $mysqli->prepare("INSERT INTO notifications (user_id, message, created_at) VALUES (?, ?, ?)");
$notifStmt->bind_param("iss", $userId, $message, $timestamp);

if ($notifStmt->execute()) {
    echo json_encode(["success" => true, "notification" => "sent"]);
} else {
    echo json_encode(["success" => true, "notification" => "failed to send"]);
}

$notifStmt->close();
$mysqli->close();
?>
