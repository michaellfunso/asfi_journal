<?php
include "db.php";

$ItemId = $_GET["item_id"];

$stmt = $con->prepare("SELECT * FROM `journals` WHERE `buffer` =?");
if (!$stmt) {
    $response = array('status' => "error", 'message' => "Failed to prepare statement: " . $con->error);
    echo json_encode($resonse);
    // throw new Exception("Failed to prepare statement: " . $con->error);
}

$stmt->bind_param("s", $ItemId);

if (!$stmt->execute()) {
    $response = array('status' => "error", 'message' => "Failed to execute statement Author: " . $stmt->error);
    echo json_encode($resonse);
    // throw new Exception("Failed to execute statement Author: " . $stmt->error);

}else{

$result = $stmt->get_result();

$run_query = $result;
$count = mysqli_num_rows($run_query);

if($count > 0){
    $row = mysqli_fetch_assoc($result);
    $Currentdownloads = $row["downloads_count"];
    $newdownloadCount = $Currentdownloads + 1;

    $stmtdownloads = $con->prepare("UPDATE `journals` SET `downloads_count` = ? WHERE `buffer` =?");
    if (!$stmt) {
        $response = array('status' => "error", 'message' => "Failed to prepare statement: " . $con->error);
        echo json_encode($resonse);
        // throw new Exception("Failed to prepare statement: " . $con->error);
    }
    
    $stmtdownloads->bind_param("is",$newdownloadCount, $ItemId);
    
    if (!$stmtdownloads->execute()) {
        $response = array('status' => "error", 'message' => "Failed to prepare statement: " . $$stmtdownloads->error);
        echo json_encode($resonse);
        throw new Exception("Failed to execute statement Author: " . $stmtdownloads->error);
    }else{

        $response = array('status'=> 'success', 'message' => 'downloadCountUpdated');
        echo json_encode($response);

    }
    
}else{
    $response = array('status'=> 'error', 'message' => 'Item Not Found');
    echo json_encode($response);
}

}