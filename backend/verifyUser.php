<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require_once("db.php");

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->userId)) {
    http_response_code(400);
    echo json_encode(["error" => "User ID missing"]);
    exit;
}

$stmt = $conn->prepare("UPDATE users SET verification_status = 'verified' WHERE id = ?");
$stmt->bind_param("i", $data->userId);

if ($stmt->execute()) {
    echo json_encode(["message" => "User verified successfully"]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Failed to verify user"]);
}

$stmt->close();
?>