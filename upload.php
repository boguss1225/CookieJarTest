<?php

print_r($_FILES); //this will print out the received name, temp name, type, size, etc.


//get temporary name & file name 
$tempName = $_FILES['file']['tmp_name']; 
$filePath =  $_FILES['file']['name']; 

//move the file from temp name to local folder
move_uploaded_file($tempName, "uploads/".$filePath);

$mysqli = new mysqli('localhost', 'root', '', 'project'); 
if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
}

mysqli_query($mysqli,"INSERT INTO `jar` (`name`) VALUES ( '$filePath')");

/*  DB 

CREATE TABLE `jar` (

  `id`  int(11) NOT NULL AUTO_INCREMENT, 
  `name` varchar(32) NOT NULL,
  `time` datetime(6) NOT NULL DEFAULT current_timestamp(6)
) 

*/



?>
