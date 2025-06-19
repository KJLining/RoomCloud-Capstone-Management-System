<?php
require_once 'db.php';

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Check if POST request contains required fields
if (!isset($_POST['username']) || !isset($_POST['password'])) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Missing username or password"]);
    exit();
}

$username = $_POST['username'];
$password = $_POST['password'];

// Corrected: Use `username` instead of `email`, and remove `name` from SELECT
$stmt = $conn->prepare("SELECT id, username, password FROM admin WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
    if (password_verify($password, $row['password'])) {
        // Login successful
        session_start();
        $_SESSION['admin_id'] = $row['id'];
        $_SESSION['admin_username'] = $row['username'];

        echo json_encode([
            "success" => true,
            "adminId" => $row['id'],
            "adminUsername" => $row['username']
        ]);
    } else {
        // Incorrect password
        http_response_code(401);
        echo json_encode(["success" => false, "message" => "Invalid credentials"]);
    }
} else {
    // Admin not found
    http_response_code(404);
    echo json_encode(["success" => false, "message" => "Admin not found"]);
}

$stmt->close();
$conn->close();
?>
