<?php 
include "db.php";
session_start();


$username = $_GET["username"];
if(isset($username)){
    $userID = mysqli_real_escape_string($con, $username);
    $stmt = $con->prepare("SELECT * FROM `user_info` WHERE `username` = ? OR `email` = ? LIMIT 1");
    $stmt->bind_param("ss", $userID, $userID);
    
    if($stmt->execute()){

    $result = $stmt->get_result();
    $run_query = $result;    
    $count = mysqli_num_rows($run_query);

    // SEND THE USER DATA IF THE DATA EXISTS  
    if($count > 0){
        $row = mysqli_fetch_array($run_query);
        $accountType = $row["acct_type"];
        $response = array('status' => 'success', 'accountType' => $accountType);
        echo json_encode($response);
        
    }else{
        $response = array('status' => 'error', 'message' => 'user Not Found');
        echo json_encode($response);
    }
    }else{
        $response = array('status' => 'error', 'message' => 'Internal Server Error');
        echo json_encode($response);
    }

}else{
    $response = array('status' => 'error', 'message' => 'User not found');
    echo json_encode($response);
}
?>