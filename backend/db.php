<?php

require_once "./exportENV.php";

$servername = $_ENV['DB_HOST'];
$username = $_ENV['DB_USER'];
$password = $_ENV['DB_PASS'];
$db = $_ENV["DB_NAME"];


// $servername = "localhost:3306";
// $username = "root";
// $password = "r00t";
// $db = "asfi_journal";

// Create connection
$con = mysqli_connect($servername, $username, $password,$db);

// Check connection
if (!$con) {
    die("Connection failed: " . mysqli_connect_error());
}


?>