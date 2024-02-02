<?php
include "./db.php";
include "./CORS-setup.php";
session_start();

$page = $_GET["page"];
$items_per_page = $_GET["limit"];

$offset = ($page - 1) * $items_per_page;


if(isset($_GET["k"])){
$searchQuery = $_GET["k"];

    try {
        $stmt = $con->prepare("SELECT * FROM `journals` WHERE LOWER(`manuscript_full_title`) LIKE CONCAT('%', LOWER(?), '%') COLLATE utf8mb4_general_ci OR LOWER(`manuscript_running_title`) LIKE CONCAT('%', LOWER(?), '%') COLLATE utf8mb4_general_ci LIMIT ? OFFSET ?");

    
        if (!$stmt) {
            throw new Exception("Failed to prepare statement: " . $con->error);
        }
    
        $stmt->bind_param("ssii",$searchQuery, $searchQuery, $items_per_page, $offset);
    
        if (!$stmt->execute()) {
            throw new Exception("Failed to execute statement: " . $stmt->error);
        }
        
        $result = $stmt->get_result();
        // $run_query = mysqli_query($con,$sql);
        $run_query = $result;    
        $count = mysqli_num_rows($run_query);
    
        if($count > 0){
     
            $articlesList = array(); // Initialize an array to store all articles
            
            while ($row = $result->fetch_assoc()) {
                // Loop through each row in the result set and append it to the articlesList array
                $articlesList[] = $row;
            }
            
            $response = array('status' => 'success', 'articlesList' => $articlesList);
            echo json_encode($response);
        }else{
            $response = array('status'=> 'success', 'articlesList' => []);
        echo json_encode($response);
        }
        
    } catch (Exception $e) {
    
        $response = array('status'=> 'internalError', 'message' => "Error: " . $e->getMessage(), 'articlesList' => []);
        echo json_encode($response);
    }
    
}else{

// LIMIT =? OFFSET = ?
try {
    $stmt = $con->prepare("SELECT * FROM `journals` WHERE 1 LIMIT ? OFFSET ?");

    if (!$stmt) {
        throw new Exception("Failed to prepare statement: " . $con->error);
    }

    $stmt->bind_param("ss", $items_per_page, $offset);

    if (!$stmt->execute()) {
        throw new Exception("Failed to execute statement: " . $stmt->error);
    }
    
    $result = $stmt->get_result();
    // $run_query = mysqli_query($con,$sql);
    $run_query = $result;    
    $count = mysqli_num_rows($run_query);

    if($count > 0){
 
        $articlesList = array(); // Initialize an array to store all articles
        
        while ($row = $result->fetch_assoc()) {
            // Loop through each row in the result set and append it to the articlesList array
            $articlesList[] = $row;
        }
        
        $response = array('status' => 'success', 'articlesList' => $articlesList);
        echo json_encode($response);
    }else{
        $response = array('status'=> 'success', 'articlesList' => []);
    echo json_encode($response);
    }
    
} catch (Exception $e) {

    $response = array('status'=> 'internalError', 'message' => "Error: " . $e->getMessage(), 'articlesList' => []);
    echo json_encode($response);
}
}



?>