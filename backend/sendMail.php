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

$api = $_ENV['SENDGRID_API_KEY'];
$senderEmail = $_ENv["SENDGRID_EMAIL"];

$RecipientEmail = $_POST["recieverEmail"];
$RecipientName = $_POST["recipientName"];
$subject = $_POST["subject"];
$message = $_POST["message"];



$email = new \SendGrid\Mail\Mail();
$email->setFrom($senderEmail, "ASFIRJ");
$email->setSubject("Sending with SendGrid is Fun");
$email->addTo($RecipientEmail, $RecipientName);
// $email->addContent("text/plain", "and easy to do anywhere, even with PHP");
$email->addContent(
    "text/html",$message
);
$sendgrid = new \SendGrid($api);
try {
    $response = $sendgrid->send($email);
    print $response->statusCode() . "\n";
    print_r($response->headers());
    print $response->body() . "\n";
} catch (Exception $e) {
    echo 'Caught exception: '. $e->getMessage() ."\n";
}