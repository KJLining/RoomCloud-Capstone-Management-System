<?php
// addNotification.php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['userId'], $data['message'])) {
    echo json_encode(["error" => "Missing userId or message"]);
    exit();
}

$userId = $data['userId'];
$message = $data['message'];
$timestamp = date("Y-m-d H:i:s");

$conn = new mysqli("localhost", "root", "", "roomcloud");

if ($conn->connect_error) {
    echo json_encode(["error" => "Connection failed"]);
    exit();
}

$stmt = $conn->prepare("INSERT INTO notifications (user_id, message, created_at) VALUES (?, ?, ?)");
$stmt->bind_param("iss", $userId, $message, $timestamp);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["error" => "Failed to insert notification"]);
}

$stmt->close();
$conn->close();

?>