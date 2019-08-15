// This file contains the view and functionality for the School Profile page 

import React, { Component } from 'react'; // imports react
import jwt_decode from 'jwt-decode'; // imports jwt decode module

class Profile extends Component {
    constructor() {
        super()
        this.state = { // state of profile component 
            profilePhoto: '',
            email: '',
            address: '',
            name: '',
            phoneNumber: '',
            nursePhone: '',
            nurseRoom: '',
        }
 
    }

    //Precondition: page loaded correctly
    //Postcondition: state is set and page is reloaded 
    componentDidMount() {

        try{
        
        // JWT tokens sent from express API 
        const token = localStorage.getItem('usertoken'); // token sent from users/login route
 
        const nurseToken = localStorage.getItem('nurseToken'); // gets token sent from nurses/login route

        const schoolToken = localStorage.getItem('schoolToken'); //token sent from schools/login route


        // Decoding of JWT tokens containing user Data
        const decoded = jwt_decode(token); // decodes user response token 
 

        const schoolDecoded = jwt_decode(schoolToken); // decodes schools/login token


        const nurseDecoded = jwt_decode(nurseToken);


        this.setState({ // sets state to decoded user and school token contents 
            profilePhoto: decoded.profilePhoto,
            email: decoded.email,
            address: decoded.address,
            name: schoolDecoded.name,
            phoneNumber: schoolDecoded.phoneNumber,
            nursePhone: nurseDecoded.phoneNumber,
            nurseRoom: nurseDecoded.roomNumber,
        })
        
    }
        catch(error){
        console.log("error:" + error);
    }
        finally{
            this.setState({});
            this.forceUpdate();
            //updates and refreshses web page  
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
                            <td>Name</td>
                            <td>{this.state.name}</td> 
                        </tr>
                        <tr>
                            <td>Phone Number</td>
                            <td>{this.state.phoneNumber}</td> 
                        </tr>
                        <tr>
                            <td>Nurse's Phone Number</td>
                            <td>{this.state.nursePhone}</td> 
                        </tr>
                        <tr>
                            <td>Nurse's Room Number</td>
                            <td>{this.state.nurseRoom}</td> 
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        )}
}



export default Profile;