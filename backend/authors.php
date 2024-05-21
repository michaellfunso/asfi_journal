<?php
include "./db.php";

if($_SERVER['REQUEST_METHOD'] === "POST"){
    $stmt = $con->prepare("SELECT DISTINCT `authors_fullname` FROM `authors` WHERE 1 ORDER BY `authors_fullname`");
    if (!$stmt) {
        throw new Exception("Failed to prepare statement: " . $con->error);
    }
    if($stmt->execute()){
        $result = $stmt->get_result();

        $count = mysqli_num_rows($result);

       
        $authors = array(); // Initialize an array to store all articles
        
        while ($row = $result->fetch_assoc()) {
            // Loop through each row in the result set and append it to the authorsList array
            $authors[] = $row["authors_fullname"];
        }
        
        $response = array("status" => "success", "message" => "Authors Found", "authors" => $authors);
        echo json_encode($response);
    }else{
        $response = array("status" => "error", "message" => $stmt->error);
        echo json_encode($response);
    }
}