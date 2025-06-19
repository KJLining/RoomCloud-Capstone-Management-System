<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Only POST requests are allowed."]);
    exit();
}

require_once("db.php");

$userId = $_POST['userId'] ?? null;

if (!$userId || !isset($_FILES['transcript'])) {
    http_response_code(400);
    echo json_encode(["error" => "Missing userId or file."]);
    exit();
}

$uploadDir = "transcripts/";
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

$fileName = basename($_FILES["transcript"]["name"]);
$targetFilePath = $uploadDir . time() . "_" . $fileName;
$fileType = strtolower(pathinfo($targetFilePath, PATHINFO_EXTENSION));

$allowedTypes = ['pdf', 'jpg', 'jpeg', 'png'];

if (!in_array($fileType, $allowedTypes)) {
    http_response_code(400);
    echo json_encode(["error" => "Only PDF, JPG, JPEG, PNG files are allowed."]);
    exit();
}

if (move_uploaded_file($_FILES["transcript"]["tmp_name"], $targetFilePath)) {
    $stmt = $conn->prepare("UPDATE users SET verification_status = 'pending', transcript_file = ? WHERE id = ?");
    $stmt->bind_param("si", $targetFilePath, $userId);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Verification request submitted."]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Database update failed."]);
    }
} else {
    http_response_code(500);
    echo json_encode(["error" => "Failed to move uploaded file."]);
}
?>

