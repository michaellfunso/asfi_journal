<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
require_once "exportENV.php";

// $servername = $_ENV['DB_HOST'];
// $username = $_ENV['DB_USER'];
// $password = $_ENV['DB_PASS'];
// $db = $_ENV["DB_NAME"];


$servername = "localhost";
$username = "root";
$password = "";
$db = "wepeugsn_asfi_journal";

// Create connection
$con = mysqli_connect($servername, $username, $password, $db);

// Check connection
if (!$con) {
    die("Connection failed: " . mysqli_connect_error());
}


?>