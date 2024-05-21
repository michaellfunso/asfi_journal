<?php
include "./db.php";
session_start();

$data = json_decode(file_get_contents('php://input'), true);
$verifyCode = $data["code"];

$stmtCode = $con->prepare("SELECT * FROM `verificationcodes` WHERE `code` =?");
$stmtCode->bind_param("s", $verifyCode);
if ($stmtCode->execute()) {
    $resultCode = $stmtCode->get_result();
    $count = mysqli_num_rows($resultCode);

    if($count > 0){
        $response = array("status" => "success", "message" =>"CodeVerified");
        echo json_encode($response);
    }else{
        $response = array("status" => "error", "message" =>"InvalidACtivationCode");
        echo json_encode($response);
    }
}else{
    $response = array("status" => "error", "message" =>"Server Error");
    echo json_encode($response);
}