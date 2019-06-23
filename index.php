<?php 
session_start();
if (empty($_SESSION['token'])) {
	header('Location:auth.php');
}		require_once "db.php";
require_once "methods/getMessages.php";



?>

<!DOCTYPE html>
<html lang="ru" dir="ltr">
<head>
	<title>Чат для общения</title>
	<meta charset="UTF-8">

	<!-- Media -->
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">

	<!-- Meta for search -->
	<meta name="robots" content="index, follow">
	<meta name="description" content="">
	<meta name="author" content="Libils Team">
	<meta name="copyright" lang="ru" content="Libils Team">

	<!-- Open Graph Meta -->
	<meta property="og:title" content="Чат для общения">
	<meta property="og:locale" content="ru_RU">
	<meta property="og:description" content="Живой чат , где ты можешь провести свое свободное время!">
	<meta property="og:image" content="">
	<meta property="og:site_name" content="Chat">
	<meta property="og:url" content="">
	<meta property="og:type" content="website">


	<!-- Css -->
	<link rel="stylesheet" href="css/media.css">
	<link rel="stylesheet" href="css/main.css">
	<link rel="stylesheet" href="css/header.css">
	<link rel="shortcut icon" href="img/favicon/fav.ico" type="image/x-icon">

	<!-- Font awesome -->
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
</head>
<body>

	<p class="data"></p>
	<div class="wrapper">
		<?php require "block/header.php" ?>
		<div class="container">
			<h2>Чат</h2>
			<div class="message--block">
				<div class="message--correspondence">
					<? while($rows = mysqli_fetch_assoc($result_messages)): ?>
						<div class="messages">	
							<?php $result = mysqli_query($link,"SELECT path_img,name FROM ".$datatable_users." WHERE token = '{$rows['token']}'");
							$result = mysqli_fetch_row($result);
							?>		
							<div class="img--block"><img src="<?=$result[0] ?>" alt="Картинка"></div>
							<div class="name--user"><?=$result[1] ?></div>
							<div class="dateSendMeassage"><?=$rows['date_message'];?></div>	
							<div class="dataMessage"><?=$rows['message'];?></div>

						</div>
					<? endwhile; ?>
				</div>		
			</div>
			<div class="messageSendIn" >
				<input type="text" placeholder="Введите ваше сообщение" class="messageText" name="message" required>
				<button class="sendMessage" name="sendMeassage">Отправить</button>
			</div>
		</div>
	</div>



	<!-- Optional JS and Jquery -->
	<script src="https://code.jquery.com/jquery-3.3.1.js"
	integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60="
	crossorigin="anonymous"></script>
	<script src="js/main.js" type="text/javascript"></script>
</body>
</html>