<?php 

session_start();
if (!empty($_SESSION['token'])) {
header('Location:index.php');
}
require 'db.php';
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
$data['password'] = stripslashes($data['password']);
$data['password'] = htmlspecialchars($data['password']);
$data['login'] = mysqli_real_escape_string($link,$data['login']);
$data['password'] = mysqli_real_escape_string($link,$data['password']);
$MessageError = array();


if ($data['password'] == '' || $data['password'] == ' ' ) {
	$MessageError[] = 'Введите пароль';
}
if (strlen(trim($data['login'])) < 3  && !(strlen(trim($data['login'])) > 25) ) {
	$MessageError[] = 'Логин должен быть не меньше 3 символов и не больше 25';
}
if (strlen($data['password']) < 8 ) {
	$MessageError[] = 'Длина пароля должна быть не меньше 8 символов';
}



if (empty($MessageError)) {

	$result_person = mysqli_query($link,"SELECT * FROM ".$datatable_users." Where login = '".$data['login']."' ");               
	$result_person = mysqli_fetch_array($result_person);


	if (!password_verify($data['password'],$result_person['password'])) {
		$MessageError[] = 'Не верный логин или пароль';

	}

	


	if (empty($result_person)) {
		$MessageError[] = 'Не верный логин или пароль';
	}
	
	if (empty($MessageError)) {
		$_SESSION['token'] = $result_person['token'];
		$_SESSION['id'] = $result_person['id'];
		$_SESSION['name'] = $result_person['name'];


			if (!empty($_SESSION['id']) && !empty($_SESSION['name']) && !empty($_SESSION['token'])) {
				header('Location:index.php');
			}
			
		
	}


}

}



?>

<!DOCTYPE html>
<html lang="ru" dir="ltr">
<head>
<title>Авторизация</title>
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

<link rel="stylesheet" href="css/auth.css">
<link rel="shortcut icon" href="img/favicon/fav.ico" type="image/x-icon">

</head>
<body>


<div class="wrapper">
	<div class="container">
		<h2>Авторизация</h2>
		<form method="post">
			<div class="error_auth">
				<?php if (!empty($MessageError)) {
					echo "<p>".array_shift($MessageError)."</p>";
				}?>
			</div>
			<input type="text" placeholder="Ваш логин" name="login" required>
			<input type="password" placeholder="Ваш пароль" name="password" required>
			<button type="submit" name="sendData">Войти</button>
		</form>
		<small>Еще не зарегистрированы ?</small>
		<a href="reg.php">Регистрация</a>
	</div>
</div>



</body>
</html>