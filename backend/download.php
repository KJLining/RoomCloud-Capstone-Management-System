<?php
if (!isset($_GET['file'])) {
    http_response_code(400);
    exit("Missing file parameter.");
}

$filename = basename($_GET['file']); // Prevent directory traversal
$filepath = __DIR__ . '/uploads/' . $filename;

if (!file_exists($filepath)) {
    http_response_code(404);
    exit("File not found.");
}

header('Content-Description: File Transfer');
header('Content-Type: application/octet-stream');
header('Content-Disposition: attachment; filename="' . $filename . '"');
header('Content-Length: ' . filesize($filepath));
readfile($filepath);
exit();
?>