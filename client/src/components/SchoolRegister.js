// This file contains the view and functionality for the SchoolRegister page 

import React, { Component } from 'react'; // imports react 
import {registerSchool} from './UserFunctions' // imports register school function 




class SchoolRegister extends Component {
    constructor(){
        super()
        this.state = { // state of SchoolRegister component 
        //    userID: '',   OBSOLETE FIELD, NO LONGER CAPTURED
            name: '',
            phoneNumber: '',

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
    // Postcondition: newSchool object is created based on values in state of Register object and sent to regsiter function
    onSubmit(e){
        e.preventDefault()

        //newSchool object that holds data needed to register newUser
        const newSchool = {
        //    userID: this.state.userID,     OBSOLETE FIELD, NO LONGER CAPTURED
            name: this.state.name,
            phoneNumber: this.state.phoneNumber,

            
        }

         // Sends newSchool object to registerSchool method, then push's user to schoolregister2 page
        registerSchool(newSchool).then(res => {
                this.props.history.push(`/schoolregister2`)
        })
    }

    render() {
        return (
            <div className="countainer">
                <div classnam="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal"> </h1>
                           {/*  <div className="form-group">
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
                                <label htmlFor="name">School</label> 
                                <input type="text"
                                 className="form-control"
                                name="name"
                                placeholder="Enter School's Name"
                                value={this.state.name}
                                onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phoneNumber">Phone Number</label> 
                                <input type="text"
                                 className="form-control"
                                name="phoneNumber"
                                placeholder="Enter Phone Number"
                                value={this.state.phoneNumber}
                                onChange={this.onChange}
                                />
                            </div>
                            <button type="submit"
                            className="btn btn-lg btn-primary btn-block"
                            >
                                Continue
                            </button>                                          {/* Submit Button */}
                        </form>
                    </div>


                </div>

            </div>
        )
    }
}

export default SchoolRegister