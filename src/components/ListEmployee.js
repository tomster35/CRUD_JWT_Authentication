import axios from "axios"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {Button} from 'react-bootstrap';
import LogoutButton from "./UserLogout";

export default function ListEmployee() {

    const [employees, setEmployees] = useState([]);
    useEffect(() => {
        getEmployees();
    }, []);

    function getEmployees() {
        axios.get('http://localhost:80/api/Employees/', {'headers': {'Authorization': `Bearer ${localStorage.getItem('token')}`}}).then(function(response) {
            console.log(response.data);
           
            setEmployees(response.data);
        });
    }

    const deleteEmployee = (EmployeeId) => {
        axios.delete(`http://localhost:80/api/Employees/${EmployeeId}`, {'headers': {'Authorization': `Bearer ${localStorage.getItem('token')}`}}).then(function(response){
            console.log(response.data);
            getEmployees();
        });
    }


    return (
        <div>
            <h1>List Employees</h1>
            <center>
            <table>
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>D.O.B: </th>
                        <th>Email: </th>
                        <th>Skill Level:</th>
                        <th>Active:</th>
                        <th>Age:</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee, key) =>
                        <tr key={key}>
                            <td>{employee.EmployeeId}</td>
                            <td>{employee.FirstName}</td>
                            <td>{employee.LastName}</td>
                            <td>{employee.DOB}</td>
                            <td>{employee.Email}</td>
                            <td>{employee.SkillLevel === 1 ? 'Beginner' : employee.SkillLevel === 2 ? 'Intermediate' :  'Expert'}</td>
                            <td>{employee.Active === 0? 'No': 'Yes'}</td>
                            <td>{employee.Age}</td>
                            <td>
                                <Button variant={"success"}><a style={{textDecoration: "none", color: "white"}} href={`${employee.EmployeeId}`}> Edit </a></Button>

                            </td>

                            <td>
                                <Button variant={"danger"} onClick={() => deleteEmployee(employee.EmployeeId)}>Delete</Button>
                            </td>
                        </tr>
                    )}
                    
                </tbody>
            </table>
            </center>
            <LogoutButton/>
        </div>
        
    )
}




