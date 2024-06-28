<?php

include "../CORS-setup.php";
include "../db.php";

$discipline  = $_GET["discipline"];
$field = $_GET["field"];

if(isset($discipline)){
$stmt= $con->prepare("SELECT * FROM `editors_list` WHERE `discipline` =? AND `field` = ?");
if(!$stmt){
    echo $stmt->error;
}
$stmt->bind_param("ss", $discipline, $field);

$stmt->execute();
$result = $stmt->get_result();

$disciplines = array();
while($row = $result->fetch_assoc()){
    $disciplines[] = $row;

}

$response = array("status" => "success", "editors" => $disciplines);
echo json_encode($response);
}