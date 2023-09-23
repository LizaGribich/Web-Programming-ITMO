<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
function isInsideArea($x, $y, $r): bool
{
    $x = floatval($x);
    $y = floatval($y);
    $r = floatval($r);
    // Первая четверть
    if ($x <= $r && $y <= $r && $x >= 0 && $y >= 0) {
        return true;
    }
    // Вторая четверть
    if ($y <= $x + $r / 2 && $x <= 0 && $y >= 0) {
        return true;
    }
    // Четвертая четверть
    if (($x * $x + $y * $y <= ($r / 2) * ($r / 2)) && $x >= 0 && $y <= 0) {
        return true;
    }
    return false;
}

function stringNumberCompare($a, $b): int {
    $a_parts = explode('.', $a);
    $b_parts = explode('.', $b);

    if ($a_parts[0] != $b_parts[0]) {
        return $a_parts[0] > $b_parts[0] ? 1 : -1;
    } elseif (isset($a_parts[1]) && isset($b_parts[1])) {
        return strlen($a_parts[1]) > strlen($b_parts[1]) ? 1 : (strlen($a_parts[1]) < strlen($b_parts[1]) ? -1 : strcmp($a_parts[1], $b_parts[1]));
    } elseif (isset($a_parts[1])) {
        return 1;
    } elseif (isset($b_parts[1])) {
        return -1;
    }
    return 0;
}

function validateData($x, $y, $r): bool {
    $validXValues = ["-2", "-1.5", "-1", "-0.5", "0", "0.5", "1", "1.5", "2"];
    $validRValues = ["1", "1.5", "2", "2.5", "3"];

    return in_array($x, $validXValues) &&
        stringNumberCompare($y, "-3") == 1 &&
        stringNumberCompare($y, "5") == -1 &&
        in_array($r, $validRValues);
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
    if (!(is_numeric($x) && is_numeric($y) && is_numeric($R) && validateData($x, $y, $R))) {
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
    echo json_encode(end($response));

} else {
    http_response_code(400);
}