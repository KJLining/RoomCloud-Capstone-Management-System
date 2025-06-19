<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once("db.php");

$sql = "SELECT id, first_name, last_name, email, year_level FROM users ORDER BY last_name";

$result = $conn->query($sql);
$users = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
}

echo json_encode($users);
?>