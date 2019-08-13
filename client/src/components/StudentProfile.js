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
            bloodType: '',
            emergencyContact1: '',
            emergencyContact2: '',
            rfidCodes: [],
            
        }
        
    }
    

    //Precondition: page loaded correctly
    //Postcondition: state is set and page is reloaded 
    componentDidMount() {

        try{

            // JWT Tokens
            const token = localStorage.getItem('usertoken') // token sent from users/login route

            const studentToken = localStorage.getItem('studentToken') // token sent from students/login route

            const rfidToken = localStorage.getItem('rfidToken') // token sent from rfids/bands
 
            const emergencyToken = localStorage.getItem('emergencyToken') // token sent from emergenycinfos/login

            const bloodToken = localStorage.getItem('bloodToken') // token sent from bloodcharts/login


            // JWT Decoded
            const decoded = jwt_decode(token) // decodes user response token 
    
            const studentDecoded = jwt_decode(studentToken) // decodes students/login token

            const emergencyDecoded = jwt_decode(emergencyToken) // decodes emergencyinfos/login token

            const bloodDecoded = jwt_decode(bloodToken) // decodes bloodchart/login
            
        
            
            console.log("rfidToken " + rfidToken);

            this.setState({ // sets state to decoded user and student token contents
            profilePhoto: decoded.profilePhoto,
            email: decoded.email,
            address: decoded.address,
            pediatricianID: studentDecoded.pediatricianID,
            firstName: studentDecoded.firstName,
            lastName: studentDecoded.lastName,
            school: studentDecoded.school,
            bloodType: bloodDecoded.bloodType,
            emergencyContact1: emergencyDecoded.emergencyContact1,
            emergencyContact2: emergencyDecoded.emergencyContact2,
            rfidCodes: rfidToken,
        })
    }

    catch(error) {
        console.log("error: " + error);
    }
    finally {
        this.forceUpdate()

    }

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
                        <tr>
                            <td>Blood Type</td>
                            <td>{this.state.bloodType}</td>
                        </tr> 
                        <tr>
                            <td>Emergency Contact 1</td>
                            <td>{this.state.emergencyContact1}</td>
                        </tr> 
                        <tr>
                            <td>Emergency Contact 2</td>
                            <td>{this.state.emergencyContact2}</td>
                        </tr> 
                        <tr>
                            <td>RFID Codes</td>
                            <td>{this.state.rfidCodes}</td>
                        </tr> 
                    </tbody>
                </table>
            </div>
        </div>
        )}
}



export default Profile;