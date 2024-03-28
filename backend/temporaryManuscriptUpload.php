<?php
// Define target directory for file upload
include "db.php";
include "./CORS-setup.php";
session_start();

$targetDir = "../journal/useruploads/manuscripts/";
$targetDirImage = "../journal/useruploads/articleImages/";
// Get the filename and append it to the target directory

$manuscriptFile = basename($_FILES["manuscript_file"]["name"]);
$targetFile = $targetDir . $manuscriptFile;


$manuscriptFileImage = basename($_FILES["manuscriptCover"]["name"]);
$targetFileImage = $targetDir . $manuscriptFileImage;

// Initialize variables
$uploadOk = 1;
$fileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));

// Receive all data from form inputs
$articleType = $_POST["ArticleType"];
$manuscript = $_POST["title"];
$abstract = $_POST["abstract"];
$verifyCode = $_POST["verifyCode"];



// Generate Random Id for article 
$Buffer = bin2hex(random_bytes(10)); // 10 bytes = 20 characters in hexadecimal representation
$articleID = $Buffer;
// Generate a new unique filename (e.g., using timestamp)
$newFileName = time() . '_' . $manuscriptFile;
$newFileNameImage = time() . '_' . $manuscriptFileImage;



// Check if file already exists
if (file_exists($targetFile)) {
    $response = array('status'=> 'error', 'message' => 'Sorry, file already exists.');
    echo json_encode($response);
    $uploadOk = 0;
}

// Check file size (optional)
if ($_FILES["manuscript_file"]["size"] > 50000000) {
    $response = array('status'=> 'error', 'message' => 'Sorry, your file is too large. Choose a file less than 50MB');
    echo json_encode($response);
    $uploadOk = 0;
}

// Get all Authors information 
// Check if the file already exists 
try {
    $stmt = $con->prepare("SELECT * FROM `journals` WHERE `manuscript_full_title` =? ");
    if (!$stmt) {
        throw new Exception("Failed to prepare statement: " . $con->error);
    }

    $stmt->bind_param("s", $manuscriptFullTitle);

    if (!$stmt->execute()) {
        throw new Exception("Failed to execute statement Author: " . $stmt->error);
    }else{

    $result = $stmt->get_result();
   
    $run_query = $result;
    $count = mysqli_num_rows($run_query);

    if($count > 0){
        $response = array('status'=> 'error', 'message' => 'This Manuscript already exists');
        echo json_encode($response);
    }else{


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $authors = $_POST["authors"];

    for ($i = 0; $i<count($authors); $i++){

        try {
            $stmt = $con->prepare("INSERT INTO `authors` (`authors_fullname`, `article_id`) VALUES(?, ?)");
        
            if (!$stmt) {
                throw new Exception("Failed to prepare statement: " . $con->error);
            }
        
            $stmt->bind_param("ss", $authors[$i], $articleID);
        
            if (!$stmt->execute()) {
                throw new Exception("Failed to execute statement Author: " . $stmt->error);
            }
        
        } catch (Exception $e) {
   
            $response = array('status'=> 'error', 'message' => 'ErrorAuthor:'  . $e->getMessage());
            echo json_encode($response);
        }

    }
}


// Allow only certain file formats (optional)
// if ($fileType != "docx" && $fileType != "xml" && $fileType != "xhtml"
//     && $fileType != "pdf") {
    
//     $response = array('status'=> 'error', 'message' => "Sorry, only Documents are allowed.");
//     echo json_encode($response);
//     $uploadOk = 0;
// }

// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {

    $response = array('status'=> 'error', 'message' => 'Sorry, your file was not uploaded.');
    echo json_encode($response);
// If everything is ok, try to upload file
} else {
    $stmtCode = $con->prepare("SELECT * FROM `verificationCodes` WHERE `code` =?");
    $stmtCode->bind_param("s", $verifyCode);
    if ($stmtCode->execute()) {
        $resultCode = $stmtCode->get_result();
        $count = mysqli_num_rows($resultCode);
        if($count > 0){

 

    if (move_uploaded_file($_FILES["manuscript_file"]["tmp_name"], $targetFile)) {
        // File uploaded successfully, now you can do something with the data
        rename($targetDir . $_FILES["manuscript_file"]["name"], $targetDir.$newFileName);

        // move_uploaded_file($_FILES["manuscriptCover"]["tmp_name"], $targetFileImage);
        // rename($targetDirImage . $_FILES["manuscriptCover"]["name"], $targetDirImage.$newFileNameImage);
        
      
        try {
            $stmt = $con->prepare("INSERT INTO `journals` (`article_type`, `manuscript_file`,  `manuscript_full_title`,`unstructured_abstract`,`manuscriptPhoto`, `buffer`) VALUES(?, ?, ?, ?, ?, ?)");
        
            if (!$stmt) {
                throw new Exception("Failed to prepare statement: " . $con->error);
            }
        
            $stmt->bind_param("ssssss", $articleType, $newFileName, $manuscript, $abstract, $newFileNameImage, $articleID);
        
            if (!$stmt->execute()) {
                throw new Exception("Failed to execute statement: " . $stmt->error);
            }

            $response = array('status'=> 'success', 'message' => 'Manuscript Uploaded Successfully');
            echo json_encode($response);
        } catch (Exception $e) {
    
            $response = array('status'=> 'internalError', 'message' => "Error: " . $e->getMessage());
            echo json_encode($response);
        }
        

    } else {

        $response = array('status'=> 'error', 'message' => 'Sorry, there was an error uploading your file.');
        echo json_encode($response);
    }
}else {

    $response = array('status'=> 'error', 'message' => 'Invalid Code.');
    echo json_encode($response);
}
}
}

}
    }
} catch (Exception $e) {
    $response = array('status'=> 'internalError', 'message' => "ErrorAuthor: " . $e->getMessage());
    echo json_encode($response);
}
?>
