<?php

function FormatDate($date){

$timestamp = $date; // Current timestamp

// Format the timestamp into a human-readable date
$formattedDate = date('Y-m-d H:i:s', $timestamp);

echo $formattedDate; // Output: 2024-05-08 14:23:45 (example)

}