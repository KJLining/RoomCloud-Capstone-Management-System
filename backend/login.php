<?php
// login.php

ini_set('display_errors', 1);
error_reporting(E_ALL);

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

$input = json_decode(file_get_contents("php://input"), true);

if (!$input || !isset($input['email']) || !isset($input['password'])) {
    http_response_code(400);
    echo json_encode(["error" => "Missing email or password"]);
    exit();
}

$email = $input['email'];
$password = $input['password'];

$servername = "localhost";
$username = "root";
$db_password = ""; // change if you set a MySQL password
$dbname = "roomcloud";

$conn = new mysqli($servername, $username, $db_password, $dbname);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed"]);
    exit();
}

// Select all necessary fields
$stmt = $conn->prepare("SELECT id, first_name, last_name, email, password, student_number, course, year_level, sex, profile_pic FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    http_response_code(401);
    echo json_encode(["error" => "Invalid email or password"]);
    exit();
}

$row = $result->fetch_assoc();

// Use password_verify for hashed passwords
if (!password_verify($password, $row['password'])) {
    http_response_code(401);
    echo json_encode(["error" => "Invalid email or password"]);
    exit();
}

// Construct a clean user object
$user = [
    "id" => $row["id"],
    "email" => $row["email"],
    "name" => $row["first_name"] . " " . $row["last_name"],
    "student_number" => $row["student_number"],
    "course" => $row["course"],
    "year_level" => $row["year_level"],
    "sex" => $row["sex"],
    "profile_pic" => $row["profile_pic"]
];

echo json_encode(["success" => true, "user" => $user]);

$conn->close();
?>
