<?php 
	
	session_start();
	if (empty($_SESSION['token'])) {
		header('Location:auth.php');
	}
	session_unset($_SESSION['token']);
	header("Location:auth.php");

 ?>