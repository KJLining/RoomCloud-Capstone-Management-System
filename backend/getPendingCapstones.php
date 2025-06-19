<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$mysqli = new mysqli("localhost", "root", "", "roomcloud");

if ($mysqli->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Failed to connect to database"]);
    exit();
}

$sql = "SELECT id, user_id, title, abstract, file_path, author1, author2, author3, uploaded_at 
        FROM capstones 
        WHERE approved = 0 
        ORDER BY uploaded_at DESC";

$result = $mysqli->query($sql);

$capstones = [];

while ($row = $result->fetch_assoc()) {
    $capstones[] = $row;
}

echo json_encode($capstones);

$mysqli->close();
?>