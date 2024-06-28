<?php

include "../CORS-setup.php";
include "../db.php";

$field  = $_GET["field"];

if(isset($field)){
$stmt= $con->prepare("SELECT DISTINCT(`discipline`) FROM `editors_list` WHERE `field` =?");
if(!$stmt){
    echo $stmt->error;
}
$stmt->bind_param("s", $field);

$stmt->execute();
$result = $stmt->get_result();

$Fields = array();
while($row = $result->fetch_assoc()){
    $Fields[] = $row;

}

$response = array("status" => "success", "discipline" => $Fields);
echo json_encode($response);
}