<?php


function GetAuthors($ArticleId){
    include "db.php";
include "CORS-setup.php";
$article_id = $ArticleId;

try {
    $stmt = $con->prepare("SELECT * FROM `authors` WHERE article_id =?");


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
            $authorsName = $row["authors_fullname"];
        

            echo "$authorsName, ";
        }
     
    }else{
       
    echo "NO Authors Avaiable";
    }
    
} catch (Exception $e) {

    echo "Error: " . $e->getMessage();
}
}

?>