<?php
include "./db.php";
include "./CORS-setup.php";
session_start();

$article_id = $_GET["articleID"];

try {
    $stmt = $con->prepare("SELECT * FROM `authors` WHERE article_id =? ORDER BY `id` ASC");

    if (!$stmt) {
        throw new Exception("Failed to prepare statement: " . $con->error);
    }

    $stmt->bind_param("s", $article_id);

    if (!$stmt->execute()) {
        throw new Exception("Failed to execute statement: " . $stmt->error);
    }
    
    $result = $stmt->get_result();
    // $run_query = mysqli_query($con,$sql);
    $run_query = $result;    
    $count = mysqli_num_rows($run_query);

    if($count > 0){
 
        $authorsList = array(); // Initialize an array to store all articles
        
        while ($row = $result->fetch_assoc()) {
            // Loop through each row in the result set and append it to the authorsList array
            $authorsList[] = $row;
        }
        
        $response = array('status' => 'success', 'authorsList' => $authorsList);
        echo json_encode($response);
    }else{
        $response = array('status'=> 'success', 'authorsList' => []);
    echo json_encode($response);
    }
    
} catch (Exception $e) {

    $response = array('status'=> 'internalError', 'message' => "Error: " . $e->getMessage(), 'authorsList' => []);
    echo json_encode($response);
}


?>