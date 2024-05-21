<?php
include "./db.php";


if(isset($_GET["encEmail"])){
    $encEmail = $_GET["encEmail"];
    
    $stmt = $con->prepare("SELECT * FROM `user_info` WHERE md5(`email`) = ?");
    $stmt->bind_param("s", $encEmail);
    $stmt->execute();
    $result = $stmt->get_result();
    $run_query = $result; 
    $count = mysqli_num_rows($run_query);


    //if user record is available in database then $count will be equal to 1
    if($count > 0){
        // $row = mysqli_fetch_array($run_query);
        $responseK = array('status' => 'userFound', 'message'=>'account');
        echo json_encode($responseK);
    }else{
        $response = array('status' => 'userNotFound', 'message'=>'!account');
        echo json_encode($response);
    }

}


// RESET THE PASSWORD AFTER POST REQUEST 
if(json_decode(file_get_contents('php://input'), true)){
    $data = json_decode(file_get_contents('php://input'), true);
    $newPassword = password_hash($data["pass"], PASSWORD_DEFAULT);
    

    $userEmail = $data["validator"];

    $stmt = $con->prepare("UPDATE `user_info` SET `password` = ? WHERE md5(`email`) = ?");
    $stmt->bind_param("ss",$newPassword, $userEmail);
    
    if($stmt->execute()){
        $response = array('status'=> 'passwordResetSuccessful', 'message' => 'Password Reset Successfully');
        echo json_encode($response);
    }else{
        $response = array('status' => 'internalError', 'message'=> 'Statement Did not finish successfully');
        echo json_encode($response);
    }
}