import React, {Component} from "react";
import EmployeeService from "../service/EmployeeService";
import { Link } from 'react-router-dom'
class ListEmployeeComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            employees:[],
            message:''
        }
        this.deleteEmployee = this.deleteEmployee.bind(this)
        this.editEmployee =  this.editEmployee.bind(this)
    }
    viewEmployee(id){
        window.location.href=`/view-employee/${id}`;
    }

    deleteEmployee(id){
        fetch('http://localhost:8080/api/v1/employees/'+id, 
        {
          method: 'DELETE',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(id)
        }
      )
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    this.setState({employees: this.state.employees.filter(employee => employee.id !== id)})
    return response.json();
  })
  
    }

    editEmployee(id){
        window.location.href=`/update-employee/${id}`;
    }

    componentDidMount(){
        fetch('http://localhost:8080/api/v1/employees', 
        {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // Xử lý dữ liệu sau khi nhận được từ API
    const employees = data.body;
    const message = data.message;
    
    this.setState({ employees, message });
    console.log('employees => ', employees);
  })
  .catch(error => {
    console.error('Error fetching employees:', error);
  });
        

    }
    
        // EmployeeService.getEmployees().then((res)=>{
        //     this.setState({employees: res.data.body});
        //     this.setState({message: res.data.message});
        //     console.log('employee => ' + JSON.stringify(this.state.employees));
        // });

    render(){
        return(
            <div className="container">
                <h2 className="text-center">Employees List</h2>
                <div className="r">
                
                <Link to="/update-employee/-1">
                        <button className='btn btn-primary'>Add Employee</button>
                    </Link> 
                </div>
                <div>
                {this.state.message}
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Employee First Name</th>
                                <th>Employee Last Name</th>
                                <th>Employee Email Id</th>
                                <th>Actions</th>


                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.employees.map(
                                    employee =>
                                        <tr key = {employee.id}>
                                            <td>{employee.firstName}</td>
                                            <td>{employee.lastName}</td>
                                            <td>{employee.emailId}</td>
                                            <td><button onClick={()=> this.editEmployee(employee.id) } className='btn btn-info'>Update</button>
                                            <button onClick={()=> this.deleteEmployee(employee.id) } className='btn btn-danger' style={{marginLeft:"10px"}}>Delete</button>
                                            <button onClick={()=> this.viewEmployee(employee.id) } className='btn btn-info' style={{marginLeft:"10px"}}>View</button>
                                            </td>
                                        </tr>
                                    
                                )
                            }
                        </tbody>
                    </table>


                </div>

            </div>
        )
    }
}
export default ListEmployeeComponent