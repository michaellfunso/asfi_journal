<?php

include "../CORS-setup.php";
include "../db.php";

$stmt= $con->prepare("SELECT DISTINCT(`field`) FROM `editors_list` ORDER BY `id` ASC");
if(!$stmt){
    echo $stmt->error;
}

$stmt->execute();
$result = $stmt->get_result();

$Fields = array();
while($row = $result->fetch_assoc()){
    $Fields[] = $row;

}

$response = array("status" => "success", "fields" => $Fields);
echo json_encode($response);