<?php
include "./db.php";

if($_SERVER['REQUEST_METHOD'] === "POST"){
    $stmt = $con->prepare("SELECT DISTINCT `article_type` FROM `journals` ORDER BY `article_type`");
    if (!$stmt) {
        throw new Exception("Failed to prepare statement: " . $con->error);
    }
    if($stmt->execute()){
        $result = $stmt->get_result();

        $count = mysqli_num_rows($result);

       
        $types = array(); // Initialize an array to store all articles
        
        while ($row = $result->fetch_assoc()) {
            // Loop through each row in the result set and append it to the typesList array
            $types[] = $row["article_type"];
        }
        
        $response = array("status" => "success", "message" => "types Found", "types" => $types);
        echo json_encode($response);
    }else{
        $response = array("status" => "error", "message" => $stmt->error);
        echo json_encode($response);
    }
}