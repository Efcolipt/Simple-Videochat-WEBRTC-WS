<?php 
	session_start();
	if (empty($_SESSION['token'])) {
		header('Location:auth.php');
	}

	$result_messages = mysqli_query($link,"SELECT * FROM Messages");

 ?>