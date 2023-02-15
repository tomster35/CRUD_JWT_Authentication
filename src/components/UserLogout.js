import { useNavigate } from "react-router-dom";
import {Button} from 'react-bootstrap';


export default function LogoutButton() {

    const navigate = useNavigate();

    const LogoutProcess = () => {
        if (window.confirm("Are you sure you want to log out?") == true){
            localStorage.clear();
            alert("User Logged out Succesfully")
            navigate("/")
            
        } else {
            return;
        }
    }

        return(
            <div>
                <Button style={{position: "absolute", right: 40, bottom: 40}}variant="secondary" type="button" onClick={LogoutProcess}> Logout!</Button>
            </div>
        )

}