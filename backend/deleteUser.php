<?php
include __DIR__.'/db.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
if ($_SERVER['REQUEST_METHOD']==='OPTIONS') exit;

$data = json_decode(file_get_contents("php://input"), true);
$userId = $data['id'] ?? null;
if (!$userId) { http_response_code(400); echo json_encode(["error"=>"Missing id"]); exit; }

$stmt = $conn->prepare("DELETE FROM users WHERE id=?");
$stmt->bind_param("i", $userId);
$stmt->execute();
$stmt->close();

echo json_encode(["success"=>true]);
$conn->close();

?>