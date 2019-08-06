// This file contains the view and functionality for the School Register page 

import React, { Component } from 'react'; // imports react 
import {registerStudent} from './UserFunctions' // imports registerNurse function




class StudentRegister extends Component {
    constructor(){
        super()
        this.state = { // state of StudentRegister component
        //    userID: '',                OBSOLETE FIELD
            pediatricianID: '',
            firstName: '',
            lastName: '',
            school: '',

        }

        this.onChange = this.onChange.bind(this) // calls onChange for focus change 
        this.onSubmit = this.onSubmit.bind(this) // calls OnSubmit when submit button is clicked 
    }

    // Precondition: focus is changed from one field to another 
    // Postcondition: Value input in field is set to state of field  
    onChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    // Precondition: submit button is clicked
    // Postcondition: newNurse object is created based on values in state of Register object and sent to regsiter function
    onSubmit(e){
        e.preventDefault()

        
        //newStudent object that holds data needed to register student
        const newStudent = {
        //    userID: this.state.userID,         OBSOLETE FIELD
            pediatricianID: this.state.pediatricianID,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            school: this.state.school,
 
        }
        // Sends newStudent object to registerStudent method, then push's user to studentregister2 page
        registerStudent(newStudent).then(res => {
                this.props.history.push(`/studentregister2`)
                
        })
    }

    // MAKE SURE this.state, the newStudent object and htmlFor, and name all match
    render() {
        return (
            <div className="countainer">
                <div classnam="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal"> </h1>
                        {/* <div className="form-group">
                                <label htmlFor="userID">User ID</label>
                                <input type="number"
                                 className="form-control"
                                name="userID"
                                placeholder="Enter User ID"
                                value={this.state.userID}
                                onChange={this.onChange}
                                />
                            </div>*/}
                            <div className="form-group">
                                <label htmlFor="firstName">First Name</label>
                                <input type="text"
                                 className="form-control"
                                name="firstName"
                                placeholder="Enter First Name"
                                value={this.state.firstName}
                                onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Last Name</label>
                                <input type="text"
                                 className="form-control"
                                name="lastName"
                                placeholder="Enter Last Name"
                                value={this.state.lastName}
                                onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="pediatricianID">Pediatrician</label>
                                <select
                                 className="form-control"
                                 name="pediatricianID"
                                 value={this.state.pediatricianID}
                                 onChange={this.onChange}
                                 >
                                     <option value="0">Select School</option>
                                     <option value="1">Dr.Peters</option>
                                     <option value="2">Dr.Matthers</option>
                                     <option value="3">Dr.Gupta</option>
                                     <option value="4">Dr.Gine</option>
                                </select> 
                            </div>
                            <div className="form-group">
                                <label htmlFor="school">School</label>
                                <select
                                 className="form-control"
                                 name="school"
                                 value={this.state.school}
                                 onChange={this.onChange}
                                 >
                                     <option value="0">Select School</option>
                                     <option value="1">Wheeler</option>
                                     <option value="2">Middletown</option>
                                     <option value="3">J-Town</option>
                                     <option value="4">Anchorage</option>
                                </select> 
                            </div>
                            <button type="submit"
                            className="btn btn-lg btn-primary btn-block"
                            >
                                Continue
                            </button>                       {/* Submit Button */}
                        </form>
                    </div>


                </div>

            </div>
        )
    }
}

export default StudentRegister