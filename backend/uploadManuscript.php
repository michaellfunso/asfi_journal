<?php
// Define target directory for file upload
include "db.php";
include "./CORS-setup.php";
session_start();

$targetDir = "../useruploads/manuscripts/";
$figuresTargetDir = "../useruploads/figures/";
$coverLetterDir = "../useruploads/cover_letters/";
$tablesDir = "../useruploads/tables/";
$graphicAbstractDir = "../useruploads/graphic_abstracts/";
$supplementaryMaterialsDir = "../useruploads/supplementary_materials/";


// Get the filename and append it to the target directory
$manuscriptFile = basename($_FILES["manuscript_file"]["name"]);
$targetFile = $targetDir . $manuscriptFile;

// GEt each uploaded file names 
$coverLetter = basename($_FILES["cover_letter"]["name"]);
$targetCoverLetter = $coverLetterDir . $coverLetter;

$tables = basename($_FILES["tables"]["name"]);
$targetTables = $tablesDir . $tables;

$figures = basename($_FILES["figures"]["name"]);
$targetFigures = $figuresTargetDir . $figures;

$supplementaryMaterials = basename($_FILES["supplementary_materials"]["name"]);
$targetSupplementary = $supplementaryMaterialsDir . $supplementaryMaterials;

$graphicAbstract = basename($_FILES["graphic_abstract"]["name"]);
$targetGraphics = $graphicAbstractDir  . $graphicAbstract;


// Initialize variables
$uploadOk = 1;
$fileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));

// Receive all data from form inputs
$articleType = $_POST["article_type"];

$manuscriptFullTitle = $_POST["manuscript_full_title"];
$manuscriptRunningTitle = $_POST["manuscript_running_title"];
$abstractBackground = $_POST["abstract_background"];
$abstractObjectives = $_POST["abstract_objectives"];
$abstractMethod = $_POST["abstract_method"];
$abstractResults = $_POST["abstract_results"];
$abstractDiscussion = $_POST["abstract_discussion"];
$unstructuredAbstract = $_POST["unstructured_abstract"];


// Generate Random Id for article 
$Buffer = bin2hex(random_bytes(10)); // 10 bytes = 20 characters in hexadecimal representation
$articleID = $Buffer;
// Generate a new unique filename (e.g., using timestamp)
$newFileName = time() . '_' . $manuscriptFile;
$coverLetterName = time() . '-' . $coverLetter;
$figuresName = time() . '.' .$figures;
$tableName = time() . '-' . $tables;
$supplementaryMaterialsName = time() . '-' . $supplementaryMaterials;
$graphicAbstractName = time(). '-' . $graphicAbstract;

// Check if file already exists
if (file_exists($targetFile)) {
    $response = array('status'=> 'error', 'message' => 'Sorry, file already exists.');
    // echo json_encode($response);
    $uploadOk = 0;
}

// Check file size (optional)
if ($_FILES["manuscript_file"]["size"] > 50000000) {
    $response = array('status'=> 'error', 'message' => 'Sorry, your file is too large. Choose a file less than 50MB');
    // echo json_encode($response);
    $uploadOk = 0;
}

// Get all Authors information 
// Check if the file already exists 
try {
    $stmt = $con->prepare("SELECT * FROM `journals` WHERE `manuscript_full_title` =? OR `manuscript_running_title` = ?");
    if (!$stmt) {
        throw new Exception("Failed to prepare statement: " . $con->error);
    }

    $stmt->bind_param("ss", $manuscriptFullTitle, $manuscriptRunningTitle);

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
    $authorsPrefix = $_POST["authors_prefix"];
    $authorsFirstName = $_POST["authors_first_name"];
    $authorsLastName = $_POST["authors_last_name"];
    $authorsMiddleName = $_POST["authors_middle_name"];
    $authorsHighestDegree = $_POST["authors_highest_degree"];
    $authorsInstitution = $_POST["authors_institution"];
    $institutionCity = $_POST["institution_city"];
    $institutionCountry = $_POST["institution_country"];
    $authorsEmail = $_POST["authors_email"];
    $authorsPhonenumber = $_POST["authors_phonenumber"];
    $authorsWhatsappNumber = $_POST["authors_whatsapp_number"];

    

    for ($i = 0; $i<count($authorsPrefix); $i++){

        try {
            $stmt = $con->prepare("INSERT INTO `authors` (`authors_prefix`, `authors_firstname`, `authors_middlename`, `authors_lastname`,  `highest_degree`, `authors_email`, `authors_phonenumber`, `authors_whatsappnumber`,`authors_institution`, `institution_country`, `institution_city`, `article_id`) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        
            if (!$stmt) {
                throw new Exception("Failed to prepare statement: " . $con->error);
            }
        
            $stmt->bind_param("ssssssssssss", $authorsPrefix[$i], $authorsFirstName[$i], $authorsMiddleName[$i],$authorsLastName[$i],  $authorsHighestDegree[$i], $authorsEmail[$i], $authorsPhonenumber[$i], $authorsWhatsappNumber[$i], $authorsInstitution[$i], $institutionCountry[$i], $institutionCity[$i], $articleID);
        
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
    if (move_uploaded_file($_FILES["manuscript_file"]["tmp_name"], $targetFile)) {
        // File uploaded successfully, now you can do something with the data
        rename($targetDir . $_FILES["manuscript_file"]["name"], $targetDir.$newFileName);
        
        move_uploaded_file($_FILES["cover_letter"]["tmp_name"], $targetCoverLetter);
        rename($coverLetterDir . $_FILES["cover_letter"]["name"], $coverLetterDir.$coverLetterName);

        move_uploaded_file($_FILES["tables"]["tmp_name"], $targetTables);
        rename($tablesDir . $_FILES["tables"]["name"], $tablesDir.$tableName);

        move_uploaded_file($_FILES["figures"]["tmp_name"], $targetFigures);
        rename($figuresTargetDir . $_FILES["figures"]["name"], $figuresTargetDir.$figuresName);

        move_uploaded_file($_FILES["supplementary_materials"]["tmp_name"], $targetSupplementary);
        rename($supplementaryMaterialsDir.$_FILES["supplementary_materials"]["name"], $supplementaryMaterialsDir . $supplementaryMaterialsName);

        move_uploaded_file($_FILES["graphic_abstract"]["tmp_name"], $targetGraphics);
        rename($graphicAbstractDir.$_FILES["graphic_abstract"]["name"], $graphicAbstractDir.$graphicAbstractName);

        try {
            $stmt = $con->prepare("INSERT INTO `journals` (`article_type`, `manuscript_file`, `cover_letter`, `manuscript_tables`, `figures`, `supplimentary_materials`, `graphic_abstract`, `manuscript_full_title`, `manuscript_running_title`, `abstract_background`, `abstract_objectives`, `abstract_method`, `abstract_results`, `abstract_discussion`, `unstructured_abstract`, `buffer`) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        
            if (!$stmt) {
                throw new Exception("Failed to prepare statement: " . $con->error);
            }
        
            $stmt->bind_param("ssssssssssssssss", $articleType, $newFileName, $coverLetterName, $tableName, $figuresName, $supplementaryMaterialsName, $graphicAbstractName, $manuscriptFullTitle, $manuscriptRunningTitle, $abstractBackground, $abstractObjectives, $abstractMethod, $abstractResults, $abstractDiscussion, $unstructuredAbstract, $articleID);
        
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
    
}

}
    }
} catch (Exception $e) {
    $response = array('status'=> 'internalError', 'message' => "ErrorAuthor: " . $e->getMessage());
    echo json_encode($response);
}
?>
