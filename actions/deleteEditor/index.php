<?php
include "../../backend/db.php";

$targetDir = "../useruploads/editors/";
$editorID = $_POST["editorId"];

// $profileimage = $_FILES["photo"];



$verifyCode = $_POST["verifyCode"];



if(isset($editorID)){


    // First verify that the code is correct 
    $stmtCode = $con->prepare("SELECT * FROM `verificationcodes` WHERE `code` =?");
    $stmtCode->bind_param("s", $verifyCode);
    if ($stmtCode->execute()) {
        $resultCode = $stmtCode->get_result();
        $count = mysqli_num_rows($resultCode);

        if($count > 0){

      

    $stmt = $con->prepare("DELETE FROM `editors_list` WHERE `id` = ?");
    if(!$stmt){
        $response = array("error"=>$stmt->error);
        echo json_encode($response);
    }
    $stmt->bind_param("s", $editorID );
    if( $stmt->execute()){
        $response = array("success"=>"Editor Deleted");
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