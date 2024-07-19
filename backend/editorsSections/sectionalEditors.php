<?php

include "../CORS-setup.php";
include "../db.php";

// $discipline  = $_GET["discipline"];
$field = $_GET["field"];

if(isset($field)){
$stmt= $con->prepare("SELECT * FROM `editors_list` WHERE `field` = ?");
if(!$stmt){
    echo $stmt->error;
}
$stmt->bind_param("s", $field);

$stmt->execute();
$result = $stmt->get_result();

$editors = array();
while($row = $result->fetch_assoc()){
    $editors[] = $row;
}

$response = array("status" => "success", "editors" => $editors);
echo json_encode($response);
}