<?php
// getApprovedCapstones.php

ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$servername = "localhost";
$username = "root";
$password = ""; // Adjust if needed
$dbname = "roomcloud";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed"]);
    exit();
}

// ✅ Keep the full path relative to 'roomcloud'
$sql = "SELECT id, title, 
               file_path AS file_name, 
               uploaded_at AS upload_date, 
               author1 
        FROM capstones 
        WHERE approved = 1 
        ORDER BY uploaded_at DESC";

$result = $conn->query($sql);

if (!$result) {
    http_response_code(500);
    echo json_encode(["error" => "Query failed: " . $conn->error]);
    exit();
}

$capstones = [];

while ($row = $result->fetch_assoc()) {
    $capstones[] = $row;
}

echo json_encode($capstones);
$conn->close();
?>
