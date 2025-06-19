<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json");

$host = "localhost";
$db = "roomcloud"; // Change to your actual DB name
$user = "root";
$pass = "";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed: " . $conn->connect_error]);
    exit();
}

if (!isset($_GET['userId'])) {
    http_response_code(400);
    echo json_encode(["error" => "Missing userId parameter"]);
    exit();
}

$userId = $conn->real_escape_string($_GET['userId']);

$sql = "SELECT * FROM capstones WHERE user_id = '$userId' LIMIT 1";
$result = $conn->query($sql);

if ($result && $result->num_rows > 0) {
    $capstone = $result->fetch_assoc();
    echo json_encode($capstone);
} else {
    // No capstone found
    echo json_encode(null);
}

$conn->close();

?>