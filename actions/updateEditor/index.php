<?php
include "../../backend/db.php";

$targetDir = __DIR__."/../../useruploads/editors/";
$prefix = $_POST["prefix"];
$fullname = $_POST["fullname"];
$discipline = $_POST["discipline"];
$field = $_POST["field"];
$country = $_POST["country"];
$id = $_POST["id"];
$profileimage = $_FILES["photo"];




$quillContent = json_decode($_POST["bio"], true);

$bio = json_encode($quillContent);
$verifyCode = $_POST["verifyCode"];
$newFileName = "";


if(isset($_POST["prefix"])){


    // First verify that the code is correct 
    $stmtCode = $con->prepare("SELECT * FROM `verificationcodes` WHERE `code` =?");
    $stmtCode->bind_param("s", $verifyCode);
    if ($stmtCode->execute()) {
        $resultCode = $stmtCode->get_result();
        $count = mysqli_num_rows($resultCode);

        if($count > 0){

            if(isset($_FILES["photo"]["name"]) && $_FILES["photo"]["name"] != ""){
                // Get the filename and append it to the target directory
                $File = basename($_FILES["photo"]["name"]);
                $targetFile = $targetDir . $File;
                $newFileName = time() . '_' . $File;
                if (move_uploaded_file($_FILES["photo"]["tmp_name"], $targetFile)) {
                    // File uploaded successfully, now you can do something with the data
                    rename($targetDir . $_FILES["photo"]["name"], $targetDir.$newFileName);
                }
            }else{
                $newFileName = "avatar.png";
            }
      

    $stmt = $con->prepare("UPDATE `editors_list` SET `prefix` =?, `fullname`=?, `bio`=?, `discipline`=?, `field`=?, `country`=?, `photo` = ? WHERE `id` = ?");
    if(!$stmt){
        $response = array("error"=>$stmt->error);
        echo json_encode($response);
    }
    $stmt->bind_param("ssssssss", $prefix, $fullname, $bio, $discipline, $field, $country, $newFileName, $id );
    if( $stmt->execute()){
        $response = array("success"=>"Editor Updated");
        echo json_encode($response);
    }else{
        $response = array("error"=>$stmt->error);
        echo json_encode($response);
    }
}else {

    $response = array('status'=> 'error', 'message' => 'Invalid Code.');
    echo json_encode($response);
}
    }
}else{
    $response = array("error"=>"Incomplete Fields");
    echo json_encode($response);
}