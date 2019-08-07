// This file contains the view and functionality for the Student Profile page 

import React, { Component } from 'react'; // imports react
import jwt_decode from 'jwt-decode'; // imports jwt decode module

class Profile extends Component {
    constructor() {
        super()
        this.state = { // state of profile component 
            profilePhoto: '',
            email: '',
            address: '',
            pediatricianID: '',
            firstName: '',
            lastName: '',
            school: '',
        }
        
    }

    //Precondition: page loaded correctly
    //Postcondition: state is set and page is reloaded 
    componentDidMount() {

        const token = localStorage.usertoken // token sent from users/login route
 
        const decoded = jwt_decode(token) // decodes user response token 

        const studentToken = localStorage.studentToken // token sent from students/login route

        const studentDecoded = jwt_decode(studentToken); // decodes students/login token


            this.setState({ // sets state to decoded user and student token contents
            profilePhoto: decoded.profilePhoto,
            email: decoded.email,
            address: decoded.address,
            pediatricianID: studentDecoded.pediatricianID,
            firstName: studentDecoded.firstName,
            lastName: studentDecoded.lastName,
            school: studentDecoded.school,
        })

    }

    render() {
        return(
        <div className="container">
            <div className="jumbotron mt-5">
                <div className="col-sm-8 mx-auto">
                    <h1 className="text-center">PROFILE</h1> 
                </div>
                <table className="table col-md-6 mx-auto">
                    <tbody>
                        <tr>
                            <td>Profile Photo</td>
                            <td>{this.state.profilePhoto}</td> 
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{this.state.email}</td> 
                        </tr>
                        <tr>
                            <td>Address</td>
                            <td>{this.state.address}</td> 
                        </tr>
                        <tr>
                            <td>Pediatrician</td>
                            <td>{this.state.pediatricianID}</td>
                        </tr>
                       <tr>
                            <td>First Name</td>
                            <td>{this.state.firstName}</td>
                        </tr>
                        <tr>
                            <td>Last Name</td>
                            <td>{this.state.lastName}</td>
                        </tr>
                        <tr>
                            <td>School</td>
                            <td>{this.state.school}</td>
                        </tr> 
                    </tbody>
                </table>
            </div>
        </div>
        )}
}

export default Profile;