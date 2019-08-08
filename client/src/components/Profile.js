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
        }
 
    }

    //Precondition: page loaded correctly
    //Postcondition: state is set and page is reloaded 
    componentDidMount() {

        try{
        
        const token = localStorage.usertoken // token sent from users/login route
 
        const decoded = jwt_decode(token) // decodes user response token 
 
        const schoolToken = localStorage.schoolToken //token sent from schools/login route

        const schoolDecoded = jwt_decode(schoolToken) // decodes schools/login token


        this.setState({ // sets state to decoded user and school token contents 
            profilePhoto: decoded.profilePhoto,
            email: decoded.email,
            address: decoded.address,
            name: schoolDecoded.name,
            phoneNumber: schoolDecoded.phoneNumber
        })
        
    }
        catch(error){
        console.log("error:" + error);
    }
        finally{
            this.forceUpdate()
            console.log(this.state.email)
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
                    </tbody>
                </table>
            </div>
        </div>
        )}
}



export default Profile;