<?php
$apiKey = $_SERVER['HTTP_API_KEY'] ?? null;

if ($apiKey !== 'QWERTY') {
    http_response_code(403); // Forbidden
    echo json_encode(['error' => 'Invalid API key']);
    exit;
}

$spaceXApiUrl = 'https://api.spacexdata.com/v3/capsules';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS'); // Include OPTIONS method
header('Access-Control-Allow-Headers: API_KEY, Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200); // OK
    exit;
}


$response = file_get_contents($spaceXApiUrl);

if ($response === false) {
    http_response_code(500); // Internal Server Error
    echo json_encode(['error' => 'Failed to fetch data from SpaceX API']);
    exit;
}

header('Content-Type: application/json');
echo $response;
