<?php



require_once 'db.php';
require_once 'jwt_utils.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");

$bearer_token = get_bearer_token();

#echo $bearer_token;

$is_jwt_valid = is_jwt_valid($bearer_token);

if($is_jwt_valid) {
	$sql = "SELECT * FROM users";
	$result = $conn->prepare($sql);

	$rows = array();

	while($row = $result->fetch(PDO::FETCH_ASSOC)) {
		$rows[] = $row;
	}

	echo json_encode($rows);
} else {
	echo json_encode(array('error' => 'Access denied'));
}
