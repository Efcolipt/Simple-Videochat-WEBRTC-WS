<?php 

	$host = "";
	$user = "";
	$pass = "";
	$datatable_users = "ChatUsers";
	$datatable_messages = "Messages";
	$database = "Chat";

	$link = mysqli_connect($host, $user, $pass, $database); 
	if (mysqli_connect_errno( $link )) { echo "Failed to connect to MySQL: " . mysqli_connect_error(); }

?>
