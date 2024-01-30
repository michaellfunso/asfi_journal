<?php
// Define target directory for file upload
include "db.php";
include "./CORS-setup.php";
session_start();

$targetDir = "../public/useruploads/manuscripts/";
$figuresTargetDir = "../public/useruploads/figures/";
$coverLetterDir = "../public/useruploads/cover_letters/";
$tablesDir = "../public/useruploads/tables/";
$graphicAbstractDir = "../public/useruploads/graphic_abstracts/";
$supplementaryMaterialsDir = "../public/useruploads/supplementary_materials/";



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
$first_name = $_POST["authors_first_name"];
$last_name = $_POST["authors_last_name"];
$middle_name = $_POST["authors_middle_name"];
$authors_prefix = $_POST["authors_prefix"];

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

// Generate Random Id for article 
$Buffer = bin2hex(random_bytes(10)); // 10 bytes = 20 characters in hexadecimal representation

// Generate a new unique filename (e.g., using timestamp)
$newFileName = time() . '_' . $manuscriptFile;
$coverLetterName = time() . '-' . $coverLetter;
$figuresName = time() . '.' .$figures;
$tableName = time() . '-' . $tables;
$supplementaryMaterialsName = time() . '-' . $supplementaryMaterials;
$graphicAbstractName = time(). '-' . $graphicAbstract;

// Check if file already exists
if (file_exists($targetFile)) {
    echo "Sorry, file already exists.";
    $uploadOk = 0;
}

// Check file size (optional)
if ($_FILES["manuscript_file"]["size"] > 50000000) {
    echo "Sorry, your file is too large. Choose a file less than 50MB";
    $uploadOk = 0;
}

// Allow only certain file formats (optional)
if ($fileType != "docx" && $fileType != "xml" && $fileType != "xhtml"
    && $fileType != "pdf") {
    echo "Sorry, only Documents are allowed.";
    $uploadOk = 0;
}

// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
    echo "Sorry, your file was not uploaded.";
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
            $stmt = $con->prepare("INSERT INTO `journals` (`article_type`, `manuscript_file`, `cover_letter`, `manuscript_tables`, `figures`, `supplimentary_materials`, `graphic_abstract`, `manuscript_full_title`, `manuscript_running_title`, `abstract_background`, `abstract_objectives`, `abstract_method`, `abstract_results`, `abstract_discussion`, `unstructured_abstract`, `authors_prefix`, `authors_first_name`, `authors_last_name`, `authors_middle_name`, `authors_highest_degree`, `authors_institution`, `institution_city`, `institution_country`, `authors_email`, `authors_phonenumber`, `authors_whatsapp_number`, `buffer`) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        
            if (!$stmt) {
                throw new Exception("Failed to prepare statement: " . $con->error);
            }
        
            $stmt->bind_param("sssssssssssssssssssssssssss", $articleType, $newFileName, $coverLetterName, $tableName, $figuresName, $supplementaryMaterialsName, $graphicAbstractName, $manuscriptFullTitle, $manuscriptRunningTitle, $abstractBackground, $abstractObjectives, $abstractMethod, $abstractResults, $abstractDiscussion, $unstructuredAbstract, $authorsPrefix, $authorsFirstName, $authorsLastName, $authorsMiddleName, $authorsHighestDegree, $authorsInstitution, $institutionCity, $institutionCountry, $authorsEmail, $authorsPhonenumber, $authorsWhatsappNumber, $Buffer);
        
            if (!$stmt->execute()) {
                throw new Exception("Failed to execute statement: " . $stmt->error);
            }
        
            echo "Success";
        } catch (Exception $e) {
            echo "Error: " . $e->getMessage();
        }
        

    } else {
        echo "Sorry, there was an error uploading your file.";
    }
}
?>
