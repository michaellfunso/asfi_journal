<?php
// Define target directory for file upload
include "db.php";
include "./CORS-setup.php";
session_start();

// Receive all data from form inputs
// $articleType = $_POST["article_type"];
$token = $_POST["token"];
$manuscript = $_POST["title"];

$quillContent = json_decode($_POST['article_content'], true);

$abstract = json_encode($quillContent);


// Get all Authors information 
// Check if the file already exists 
try {
    $stmt = $con->prepare("SELECT * FROM `journals` WHERE `buffer` =? ");
    if (!$stmt) {
        throw new Exception("Failed to prepare statement: " . $con->error);
    }

    $stmt->bind_param("s", $token);

    if (!$stmt->execute()) {
        throw new Exception("Failed to execute statement Author: " . $stmt->error);
    }else{

    $result = $stmt->get_result();
   
    $run_query = $result;
    $count = mysqli_num_rows($run_query);

    if($count > 0){
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {

            $authorsArray = $_POST["authorsArray"];
        
            $explodeAuthors = explode(",", $authorsArray);
            $explodeAuthorsArray = array_map('trim', $explodeAuthors);
        
            $authors = $explodeAuthorsArray;
        
            $correspondingAuthorsEmail = $_POST["corresponding_author"];
           // First Delete the Authors 
           $delete = $con->prepare("DELETE FROM `authors` WHERE `article_id` = ?");
           if(!$delete){
               throw new Exception("Failed to prepare statement: " . $con->error);
           }
           $delete->bind_param("s", $token);
             
           if (!$delete->execute()) {
               throw new Exception("Failed to execute statement Author: " . $delete->error);
           }
            for ($i = 0; $i<count($authors); $i++){
                $authorsFullname = $authors[$i];
         
                try {
    
                        // Inset new authors to the list 
                    $stmt = $con->prepare("INSERT INTO `authors`(`authors_fullname`, `article_id`) VALUES(?, ?)");
                
                    if (!$stmt) {
                        throw new Exception("Failed to prepare statement: " . $con->error);
                    }
                
                    $stmt->bind_param("ss",  $authorsFullname, $token);
                
                    if (!$stmt->execute()) {
                        throw new Exception("Failed to execute statement Author: " . $stmt->error);
                    }          

                } catch (Exception $e) {
           
                    $response = array('status'=> 'error', 'message' => 'ErrorAuthor:'  . $e->getMessage());
                    echo json_encode($response);
                }
        
            }
                     // Update the Article 
                     $update = $con->prepare("UPDATE `journals` SET `manuscript_full_title` = ?, `unstructured_abstract` =?, `corresponding_authors_email` =?  WHERE `buffer` =?");
                     $update->bind_param("ssss", $manuscript, $abstract, $correspondingAuthorsEmail, $token);
 
                     if($update->execute()){
                         $response = array("status" => "success", "message" => "ArticleUpdated ");
                         echo json_encode($response);
                     }
        }else{
            $response = array('status'=> 'error', 'message' => "Basd request format");
            echo json_encode($response);
        }
        
    }else{
        $response = array('status'=> 'error', 'message' => 'This Manuscript deos not exists');
        echo json_encode($response);
    }
    }
} catch (Exception $e) {
    $response = array('status'=> 'internalError', 'message' => "ErrorAuthor: " . $e->getMessage());
    echo json_encode($response);
}
?>
