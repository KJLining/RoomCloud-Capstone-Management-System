<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

$host = "localhost";
$db = "roomcloud";
$user = "root";
$pass = "";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed."]);
    exit();
}

// Handle file upload
if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid file upload."]);
    exit();
}

// Sanitize and collect input
$userId = $_POST['userId'] ?? '';
$title = $_POST['title'] ?? '';
$abstract = $_POST['abstract'] ?? '';
$author1 = $_POST['author1'] ?? '';
$author2 = $_POST['author2'] ?? '';
$author3 = $_POST['author3'] ?? '';

if (empty($userId) || empty($title) || empty($abstract) || empty($author1)) {
    http_response_code(400);
    echo json_encode(["error" => "Missing required fields."]);
    exit();
}

// Move file
$uploadsDir = "uploads/";
if (!is_dir($uploadsDir)) {
    mkdir($uploadsDir, 0777, true);
}

$filename = basename($_FILES["file"]["name"]);
$targetPath = $uploadsDir . time() . "_" . $filename;

if (!move_uploaded_file($_FILES["file"]["tmp_name"], $targetPath)) {
    http_response_code(500);
    echo json_encode(["error" => "Failed to move uploaded file."]);
    exit();
}

// Insert into capstones table
$stmt = $conn->prepare("INSERT INTO capstones (user_id, title, abstract, author1, author2, author3, file_path, approved) VALUES (?, ?, ?, ?, ?, ?, ?, 0)");
$stmt->bind_param("issssss", $userId, $title, $abstract, $author1, $author2, $author3, $targetPath);

if ($stmt->execute()) {
    // ✅ Also update capstone_uploaded to 1
    $updateStmt = $conn->prepare("UPDATE users SET capstone_uploaded = 1 WHERE id = ?");
    $updateStmt->bind_param("i", $userId);
    $updateStmt->execute();
    $updateStmt->close();

    echo json_encode(["success" => true]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Database insert failed."]);
}

$stmt->close();
$conn->close();
?>
