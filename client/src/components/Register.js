// This file contains the view and functionality for the Register page 

import React, { Component } from 'react'; // imports react 
import {register} from './UserFunctions' // imports register function from userfunctions
import {registerStudent} from './UserFunctions'
import {registerSchool} from './UserFunctions'




class Register extends Component {
    constructor(){
        super()
        this.state = { // state of register compenent 
            email: '',
            password: '',
            address: '',
            profilePhoto: '',
            userType: '', 
        }

        this.onChange = this.onChange.bind(this) // calls onChange() when focus is changed from one field to another
        this.onSubmit = this.onSubmit.bind(this) // calls OnSubmit() when submit button is clicked 
    }


    // Precondition: focus is changed from one field to another 
    // Postcondition: Value input in field is set to state of field  
    onChange(e){
        this.setState({[e.target.name]: e.target.value})
    }


    // Precondition: submit button is clicked
    // Postcondition: newUser object is created based on values in state of Register object and sent to regsiter function
    onSubmit(e){
        e.preventDefault()

        //newUser object that holds data needed to register newUser
        const newUser = {
            email: this.state.email,
            password: this.state.password,
            address: this.state.address,
            profilePhoto: this.state.profilePhoto,
            userType: this.state.userType,
        }

        // Sends newUser object to register method 
        register(newUser).then(res => {

           //     Push's user to respective form for school or student to continue signing up account
                if(this.state.userType === 'school')
                {
                   /* const newSchool = {
                        userID: 100,
                        name: 'PLACEHOLDER1' ,
                        phoneNumber: 'PLACEHOLDER1' ,
            
                    }
                    registerSchool(newSchool); */
                    this.props.history.push(`/schoolregister`);

                }
                else{
                 /*   const newStudent = {
                        userID: 97,
                        pediatricianID: 1,
                        firstName: 'PLACEHOLDER',
                        lastName: 'PLACEHOLDER',
                        school: 2,
                    }
                    registerStudent(newStudent); */
                    this.props.history.push(`/studentregister`);
                }
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
                                <label htmlFor="email">Email</label> 
                                <input type="email"
                                 className="form-control"
                                name="email"
                                placeholder="Enter Email"
                                value={this.state.email}
                                onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label> 
                                <input type="password"
                                 className="form-control"
                                name="password"
                                placeholder="Enter Password"
                                value={this.state.password}
                                onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">Address</label> 
                                <input type="text"
                                 className="form-control"
                                name="address"
                                placeholder="Enter Address"
                                value={this.state.address}
                                onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="profilePhoto">Profile Photo</label> 
                                <br></br>
                                <input type="file"
                                 className="browse-button"
                                name="profilePhoto"
                                placeholder="Upload Profile Photo"
                                value={this.state.profilePhoto}
                                onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="userType">User Type</label> 

                                <br></br>
                                
                                <label> 
                                    <input type="radio"
                                    name="userType"
                                    value="student"
                                    checked={this.state.userType === "student"} 
                                    onChange={this.onChange}/>
                                    student 
                                </label>                                    

                                <br></br>
                            
                                <label>
                                    <input type="radio" 
                                    name="userType"
                                    value="school"
                                    checked={this.state.userType === "school"}
                                    onChange={this.onChange}/>
                                    school 
                                </label>                                    
                            </div>

                            <button type="submit"
                            className="btn btn-lg btn-primary btn-block"
                            >
                                Continue
                            </button>                                       {/* Submit Button */}
                        </form>
                    </div>


                </div>

            </div>
        )
    }
}

export default Register