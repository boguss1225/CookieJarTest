<?php
/*
* Copyright 2020 The Dementia Data Collection project Authors. All Rights Reserved.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* ==========================================================================
*
* This file is part of Dementia Data Collection project.
*
* Made in University of Tasmania, Australia.
*
* @Authors : Dr.Mira Park (mira.park@utas.edu.au)
*			 Heemoon Yoon (boguss1225@gmail.com)
*			 XiaoXiang Wang (lance.wang26@gmail.com)
*
* Date : Initial Development in 2020 
*
* For the latest version, please check the github 
* (https://github.com/boguss1225/CookieJarTest)
* 
* ==========================================================================
* Description : This program records user voice and saves as wav file in server side.
*/


print_r($_FILES); //this will print out the received name, temp name, type, size, etc.

//get temporary name & file name 
$tempName = $_FILES['file']['tmp_name']; 

//move the file from temp name to local folder
date_default_timezone_set('Australia/Hobart');
move_uploaded_file($tempName, "uploads/".date("Ymd_H_i_s").'.wav');

$mysqli = new mysqli('localhost', 'root', '', 'project_utas'); 
if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
}

mysqli_query($mysqli,"INSERT INTO `jar` (`name`) VALUES ( '$filePath')");
?>
