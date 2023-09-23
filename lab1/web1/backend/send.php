<?php
session_start();
if (!isset($_SESSION["results"])) {
    $_SESSION["results"] = array();
}
$response = $_SESSION["results"];

header('Content-Type: application/json');
echo json_encode($response);