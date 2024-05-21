<?php

include "./db.php";


$data = json_decode(file_get_contents("php://input"),true);

$type = $data["type"];


if($type){
    $searchQuery = $type;    
        try {
            $stmt = $con->prepare("SELECT * FROM `journals` WHERE `article_type` = ? ");
    
        
            if (!$stmt) {
                throw new Exception("Failed to prepare statement: " . $con->error);
            }
        
            $stmt->bind_param("ss",$searchQuery);
        
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