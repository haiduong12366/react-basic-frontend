import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import EmployeeService from '../service/EmployeeService';
import { useParams } from 'react-router-dom';
export const withParams = Component => props => {
    let params = useParams();
    return <Component  {...props} params={params} />;
}
class UpdateEmployeeComponent extends Component {
    constructor(props){
        super(props)
        let {id} = props.params;
        this.state = {
            id: id,
            firstName: '',
            lastName:'',
            emailId:''
        
        }
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.saveEmployee =  this.saveEmployee.bind(this);

    }
    componentDidMount(){
        // Set the ID in the component's state
        if(this.state.id == -1)
            return;
        
        EmployeeService.getEmployeeById(this.state.id).then((res)=>{
            let employee = res.data;
            this.setState({
                firstName: employee.firstName,
                lastName: employee.lastName,
                emailId: employee.emailId
            })
        })
    }
    saveEmployee = (e) =>{
        e.preventDefault();
        let employee = {firstName: this.state.firstName,lastName: this.state.lastName,emailId:this.state.emailId};
        console.log('employee => ' + JSON.stringify(employee));
        if(this.state.id == -1){
            fetch('http://localhost:8080/api/v1/employees', {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(employee)
          }
        ).then(response => {
                if (!response.ok) {
                throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Addeed employee:', data);
                window.location.href='/employees';
            })
        }
        else{
        
       
        fetch('http://localhost:8080/api/v1/employees/' + this.state.id, {
            method: 'PUT',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(employee)
          }
        ).then(response => {
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Updated employee:', data);
            window.location.href='/employees';
        })
        .catch(error => {
            console.error('Error creating employee:', error);
        });
    }
        //EmployeeService.updateEmployee(employee,this.state.id).then(()=>{window.location.replace('/employees')})
    }
   

    changeFirstNameHandler(event){
        this.setState({firstName: event.target.value})
    }
    changeLastNameHandler = (event)=>{
        this.setState({lastName: event.target.value})
    }
    changeEmailHandler(event){
        this.setState({emailId: event.target.value})
    }

    getTitle(){
        if(this.state.id == -1){
            return <h3 className='text-center'>Add employee</h3>
        }
        return <h3 className='text-center'>Update employee</h3>
    }
    render() {
        return (
            <div>
                <h1>Employee Form</h1>
                <div className='row'>
                    <div className='card col-md-6 offset-md-3 offset-md-3'>
                        {
                            this.getTitle()
                        }
                        <div className='card-body'>
                            <form >
                                <div className='form-group'>
                                    <label htmlFor="">First name:</label>
                                    <input type="text" placeholder='First name' name='firstName' className='form-control' 
                                    value={this.state.firstName} onChange={this.changeFirstNameHandler}/>
                                </div>
                                <div className='form-group'>
                                    <label htmlFor="">Last name:</label>
                                    <input type="text" placeholder='Last name' name='lastName' className='form-control' 
                                    value={this.state.lastName} onChange={this.changeLastNameHandler}/>
                                </div>
                                <div className='form-group'>
                                    <label htmlFor="">Email :</label>
                                    <input type="text" placeholder='Email address' name='emailId' className='form-control' 
                                    value={this.state.emailId} onChange={this.changeEmailHandler}/>
                                </div>

                                <button className='btn btn-success' onClick={this.saveEmployee}>Save</button>
                                <Link to="/">
                                    <button className='btn btn-danger' style={{marginLeft: "10px"}}>Cancel</button>
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
//export default UpdateEmployeeComponent;
export default withParams(UpdateEmployeeComponent);