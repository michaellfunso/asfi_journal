<?php


$servername = "localhost:3306";
$username = "root";
$password = "r00t";
$db = "asfi_journal";

// $servername = "localhost";
// $username = "bwtedjwe_hotel_administrator";
// $password = "KGb2Ec]ndI&)";
// $db = "bwtedjwe_h0tels";


// Create connection
$con = mysqli_connect($servername, $username, $password,$db);

// Check connection
if (!$con) {
    die("Connection failed: " . mysqli_connect_error());
}


?>