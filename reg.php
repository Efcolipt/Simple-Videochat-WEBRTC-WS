<?php 

session_start();
if (!empty($_SESSION['token'])) {
	header('Location:index.php');
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

$data = $_POST;



if (isset($data['sendData'])) {
	$data['login'] = stripslashes($data['login']);
	$data['login'] = htmlspecialchars($data['login']);
	$data['login'] = mysqli_real_escape_string($link,$data['login']);
	$data['password'] = stripslashes($data['password']);
	$data['password'] = htmlspecialchars($data['password']);
	$data['password'] = mysqli_real_escape_string($link,$data['password']);
	$data['rePassword'] = stripslashes($data['rePassword']);
	$data['rePassword'] = htmlspecialchars($data['rePassword']);
	$data['rePassword'] = mysqli_real_escape_string($link,$data['rePassword']);
	$data['username'] = stripslashes($data['username']);
	$data['username'] = htmlspecialchars($data['username']);
	$data['username'] = mysqli_real_escape_string($link,$data['username']);
	$data['email'] = htmlspecialchars($data['email']);
	$data['email'] = stripslashes($data['email']);
	$data['email'] = mysqli_real_escape_string($link,$data['email']);
	$MessageError = array();


	if ($data['password'] == '' || $data['password'] == ' ' ) {
		$MessageError[] = 'Введите пароль';
	}
	if ($data['password'] != $data['rePassword'] ) {
		$MessageError[] = 'Пароли не совпадают';
	}
	if (strlen(trim($data['login'])) < 3  && !(strlen(trim($data['login'])) > 25) ) {
		$MessageError[] = 'Логин должен быть не меньше 3 символов и не больше 25';
	}
	if (strlen(trim($data['username'])) == 0 ) {
		$MessageError[] = 'Введите имя';
	}
	$pattern_email = "/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/i";
	if (!preg_match($pattern_email, $data['email']) !==0 && !strlen($data['email']) > 3) {
		$MessageError[] = 'Не корректно введен Email';
	}
	if (strlen($data['password']) < 8 ) {
		$MessageError[] = 'Длина пароля должна быть не меньше 8 символов';
	}

	// var_dump($data);
	$user = $data['username'];
	$login = $data['login'];
	$email = $data['email'];
	$_SESSION['token'] = generateRandomString(49);
	$token = $_SESSION['token'];
	if (empty($MessageError)) {
		$data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);
		$pass = $data['password'];
		$result_person = mysqli_query($link,"SELECT * FROM ".$datatable_users." WHERE login = '{$login}'");		
		$result_email = mysqli_query($link,"SELECT * FROM ".$datatable_users." WHERE email = '{$email}'");	

		$result_person = mysqli_fetch_array($result_person);		
		$result_email = mysqli_fetch_array($result_email);
		if (!empty($result_person)) {
			$MessageError[] = 'Пользователь уже существует ';
		}     

		if (!empty($result_email)) {
			$MessageError[] = 'Пользователь с таким Email уже загеригистрирован ';
		}

		if (empty($MessageError)) {
			$user = trim($user);
			$email = trim($email);
			$login = trim($login);
			$result = mysqli_query($link,"INSERT INTO ".$datatable_users." (login,password,name,email,path_img,token) VALUES ('$login','$pass','$user','$email', 'img/no--img.png','$token')"); 
			$result_id =  mysqli_query($link,"SELECT id FROM ".$datatable_users." WHERE login = '$login')"); 
			
			if ($result) {
			$_SESSION['name'] = $user;
			$_SESSION['id'] = $result_id;
			 header('Location:index.php');
			 mysqli_close($link);
			}else{
				$MessageError[] = 'Произошла ошибка , разработчик уже знает о ней! Попробуйте снова.';
			}

		}else{
			$MessageError[] = 'Произошла ошибка , разработчик уже знает о ней! Попробуйте снова.';
		}


	}

}

?>



<!DOCTYPE html>
<html lang="ru" dir="ltr">
<head>
	<title>Регистрация</title>
	<meta charset="UTF-8">

	<!-- Media -->
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">

	<!-- Meta for search -->
	<meta name="robots" content="index, follow">
	<meta name="description" content="Чат для общения">
	<meta name="author" content="Libils Team">
	<meta name="copyright" lang="ru" content="Libils Team">

	<!-- Open Graph Meta -->
	<meta property="og:title" content="">
	<meta property="og:locale" content="ru_RU">
	<meta property="og:description" content="">
	<meta property="og:image" content="">
	<meta property="og:site_name" content="">
	<meta property="og:url" content="">
	<meta property="og:type" content="website">

	<link rel="stylesheet" href="css/reg.css">
	<link rel="shortcut icon" href="img/favicon/fav.ico" type="image/x-icon">

</head>
<body>


	<div class="wrapper">
		<div class="container">
			<h2>Регистрация</h2>
			<form method="post">
				<div class="error">
					<?php if (!empty($MessageError)) {
						echo "<p>".array_shift($MessageError)."</p>";
					}?>
				</div>
				<input type="text" placeholder="Логин" name="login" required>
				<input type="password" placeholder="Пароль" name="password" required>
				<input type="password" placeholder="Повторите пароль" name="rePassword" required>
				<input type="text" placeholder="Как вас звать ?" name="username" required>
				<input type="email" placeholder="Email" name="email" required>
				<button type="submit" name="sendData">Зарегистрироваться</button>
			</form>
			<small>Уже зарегистрированы ?</small>
			<a href="auth.php">Вход</a>
		</div>
	</div>




</body>
</html>