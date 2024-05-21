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
    $CurrentViews = $row["views_count"];
    $newViewCount = $CurrentViews + 1;

    $stmtViews = $con->prepare("UPDATE `journals` SET `views_count` = ? WHERE `buffer` =?");
    if (!$stmt) {
        $response = array('status' => "error", 'message' => "Failed to prepare statement: " . $con->error);
        echo json_encode($resonse);
        // throw new Exception("Failed to prepare statement: " . $con->error);
    }
    
    $stmtViews->bind_param("is",$newViewCount, $ItemId);
    
    if (!$stmtViews->execute()) {
        $response = array('status' => "error", 'message' => "Failed to prepare statement: " . $$stmtViews->error);
        echo json_encode($resonse);
        throw new Exception("Failed to execute statement Author: " . $stmtViews->error);
    }else{

        $response = array('status'=> 'success', 'message' => 'ViewCountUpdated');
        echo json_encode($response);

    }
    
}else{
    $response = array('status'=> 'error', 'message' => 'Item Not Found');
    echo json_encode($response);
}

}