// This file contains the view and functionality for the SchoolRegister2 page 

import React, { Component } from 'react'; // imports react 
import {registerNurse} from './UserFunctions' // imports registerNurse function




class SchoolRegister2 extends Component {
    constructor(){
        super()
        this.state = { // state of SchoolRegister2 component 
            userID: '',
            phoneNumber: '',
            roomNumber: '',

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

        //newNurse object that holds data needed to register nurse
        const newNurse = {
            userID: this.state.userID,
            phoneNumber: this.state.phoneNumber,
            roomNumber: this.state.roomNumber, 
            
        }

        // Sends newNurse object to registerNurse method, then push's user to login page
        registerNurse(newNurse).then(res => {
                this.props.history.push(`/login`)
        })
    }

    render() {
        return (
            <div className="countainer">
                <div classnam="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal"> </h1>
                            <div className="form-group">
                                <label htmlFor="userID">User ID</label>                 
                                <input type="number"
                                 className="form-control"
                                name="userID"
                                placeholder="Enter User ID"
                                value={this.state.userID}
                                onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phoneNumber">Nurse's Phone Number</label> 
                                <input type="text"
                                 className="form-control"
                                name="phoneNumber"
                                placeholder="Enter Nurse's Phone Number"
                                value={this.state.phoneNumber}
                                onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="roomNumber">Nurse's Room Number</label>
                                <input type="number"
                                 className="form-control"
                                name="roomNumber"
                                placeholder="Enter Nurse's Room Number"
                                value={this.state.roomNumber}
                                onChange={this.onChange}
                                />
                            </div>
                            <button type="submit"
                            className="btn btn-lg btn-primary btn-block"
                            >
                                Register
                            </button>                       {/* Submit Button */}
                        </form>
                    </div>


                </div>

            </div>
        )
    }
}

export default SchoolRegister2