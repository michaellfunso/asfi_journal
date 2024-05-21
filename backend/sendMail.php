<?php
require '../vendor/autoload.php'; // If you're using Composer (recommended)
// Comment out the above line if not using Composer
// require("<PATH TO>/sendgrid-php.php");
// If not using Composer, uncomment the above line and
// download sendgrid-php.zip from the latest release here,
// replacing <PATH TO> with the path to the sendgrid-php.php file,
// which is included in the download:
// https://github.com/sendgrid/sendgrid-php/releases
// Inmport Environment Variables
require "./exportENV.php";
include "./db.php";

$api = $_ENV['SENDGRID_API_KEY'];
$senderEmail = $_ENV["SENDGRID_EMAIL"];

$data = json_decode(file_get_contents('php://input'), true);

$RecipientEmail = $data["receiverEmail"];
// $RecipientName = $data["recipientName"];
$subject = $data["subject"];
$message = $data["message"];
// $Subject = $data["subject"]
$resetToken = bin2hex(random_bytes(6)); // 10 bytes = 20 characters in hexadecimal representation

if($RecipientEmail){

$stmt = $con->prepare("SELECT * FROM `user_info` WHERE `email` = ?");
$stmt->bind_param("s", $RecipientEmail);
$stmt->execute();
$result = $stmt->get_result();
$run_query = $result; 
$count = mysqli_num_rows($run_query);


//if user record is available in database then $count will be equal to 1
if($count > 0){
    $row = mysqli_fetch_array($run_query);
    $email = $row["email"];
    $RecipientName = $row["first_name"];

    $encryptedButton = md5($RecipientEmail);

$sendgrid = new \SendGrid($api);
try {
 
    // print $response->statusCode() . "\n";
    // print_r($response->headers());
    // print $response->body() . "\n";

    // Update the ser data with the new reset  Token
    $stmt = $con->prepare("UPDATE `user_info` SET `resetToken` = ? WHERE `email` = ?");
    $stmt->bind_param("ss",$resetToken, $RecipientEmail);
    
    if($stmt->execute()){
        $email = new \SendGrid\Mail\Mail();
        $email->setFrom($senderEmail, "ASFIRJ");
        $email->setSubject($subject);
        $email->addTo($RecipientEmail, $RecipientName);
        $email->addContent(
            "text/html",$message
        );
        $email->addContent("text/plain", $resetToken);
        $response = $sendgrid->send($email);
    
        $response = array('status' => 'success', 'message' => 'Email sent', 'email' => $encryptedButton);
        echo json_encode($response);
    }else{
        $response = array('status' => 'internalError', 'message'=> 'Statement Did not finish successfully');
        echo json_encode($response);
    }
    
} catch (Exception $e) {
    $response = array('status' => 'Internal Error', 'message' => 'Caught exception: '. $e->getMessage() ."\n");
    echo json_encode($response);
}
}else{
    $response = array('status'=> 'error', 'message' => 'User does not exist on Our servers');
    echo json_encode($response);
}
}else{
    $response = array('status' => 'error', 'message' => 'Invalid Request');
    echo json_encode($response);
}