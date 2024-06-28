<?php

include "../CORS-setup.php";
include "../db.php";

$discipline  = $_GET["name"];

if(isset($discipline)){
$stmt= $con->prepare("SELECT * FROM `editors_list` WHERE `fullname` =?");
if(!$stmt){
    echo $stmt->error;
}
$stmt->bind_param("s", $discipline);

$stmt->execute();
$result = $stmt->get_result();

$disciplines = array();
while($row = $result->fetch_assoc()){
    $disciplines[] = $row;

}

$response = array("status" => "success", "editor" => $disciplines);
echo json_encode($response);
}