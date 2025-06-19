<?php
// addAdmin.php

ini_set('display_errors', 1);
error_reporting(E_ALL);

$servername = "localhost";
$username = "root";
$password = ""; // Update if you use a MySQL password
$dbname = "roomcloud";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $adminUsername = trim($_POST["username"]);
    $adminPassword = password_hash(trim($_POST["password"]), PASSWORD_DEFAULT); // Secure hash

    $stmt = $conn->prepare("INSERT INTO admin (username, password) VALUES (?, ?)");
    $stmt->bind_param("ss", $adminUsername, $adminPassword);

    if ($stmt->execute()) {
        echo "<script>alert('Admin added successfully'); window.location.href = 'addAdmin.html';</script>";
    } else {
        echo "<script>alert('Error: " . $stmt->error . "'); window.history.back();</script>";
    }

    $stmt->close();
}

$conn->close();
?>