<?php
// Enable error reporting for development
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Database credentials
$host = 'localhost';
$user = 'root';
$password = '';
$database = 'roomcloud';

// Create connection
$conn = new mysqli($host, $user, $password, $database);

// Check connection
if ($conn->connect_error) {
    http_response_code(500);
    die(json_encode(["error" => "Database connection failed: " . $conn->connect_error]));
}
?>