<?php
// uploadProfilePic.php

ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$targetDir = "uploads/profile_pics/";
if (!is_dir($targetDir)) {
    mkdir($targetDir, 0777, true);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_FILES['profilePic']) || !isset($_POST['userId'])) {
        echo json_encode(["error" => "Incomplete request"]);
        exit();
    }

    $userId = $_POST['userId'];
    $file = $_FILES['profilePic'];
    $fileName = basename($file['name']);
    $targetFile = $targetDir . time() . "_" . $fileName;

    if (move_uploaded_file($file['tmp_name'], $targetFile)) {
        // Update database
        $conn = new mysqli("localhost", "root", "", "roomcloud");
        if ($conn->connect_error) {
            echo json_encode(["error" => "Database connection failed"]);
            exit();
        }

        $stmt = $conn->prepare("UPDATE users SET profile_pic = ? WHERE id = ?");
        $stmt->bind_param("si", $targetFile, $userId);

        if ($stmt->execute()) {
            echo json_encode(["success" => true, "path" => $targetFile]);
        } else {
            echo json_encode(["error" => "Failed to update profile picture path"]);
        }

        $stmt->close();
        $conn->close();
    } else {
        echo json_encode(["error" => "Failed to upload file"]);
    }
} else {
    http_response_code(405);
    echo json_encode(["error" => "Only POST requests are allowed"]);
}

?>