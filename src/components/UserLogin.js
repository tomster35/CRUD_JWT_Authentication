import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserLogin() {

    const navigate = useNavigate();
    const [inputs, setInputs] = useState({})

    //collecting name and value from input boxes
    const handleChange = (event) => {
        const name= event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value})); 
         
    }

    const handleSubmit = (event) => {
        event.preventDefault(); //preventing prompt behaviour
       
        axios.post('http://localhost:80/api/Authenticate/', inputs).then(function(response){
       //console.log(response.data.token);
        localStorage.setItem("token", response.data.token);
        navigate('/employee/list');
    })
        .catch((error)=>{
            if(error.response.status === 401){
                window.alert("Login Credentials are Unauthorized, please try again.");
            } 
    });
}
    return(
        <div>
        <h1>Login</h1>

        <center>
        <form onSubmit={(handleSubmit)}>
           
             <table cellSpacing="10">
               
                <tbody>
                    <tr>
                        <th>
                        <label>Username: </label>
                        </th>
                        <td>   
                        <input type="text" name="Username" onChange={handleChange}/>
                        </td>
                    </tr>    

                    <tr>
                        <th>
                        <label>Password: </label>
                        </th>
                        <td>   
                        <input type="password" name="Password" onChange={handleChange}/>
                        </td>
                    </tr>    
                   <tr>
                   <td colSpan="2" align ="right">
                    <button>Login</button>
                    </td>
                    </tr>
                </tbody>   
             </table>   
        </form>
        </center>
        </div>  
    )
}