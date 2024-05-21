<?php
include "./db.php";

$articleBuffer = $_GET["q"];
$articleTitle = $_GET["title"];

if(isset($articleTitle) && isset($articleBuffer)){
    try {
        $stmt = $con->prepare("SELECT * FROM `journals` WHERE `buffer` = ? AND manuscript_full_title = ?");
    
        if (!$stmt) {
            throw new Exception("Failed to prepare statement: " . $con->error);
        }
    
        $stmt->bind_param("ss", $articleBuffer, $articleTitle);
    
        if (!$stmt->execute()) {
            throw new Exception("Failed to execute statement: " . $stmt->error);
        }

        $result = $stmt->get_result();

        $run_query = $result;    
        $count = mysqli_num_rows($run_query);
    
        if($count > 0){
     
            $articlesList = array(); // Initialize an array to store all articles
            
            while ($row = $result->fetch_assoc()) {
                // Loop through each row in the result set and append it to the articlesList array
                $articlesList[] = $row;
            }
            
            $response = array('status' => 'success', 'articleData' => $articlesList, "message" => "articleDataLoaded");
            echo json_encode($response);
        }else{
            $response = array('status'=> 'success', 'articleData' => [], "message" => "articleDataLoaded" );
        echo json_encode($response);
        }
        
    } catch (Exception $e) {
        echo "Error: " . $e->getMessage();
    }
    
}else{
    $response = array('status' => 'error', 'articleData' => '[]', 'message' => 'Query Not Set');
    echo json_encode($response);
}