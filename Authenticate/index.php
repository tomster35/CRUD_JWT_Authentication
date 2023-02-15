<?php

/**
* Author : https://roytuts.com
*/

require_once 'DbConnect.php';
require_once 'jwt_utils.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Origin: *");
header("Content-type: application/json; charset=utf-8");
header("Access-Control-Allow-Methods: POST");
//content-type= application/json


if ($_SERVER['REQUEST_METHOD'] === 'POST') {

	// get posted data	
	$data = json_decode(file_get_contents("php://input", true));

		
		$sql = "SELECT * FROM users where username = '$data->Username'";
		$result = $conn->prepare($sql);
		$result->execute();
	   
		if ($result->rowCount() > 0) {
 
			$row = $result->fetch(PDO::FETCH_ASSOC);
			$Username = $row['Username'];
			$Password = $row['Password'];
		
			if (password_verify($data->Password, $Password)) {
				$headers = array('alg' => 'HS256', 'typ' => 'JWT');
				$payload = array('Username' => $Username, 'exp' => (time() + 1200));
				$jwt = generate_jwt($headers, $payload);
				http_response_code(200);
				echo json_encode(array('token' => $jwt));
			} else {
				http_response_code(401);
				echo 'Invalid password.';
			}
			
		} else {
			http_response_code(401);
			echo json_encode(array('error' => 'Invalid User'));

		}
	} 


