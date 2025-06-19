<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

// Validate input
if (!$data || !isset($data['email']) || !isset($data['password'])) {
    echo json_encode(["success" => false, "error" => "Invalid input"]);
    exit();
}

// Connect to database
$host = 'localhost';
$db = 'roomcloud';
$user = 'root';
$pass = '';
$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed"]);
    exit();
}

// Validate fields
$requiredFields = ['firstName', 'lastName', 'course', 'sex', 'yearLevel', 'studentNumber', 'email', 'password'];
foreach ($requiredFields as $field) {
    if (empty($data[$field])) {
        http_response_code(400);
        echo json_encode(["error" => "Missing required field: $field"]);
        exit();
    }
}

$firstName = $conn->real_escape_string($data['firstName']);
$lastName = $conn->real_escape_string($data['lastName']);
$course = $conn->real_escape_string($data['course']);
$sex = $conn->real_escape_string($data['sex']);
$yearLevel = $conn->real_escape_string($data['yearLevel']);
$studentNumber = $conn->real_escape_string($data['studentNumber']);
$email = $conn->real_escape_string($data['email']);
$password = password_hash($data['password'], PASSWORD_DEFAULT);

// Check if email or student number already exists
$checkSql = "SELECT id FROM users WHERE email = ? OR student_number = ?";
$stmt = $conn->prepare($checkSql);
$stmt->bind_param("ss", $email, $studentNumber);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    http_response_code(409);
    echo json_encode(["error" => "Email or student number already registered"]);
    $stmt->close();
    $conn->close();
    exit();
}
$stmt->close();

// Insert user
$sql = "INSERT INTO users (first_name, last_name, course, sex, year_level, student_number, email, password, verification_status) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'unverified')";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ssssssss", $firstName, $lastName, $course, $sex, $yearLevel, $studentNumber, $email, $password);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Failed to register user"]);
}

$stmt->close();
$conn->close();
?>
