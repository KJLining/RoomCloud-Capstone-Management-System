<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET");

$host = "localhost";
$username = "root";
$password = "";
$dbname = "roomcloud";

// Connect to MySQL
$conn = new mysqli($host, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  http_response_code(500);
  echo json_encode(["error" => "Database connection failed: " . $conn->connect_error]);
  exit();
}

// Check if ID is passed
if (!isset($_GET["id"])) {
  http_response_code(400);
  echo json_encode(["error" => "Missing user ID"]);
  exit();
}

$id = intval($_GET["id"]);

$stmt = $conn->prepare("SELECT id, first_name, last_name, email, verification_status FROM users WHERE id = ?");
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
  http_response_code(404);
  echo json_encode(["error" => "User not found"]);
} else {
  $user = $result->fetch_assoc();
  // Combine first_name and last_name for convenience
  $user["name"] = $user["first_name"] . " " . $user["last_name"];
  echo json_encode($user);
}

$stmt->close();
$conn->close();
?>
