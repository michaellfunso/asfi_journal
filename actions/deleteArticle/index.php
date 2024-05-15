<?php

include "../../backend/db.php";

$article_id = $_POST["article_id"];

if($article_id){
    try{
        $stmt = $con->prepare("DELETE FROM `journals` WHERE `buffer` = ?");
    
        if (!$stmt) {
            throw new Exception("Failed to prepare statement: " . $con->error);
        }
    
        $stmt->bind_param("s", $article_id);
    
        if (!$stmt->execute()) {
            throw new Exception("Failed to execute statement: " . $stmt->error);
        }else{
            $response = array("status" => 'success', "message" => "Item Deleted Successfully");
            echo Json_encode($response);
            header("Location:https://asfirj.org/manuscriptPortal/manage");
        }
    }
 catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}

}else{
$response = array('status' => 'error', 'articleData' => '[]', 'message' => 'Query Not Set');
echo json_encode($response);
}