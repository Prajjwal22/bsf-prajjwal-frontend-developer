<?php
// Check if the API key is provided in the request header
$apiKey = $_SERVER['HTTP_API_KEY'] ?? null;

if ($apiKey !== 'QWERTY') {
    http_response_code(403); // Forbidden
    echo json_encode(['error' => 'Invalid API key']);
    exit;
}

// SpaceX API URL
$spaceXApiUrl = 'https://api.spacexdata.com/v3/capsules';

// Set CORS headers to allow requests from http://localhost:8080/
header('Access-Control-Allow-Origin: http://localhost:8080');
header('Access-Control-Allow-Methods: GET, OPTIONS'); // Include OPTIONS method
header('Access-Control-Allow-Headers: API_KEY, Content-Type');

// If it's an OPTIONS request, respond with appropriate headers and exit
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200); // OK
    exit;
}

// Fetch data from SpaceX API
$response = file_get_contents($spaceXApiUrl);

if ($response === false) {
    http_response_code(500); // Internal Server Error
    echo json_encode(['error' => 'Failed to fetch data from SpaceX API']);
    exit;
}

// Set response headers and return the data
header('Content-Type: application/json');
echo $response;
