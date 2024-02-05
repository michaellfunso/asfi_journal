<?php
include "db.php";
include "";

$articleBuffer = $_GET["q"];
$articleTitle = $_GET["tite"];

if(isset($articleTitle) && isset($articleBuffer)){
    try {
        $stmt = $con->prepare("SELECT * FROM `journalls` WHERE `buffer` = ? AND manuscript_full_title = ?");
    
        if (!$stmt) {
            throw new Exception("Failed to prepare statement: " . $con->error);
        }
    
        $stmt->bind_param("ss", $articleBuffer, $articleTitle);
    
        if (!$stmt->execute()) {
            throw new Exception("Failed to execute statement: " . $stmt->error);
        }
        $result = $stmt->get_result();
        $response = array('status' => 'error', 'articleData' => "$resullt", 'message' => 'Query Not Set');
        echo json_encode($response);

    } catch (Exception $e) {
        echo "Error: " . $e->getMessage();
    }
    
}else{
    $response = array('status' => 'error', 'articleData' => '[]', 'message' => 'Query Not Set');
    echo json_encode($response);
}