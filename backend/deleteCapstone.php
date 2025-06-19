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

if (!isset($data['id'])) {
    http_response_code(400);
    echo json_encode(["error" => "Missing capstone id"]);
    exit();
}

$capstoneId = $data['id'];

$mysqli = new mysqli("localhost", "root", "", "roomcloud");

if ($mysqli->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed"]);
    exit();
}

// Optional: Delete the uploaded file from the server
$stmtFile = $mysqli->prepare("SELECT file_path FROM capstones WHERE id = ?");
$stmtFile->bind_param("i", $capstoneId);
$stmtFile->execute();
$stmtFile->bind_result($filePath);
$stmtFile->fetch();
$stmtFile->close();

if ($filePath && file_exists("../roomcloud/" . $filePath)) {
    unlink("../roomcloud/" . $filePath);
}

$stmt = $mysqli->prepare("DELETE FROM capstone_uploads WHERE id = ?");
$stmt->bind_param("i", $capstoneId);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Failed to delete capstone"]);
}

$stmt->close();
$mysqli->close();

?>