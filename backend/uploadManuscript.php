<?php
$targetDir = "../public/useruploads/manuscripts/";
$targetFile = $targetDir . basename($_FILES["manuscript"]["name"]);
$uploadOk = 1;
$fileType = strtolower(pathinfo($targetFile,PATHINFO_EXTENSION));
$username = $_POST["name"];

// Generate a new unique filename (e.g., using timestamp)
$newFileName = time() . '_' . $uploadedFileName;

// Check if file already exists
if (file_exists($targetFile)) {
    echo "Sorry, file already exists.";
    $uploadOk = 0;
}

// Check file size (optional)
if ($_FILES["manuscript"]["size"] > 50000000) {
    echo "Sorry, your file is too large. Choose a file less thant 50MB";
    $uploadOk = 0;
}

// Allow only certain file formats (optional)
if($fileType != "docx" && $fileType != "xml" && $fileType != "xhtml"
&& $fileType != "pdf" ) {
    echo "Sorry, only Documents are allowed.";
    $uploadOk = 0;
}

// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
    echo "Sorry, your file was not uploaded.";
// If everything is ok, try to upload file
} else {
    if (move_uploaded_file($_FILES["manuscript"]["tmp_name"], $targetFile)) {
        echo "The file ". htmlspecialchars($newFileName). " has been uploaded. $username";
    } else {
        echo "Sorry, there was an error uploading your file.";
    }
}
?>
