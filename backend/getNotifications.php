<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET");

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(["error" => "Only GET requests are allowed."]);
    exit();
}

require_once("db.php");

$userId = $_GET['userId'] ?? null;

if (!$userId) {
    http_response_code(400);
    echo json_encode(["error" => "Missing userId"]);
    exit();
}

try {
    $stmt = $conn->prepare("SELECT id, message, created_at FROM notifications WHERE user_id = ? ORDER BY created_at DESC");
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $result = $stmt->get_result();

    $notifications = [];
    while ($row = $result->fetch_assoc()) {
        $notifications[] = $row;
    }

    echo json_encode($notifications);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Failed to fetch notifications."]);
}
?>