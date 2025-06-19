<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Connect to DB
$conn = new mysqli("localhost", "root", "", "roomcloud");

// Check connection
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// Only fetch approved capstones
$sql = "SELECT id, title, author1, uploaded_at AS upload_date, file_path AS file_name, approved 
        FROM capstones 
        WHERE approved = 1 
        ORDER BY uploaded_at DESC";

$result = $conn->query($sql);

$capstones = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $capstones[] = $row;
    }
}

echo json_encode($capstones);

$conn->close();
?>
