<?php
// updatePassword.php

ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['userId'], $data['oldPassword'], $data['newPassword'])) {
    echo json_encode(["error" => "Missing required fields"]);
    exit();
}

$userId = $data['userId'];
$oldPassword = $data['oldPassword'];
$newPassword = $data['newPassword'];

$conn = new mysqli("localhost", "root", "", "roomcloud");
if ($conn->connect_error) {
    echo json_encode(["error" => "Database connection failed"]);
    exit();
}

// Get current password
$stmt = $conn->prepare("SELECT password FROM users WHERE id = ?");
$stmt->bind_param("i", $userId);
$stmt->execute();
$stmt->bind_result($hashedPassword);
$stmt->fetch();
$stmt->close();

if (!password_verify($oldPassword, $hashedPassword)) {
    echo json_encode(["error" => "Old password is incorrect"]);
    exit();
}

// Update to new password
$newHashed = password_hash($newPassword, PASSWORD_DEFAULT);
$stmt = $conn->prepare("UPDATE users SET password = ? WHERE id = ?");
$stmt->bind_param("si", $newHashed, $userId);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["error" => "Failed to update password"]);
}

$stmt->close();
$conn->close();

?>