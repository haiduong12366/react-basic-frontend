import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router} from 'react-router-dom'
import {Routes, Route} from "react-router";
import ListEmployeeComponent from './components/ListEmployeeComponent'
import CreateEmployeeComponent from './components/CreateEmployeeComponent'
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import UpdateEmployeeComponent from './components/UpdateEmployeeComponent';
import ViewEmployeeComponent from './components/ViewEmployeeComponent';

function App() {
  return (
    <div>
      <Router>
      <HeaderComponent/>
        <div className="container">
        <Routes>
            <Route path = "/" element={<ListEmployeeComponent/>}></Route>
            <Route path = "/employees" element={<ListEmployeeComponent/>}></Route>
            {/* <Route path = "/add-employee" element={<CreateEmployeeComponent/>}></Route> */}
            <Route path = "/update-employee/:id" element={<UpdateEmployeeComponent/>}></Route>
            <Route path = "/view-employee/:id" element={<ViewEmployeeComponent/>}></Route>
        </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
