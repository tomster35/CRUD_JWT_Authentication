import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LogoutButton from "./UserLogout";


export default function CreateEmployee() {

   
   
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({})

    const [selectedOption, setSelectedOption] = useState("");
    const [selectedActiveOption, setSelectedActiveOption] = useState("");



    //collecting name and value from input boxes

    const changeSelectedActive = (event) =>{
        setSelectedActiveOption(event.target.value)
    }

    const changeSelectedSkill = (event) =>{
        setSelectedOption(event.target.value)
    }
    

    const handleSkillChange = (event) => {
        const name= event.target.name;
        const value = event.target.value;
        changeSelectedSkill(event);
        setInputs(values => ({...values, [name]: value})); 
    }


    const handleActiveChange = (event) => {
        const name= event.target.name;
        const value = event.target.value;
        changeSelectedActive(event);
        setInputs(values => ({...values, [name]: value})); 
    }

    const handleChange = (event) => {
        const name= event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value})); 
    }
   
    const handleSubmit = (event) => {
        event.preventDefault(); //preventing prompt behaviour
       
    axios.post('http://localhost:80/api/Employees/', inputs, {'headers': {'Authorization': `Bearer ${localStorage.getItem('token')}`}})
    .then(function(response){
        console.log(response.data);
        navigate('/employee/list');
    })
    .catch((error)=>{
        if(error.response.status === 400){
            window.alert("Email already exists, please try again.");
        } 
    });
}
    return(
        <div>
        <h1>Create Employee</h1>
        <center>
        <form onSubmit={(handleSubmit)}>
             <table cellSpacing="10">
               
                <tbody>
                    <tr>
                        <th>
                        <label>First Name: </label>
                        </th>
                        <td>   
                        <input type="text" name="FirstName" onChange={handleChange} required/>
                        </td>
                    </tr>    

                    <tr>
                        <th>
                        <label>Last Name: </label>
                        </th>
                        <td>   
                        <input type="text" name="LastName" onChange={handleChange} required/>
                        </td>
                    </tr>    

                    <tr>
                        <th>
                        <label>D.O.B: </label>
                        </th>
                        <td>   
                        <input type="date" name="DOB"onChange={handleChange} required/>
                        </td>
                    </tr>    

                    <tr>
                        <th>
                        <label>Email: </label>
                        </th>
                        <td>   
                        <input type="text" name="Email" onChange={handleChange}pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required/>
                        </td>
                    </tr>    

                    <tr>
                        <th>
                        <label>Skill Level: </label>
                        </th>
                        <td>   
                            <select value={selectedOption} name="SkillLevel" id="SkillLevel"  onChange={handleSkillChange} required>
                            <option value="" disabled >Please select your Skill Level</option>    
                            <option value="1">Beginner</option>
                            <option value="2">Intermediate</option>
                            <option value="3">Expert</option>
                            </select>
                        </td>
                    </tr>    

                    <tr>
                        <th>
                        <label>Active: </label>
                        </th>
                        <td>   
                         
                            <select value={selectedActiveOption} name="Active" id="Active" onChange={handleActiveChange} required>
                            <option value="" disabled >Select</option>  
                            <option value="0">No</option>
                            <option value="1">Yes</option>
                            </select>
                        </td>
                    </tr>  

                     <tr>
                        <th>
                        <label>Age: </label>
                        </th>
                        <td>   
                        <input type="number" name="Age" onChange={handleChange} required/>
                        </td>
                    </tr>    
 
                   <tr>
                   <td colSpan="2" align ="right">
                    <button>Save</button>
                    </td>
                    </tr>
                </tbody>   
               
             </table>   
        
           
       
        </form>
        </center>
        <LogoutButton/>
        </div>  
        
    )

}