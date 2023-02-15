import {BrowserRouter, Routes, Route, ReactComponent, Link} from 'react-router-dom';
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import './App.css';
import ListEmployee from './components/ListEmployee';
import CreateEmployee from './components/CreateEmployee';
import EditEmployee from './components/EditEmployee';
import UserLogin from './components/UserLogin';


function App() {
  return (
    <div className="App" style={styles.background}>
     <h5> Kaseya Employees</h5>

     <BrowserRouter>

    <nav>
      <ul>
        <li>
          <Link to="employee/list">List Employees</Link>
        </li>
        <li>
          <Link to="employee/create">Create Employee</Link>
        </li> 
      </ul>
    </nav>

 
    <Routes>
   <Route index element={<UserLogin/>}/>
    <Route path="employee/list" element={<ListEmployee/>} />
    <Route path="employee/create" element={<CreateEmployee/>} />
    <Route path="employee/:EmployeeId" element={<EditEmployee/>} />
    </Routes>

    </BrowserRouter>
    </div>
 
     
  );
}
const styles = {
  background: {
    backgroundColor: 'lightgrey',
    height: '100vh'
  }
};
export default App;
