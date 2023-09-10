<?php
function isInsideArea($x, $y, $r): bool
{
    // Первая четверть
    if ($x <= $r && $y <= $r && $x >= 0 && $y >= 0) {
        return true;
    }
    // Вторая четверть
    if ($y <= $x + $r / 2 && $x <= 0 && $y >= 0) {
        return true;
    }
    // Третья четверть
    if (($x * $x + $y * $y <= ($r / 2) * ($r / 2)) && $x >= 0 && $y <= 0) {
        return true;
    }
    return false;
}

function validateData($x, $y, $r): bool
{
    return (($x == -2 || $x == -1.5 || $x == -1 || $x == -0.5 || $x == 0 || $x == 0.5 || $x == 1 || $x == 1.5 || $x == 2) && ($y >= -3 && $y <= 5) && ($r == 1 || $r == 1.5 || $r == 2 || $r == 2.5 || $r == 3));
}

$start_time = microtime(true);
ini_set('session.gc_maxlifetime', 1800);
session_start();

if (!isset($_SESSION["results"])) {
    $_SESSION["results"] = array();
}

if (isset($_GET['x']) && isset($_GET['y']) && isset($_GET['R'])) {

    $x = $_GET['x'];
    $y = $_GET['y'];
    $R = $_GET['R'];
    if (is_numeric($x) && is_numeric($y) && is_numeric($R) && validateData($x, $y, $R)) {
        $x = floatval($x);
        $y = floatval($y);
        $R = floatval($R);
    } else {
        http_response_code(400);
        die();
    }
    if (isInsideArea($x, $y, $R)) {
        $result = true;
    } else {
        $result = false;
    }
    $end_time = microtime(true);
    $executionTime = ($end_time - $start_time);
    date_default_timezone_set('Europe/Moscow');
    $currentTime = date("Y-m-d H:i:s");

    $_SESSION["results"][] = array(
        'x' => $x,
        'y' => $y,
        'R' => $R,
        'result' => $result,
        'currentTime' => $currentTime,
        'executionTime' => $executionTime,
    );

    $response = $_SESSION["results"];

    header('Content-Type: application/json');
    echo json_encode($response);

} else {
    http_response_code(400);
}