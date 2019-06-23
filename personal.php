<?php 
	
	session_start();
	if (empty($_SESSION['token'])) {
		header('Location:auth.php');
	}

	require_once 'db.php';
	function generateRandomString($length) {
		$characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		$charactersLength = strlen($characters);
		$randomString = '';
		for ($i = 0; $i < $length; $i++) {
			$randomString .= $characters[rand(0, $charactersLength - 1)];
		}
		return $randomString;
	}
	 function can_upload($file){
	 	global $MessageError;
	// если имя пустое, значит файл не выбран
    if($file['name'] == ''){
		$MessageError[] = 'Вы не выбрали файл.';
    }
	
	/* если размер файла 0, значит его не пропустили настройки 
	сервера из-за того, что он слишком большой */
	if($file['size'] == 0){
		$MessageError[] = 'Файл слишком большой.';
	}
	
	// разбиваем имя файла по точке и получаем массив
	$getMime = explode('.', $file['name']);
	// нас интересует последний элемент массива - расширение
	$mime = strtolower(end($getMime));
	// объявим массив допустимых расширений
	$types = array('jpg', 'png', 'gif', 'bmp', 'jpeg');
	
	// если расширение не входит в список допустимых - return
	if(!in_array($mime, $types)){
		$MessageError[] = 'Недопустимый тип файла.';
	}

	return true;
	
  }
  
  function make_upload($file){	
  	global $nameFile;
	$formatFile = substr($file['name'], strrpos($file['name'], '.')+1);
	$nameFile = generateRandomString(78).".".$formatFile;
	copy($file['tmp_name'], 'img/user/' . $nameFile);
  }

	$data = $_POST;

	if (isset($data['updateData'])) {
		$user = $data['username']; 
		$login = $data['login']; 
		$pass = $data['password']; 
		$rePass = $data['rePassword']; 
		$email = $data['email']; 
		$photo = $_FILES['photoUser']; 
		$MessageError = array();
		$MessageSuccess = array();
		$valid = array();

	$user = stripslashes($user);
	$user = htmlspecialchars($user);
	$user = mysqli_real_escape_string($link,$user);
	$login = stripslashes($login);
	$login = htmlspecialchars($login);
	$login = mysqli_real_escape_string($link,$login);
	$pass = stripslashes($pass);
	$pass = htmlspecialchars($pass);
	$pass = mysqli_real_escape_string($link,$pass);
	$rePass = stripslashes($rePass);
	$rePass = htmlspecialchars($rePass);
	$rePass = mysqli_real_escape_string($link,$rePass);
	$email = htmlspecialchars($email);
	$email = stripslashes($email);
	$email = mysqli_real_escape_string($link,$email);



	if (strlen($login) > 0) {
		if (strlen(trim($login)) < 3  && !(strlen(trim($login)) > 25) ) {

			$MessageError[] = 'Логин должен быть не меньше 3 символов и не больше 25';
		}
	}

	if (strlen($user) > 0) {
		if (trim($user) == ""  && trim($user) != " " ) {
		$MessageError[] = 'Введите имя';
	}
	}

	if (strlen($email) > 0) {
			$pattern_email = "/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/i";
		if (!preg_match($pattern_email, $email ) !==0 && !strlen($email ) > 3) {
			$MessageError[] = 'Не корректно введен Email';
		}
	}



	if (strlen($pass) > 0 || strlen($rePass) > 0) {
		if (strlen($pass) < 8 ) {
			$MessageError[] = 'Длина пароля должна быть не меньше 8 символов';
		}
		if (strlen($rePass) < 8 ) {
			$MessageError[] = 'Длина пароля должна быть не меньше 8 символов';
		}
		if ($pass != $rePass  ) {
			$MessageError[] = 'Пароли не совпадают';
		}
	}
	$checkFile = can_upload($photo);
	if (empty($MessageError)) {



		if ($checkFile) {
			 make_upload($photo);
			 $result = mysqli_query($link,"UPDATE ".$datatable_users." SET path_img = 'img/user/".$nameFile."' WHERE token = '".$_SESSION['token']."' ");
			if ($result) {
				$MessageSuccess[] = "Фото изменено";
			}
		}

		if (trim($login) != '') {
			$result = mysqli_query($link,"UPDATE ".$datatable_users." SET login = '".$login."' WHERE token = '".$_SESSION['token']."' ");
			if ($result) {
				$MessageSuccess[] = "Логин изменен";
			}
		}
	}
		if (trim($pass) != '') {
			$pass = password_hash($pass, PASSWORD_DEFAULT);
			$result = mysqli_query($link,"UPDATE ".$datatable_users." SET password = '".$pass."' WHERE token = '".$_SESSION['token']."' ");
			if ($result) {
				$MessageSuccess[] = "Пароль изменен";
			}
		}
		if (trim($email) != '') {
			$result = mysqli_query($link,"UPDATE ".$datatable_users." SET email = '".$email."' WHERE token = '".$_SESSION['token']."' ");
			if ($result) {
				$MessageSuccess[] = "Email изменен";
			}
		}
		if (trim($user) != '') {
			$result = mysqli_query($link,"UPDATE ".$datatable_users." SET name = '".$user."' WHERE token = '".$_SESSION['token']."' ");
			if ($result) {
				$MessageSuccess[] = "Имя изменено";
			}
		}

		
	}



 ?>
 <!DOCTYPE html>
 <html lang="ru" dir="ltr">
 <head>
 	<title>Личный кабинет</title>
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
 	<link rel="stylesheet" href="css/header.css">
 	<link rel="stylesheet" href="css/personal.css">
 	<link rel="shortcut icon" href="img/favicon/fav.ico" type="image/x-icon">
 
 	<!-- Font awesome -->
 	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
 </head>
 <body>
 
 
 
 	<div class="wrapper">
 		<?php require "block/header.php" ?>
 		<h2>Личный кабинет</h2>
 		<form enctype="multipart/form-data" method="post">
 			<div class="error <?php if(empty($MessageError)){echo "dn";} ?>">
					<?php if (!empty($MessageError)) {
						echo "<p>".array_shift($MessageError)."</p>";
					}?>
				</div>
				<div class="success <?php if(empty($MessageSuccess)){echo "dn";} ?>" >
					<?php if (!empty($MessageSuccess)) {
						for ($i=0; $i < count($MessageSuccess) ; $i++) { 
							echo "<p>".$MessageSuccess[$i]."</p>";
						}
						
					}?>
				</div>
 			<small>Сменить логин</small>
 			<input type="text" name="login" placeholder="Логин">
 			<small>Сменить имя</small>
 			<input type="text" name="username" placeholder="Имя">
 			<small>Сменить пароль</small>
 			<input type="password" name="password" placeholder="Пароль">
 			<small>Повторите новый пароль</small>
 			<input type="password" name="rePassword" placeholder="Повторите пароль">
 			<small>Сменить Email</small>
 			<input type="email" name="email" placeholder="Email">
 			<small>Сменить фотографию</small>
 			<input type="file" multiple accept="image/*" name="photoUser" placeholder="Фото">
 			<button type="submit" name="updateData">Изменить данные</button>
 		</form>
 	</div>
 
 

 </body>
 </html>