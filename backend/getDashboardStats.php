<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

require_once("db.php");

$response = [
    "files" => 0,
    "users" => 0,
    "pending" => 0
];

// Get number of approved files
$fileQuery = "SELECT COUNT(*) AS total FROM capstones WHERE approved = 1";
$result = $conn->query($fileQuery);
if ($result && $row = $result->fetch_assoc()) {
    $response["files"] = (int)$row["total"];
}

// Get number of users
$userQuery = "SELECT COUNT(*) AS total FROM users";
$result = $conn->query($userQuery);
if ($result && $row = $result->fetch_assoc()) {
    $response["users"] = (int)$row["total"];
}

// Get number of pending capstones
$pendingQuery = "SELECT COUNT(*) AS total FROM capstones WHERE approved = 0";
$result = $conn->query($pendingQuery);
if ($result && $row = $result->fetch_assoc()) {
    $response["pending"] = (int)$row["total"];
}

echo json_encode($response);
?>
