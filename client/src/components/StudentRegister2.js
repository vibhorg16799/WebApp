// This file contains the view and functionality for the StudentRegister 2 page 

import React, { Component } from 'react'; // imports react 
import {registerPediatrician} from './UserFunctions' // imports registerPediatrician function




class StudentRegister2 extends Component {
    constructor(){
        super()
        this.state = { // state of StudentRegister2 component
            userID: '',
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
    // Postcondition: newNurse object is created based on values in state of Register object and sent to regsiter function
    onSubmit(e){
        e.preventDefault()

        //newPediatrician object that holds data needed to register pediatrician
        const newPediatrician = {
            userID: this.state.userID,
            name: this.state.name,
            phoneNumber: this.state.phoneNumber, 
        }

        // Sends newPediatrician object to registerPediatrician method, then push's user to login page
        registerPediatrician(newPediatrician).then(res => {
                this.props.history.push(`/login`)
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
                                <label htmlFor="name">Pediatricians Name</label>
                                <input type="text"
                                 className="form-control"
                                name="name"
                                placeholder="Enter pediatrician's name"
                                value={this.state.name}
                                onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phoneNumber">Pediatricians Phone Number</label>
                                <input type="text"
                                 className="form-control"
                                name="phoneNumber"
                                placeholder="Enter pediatrician's phone number"
                                value={this.state.phoneNumber}
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

export default StudentRegister2