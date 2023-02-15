<?php



error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Content-type: application/json; charset=utf-8");

include 'DbConnect.php';
require_once 'jwt_utils.php';

//include '../Authenticate/jwt_utils.php';

$objDb = new DbConnect;
$conn = $objDb->connect();
   


$bearer_token = get_bearer_token();
$is_jwt_valid = is_jwt_valid($bearer_token);


// print_r(file_get_contents('php://input')); // texting php JSON converter

//$employee = json_decode(file_get_contents('php://input'));

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {


    case "GET":

        if ($is_jwt_valid) {
            $sql = "SELECT * FROM employees";
            $path = explode('/', $_SERVER['REQUEST_URI']);
            if (isset($path[3]) && is_numeric($path[3])) {
                $sql .= " WHERE EmployeeId = :EmployeeId";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':EmployeeId', $path[3]);
                $stmt->execute();
                $employees = $stmt->fetch(PDO::FETCH_ASSOC);
            } else {
                $stmt = $conn->prepare($sql);
                $stmt->execute();
                $employees = $stmt->fetchAll(PDO::FETCH_ASSOC);
            }
            http_response_code(200);
            echo json_encode($employees, JSON_PRETTY_PRINT);
        } else {
            http_response_code(401);
            echo json_encode(array('error' => 'Access denied'));
            }

        break;


    case "POST":
            if ($is_jwt_valid) {
                $path = explode('/', $_SERVER['REQUEST_URI']);
                $employee = json_decode(file_get_contents('php://input'));
               
                $sql = "SELECT * FROM employees where Email = '$employee->Email'";
                $stmt = $conn->prepare($sql);
                $stmt->execute();
                if ($stmt->rowCount() > 0) {
                http_response_code(400);
                echo json_encode(array('error' => 'Email already exists'));
                } 

               else {
                $sql = "INSERT INTO employees(EmployeeId, FirstName, LastName, DOB, Email, SkillLevel, Active, Age) VALUES (null, :FirstName, :LastName, :DOB, :Email, :SkillLevel, :Active, :Age)";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':FirstName', $employee->FirstName);
                $stmt->bindParam(':LastName', $employee->LastName);
                $stmt->bindParam(':DOB', $employee->DOB);
                $stmt->bindParam(':Email', $employee->Email);
                $stmt->bindParam(':SkillLevel', $employee->SkillLevel);
                $stmt->bindParam(':Active', $employee->Active);
                $stmt->bindParam(':Age', $employee->Age);

                if ($stmt->execute()) {
                    $sql = "SELECT * FROM employees where Email = '$employee->Email'";
                    $stmt = $conn->prepare($sql);
                    $stmt->execute();

                    $row = $stmt->fetch(PDO::FETCH_ASSOC);
			        $EmployeeId = $row['EmployeeId'];

                    $response = ['message' => 'Employee created successfully', ' Employee Id' => $EmployeeId];
                } else {
                    $response = ['message' => 'Failed to create Employee'];
                }
                http_response_code(201);
                echo json_encode($response);
            }
        } else {
                http_response_code(401);
                echo json_encode(array('error' => 'Access denied'));
        }
    
        break;

    case "PUT":

        if ($is_jwt_valid) {
            $employee = json_decode(file_get_contents('php://input'));
            $sql = "UPDATE employees SET EmployeeId= :EmployeeId, FirstName=:FirstName, LastName =:LastName, DOB= :DOB, Email=:Email, SkillLevel=:SkillLevel, Active=:Active, Age=:Age WHERE EmployeeId = :EmployeeId";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':EmployeeId', $employee->EmployeeId);
            $stmt->bindParam(':FirstName', $employee->FirstName);
            $stmt->bindParam(':LastName', $employee->LastName);
            $stmt->bindParam(':DOB', $employee->DOB);
            $stmt->bindParam(':Email', $employee->Email);
            $stmt->bindParam(':SkillLevel', $employee->SkillLevel);
            $stmt->bindParam(':Active', $employee->Active);
            $stmt->bindParam(':Age', $employee->Age);
            if ($stmt->execute()) {

                $response = ['message' => 'Employee updated successfully.'];
            } else {
                $response = ['message' => 'Failed to employee record'];
            }
            http_response_code(200);
            echo json_encode($response);
        } else {
            http_response_code(401);
            echo json_encode(array('error' => 'Access denied'));
            }
            break;

    case "DELETE":

        if ($is_jwt_valid) {
            $sql = "DELETE FROM employees WHERE EmployeeId = :EmployeeId";
            $path = explode('/', $_SERVER['REQUEST_URI']);

            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':EmployeeId', $path[3]);

            if ($stmt->execute()) {
                $response = ['message' => 'Employee deleted successfully.'];
                
                
            } else {
                $response = ['message' => 'Failed to delete Employee.'];
            }
                http_response_code(200);
                echo json_encode($response);
            }else {
                http_response_code(401);
                echo json_encode(array('error' => 'Access denied'));
            }
                break;    
 
    }

