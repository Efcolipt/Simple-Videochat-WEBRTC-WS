<?php 
session_start();
$data = $_POST;
$data_person = array();
require_once "../db.php";
			if (!empty($data['message'])) {
			$data['message'] = stripslashes($data['message']);
			$data['message'] = htmlspecialchars($data['message']);
			$MessageError = array();
			if ($data['message'] == '' || $data['message'] == ' ' ) {
				$MessageError[] = 'Введите сообщение';
			}
			$data['message'] = mysqli_real_escape_string($link,$data['message']);
			if (empty($MessageError)) {
				$message = $data['message'];
				$token = $_SESSION['token'];
				$add_message = mysqli_query($link,"INSERT INTO ".$datatable_messages." (message,token) VALUES ('$message','$token')");
				$receive_time = mysqli_query($link,"SELECT date_message FROM ".$datatable_messages."  ORDER BY id DESC LIMIT 1 ");
				$result = mysqli_query($link,"SELECT  name,path_img FROM ".$datatable_users." WHERE token = '".$token."'");
				$result = mysqli_fetch_row($result);
				$receive_time = mysqli_fetch_row($receive_time);
				if ($add_message) {
					echo $token." ".$result[0]." ".$result[1]." ".$receive_time[0];
				}
			}

		}

 ?>