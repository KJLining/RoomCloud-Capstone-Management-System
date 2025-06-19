<?php
// getUser.php

header("Access-Control-Allow-Origin: *");

if (!isset($_GET['id'])) {
    echo json_encode(["error" => "Missing user ID"]);
    exit();
}

$userId = $_GET['id'];

$conn = new mysqli("localhost", "root", "", "roomcloud");

if ($conn->connect_error) {
    echo json_encode(["error" => "Connection failed"]);
    exit();
}

$stmt = $conn->prepare("SELECT * FROM users WHERE id = ?");
$stmt->bind_param("i", $userId);
$stmt->execute();

$result = $stmt->get_result();
if ($result->num_rows === 1) {
    echo json_encode($result->fetch_assoc());
} else {
    echo json_encode(["error" => "User not found"]);
}

$stmt->close();
$conn->close();

?>