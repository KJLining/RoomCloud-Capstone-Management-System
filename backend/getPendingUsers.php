<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once("db.php");

$sql = "SELECT id, first_name, last_name, year_level, transcript_file 
        FROM users 
        WHERE verification_status = 'pending'";

$result = $conn->query($sql);

$pendingUsers = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $pendingUsers[] = $row;
    }
}

echo json_encode($pendingUsers);
$conn->close();
?>
