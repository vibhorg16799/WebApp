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
            allergens: [],
            diseases: [],
            conditions: [],
            
        }
        
    }
    

    //Precondition: page loaded correctly
    //Postcondition: state is set and page is reloaded 
    componentDidMount() { 

        try{

                // JWT Tokens sent from express API 
            const token = localStorage.getItem('usertoken'); // token sent from users/login route

            const studentToken = localStorage.getItem('studentToken'); // token sent from students/login route

            const rfidToken = localStorage.getItem('rfidToken'); // token sent from rfids/bands
 
            const emergencyToken = localStorage.getItem('emergencyToken'); // token sent from emergenycinfos/login

            const bloodToken = localStorage.getItem('bloodToken'); // token sent from bloodcharts/login

            const allergyNames = localStorage.getItem('allergyNameList');

            const conditionNames = localStorage.getItem('conditionNameList');

            const diseaseNames = localStorage.getItem('diseaseNameList');


            // Decoding of JWT tokens containing user Data
            const decoded = jwt_decode(token) // decodes user response token 
    
            const studentDecoded = jwt_decode(studentToken) // decodes students/login token

            const emergencyDecoded = jwt_decode(emergencyToken) // decodes emergencyinfos/login token

            const bloodDecoded = jwt_decode(bloodToken) // decodes bloodchart/login

            // sets state to decoded user and student token contents
            this.setState({ 
            profilePhoto: decoded.profilePhoto,
            email: decoded.email,
            address: decoded.address,
           // pediatricianID: studentDecoded.pediatricianID,  Handled below
            firstName: studentDecoded.firstName,
            lastName: studentDecoded.lastName,
           // school: studentDecoded.school,                  Handled below
           // bloodType: bloodDecoded.bloodType,              Handled below
            emergencyContact1: emergencyDecoded.emergencyContact1,
            emergencyContact2: emergencyDecoded.emergencyContact2,
            rfidCodes: rfidToken,
            allergens: allergyNames,
            diseases: diseaseNames,
            conditions: conditionNames,
        })

         // Integer ID to String Value Conversions
        
         const Pediatricians = ['Dr. Peters', 'Dr.Matthers', 'Dr.Gupta', 'Dr.Gine']
         const School = ['Wheeler','Middletown','J-Town','Anchorage']
         const bloodTypesList = ['O+','O-','A+','A-','B+','B-','AB+','AB-']
 
         if(studentDecoded.pediatricianID === 1){
             this.setState({pediatricianID: Pediatricians[0]})
         }
         else if(studentDecoded.pediatricianID === 2){
             this.setState({pediatricianID: Pediatricians[1]})
         }
         else if(studentDecoded.pediatricianID === 3){
             this.setState({pediatricianID: Pediatricians[2]})
         }
         else {
             this.setState({pediatricianID: Pediatricians[3]})
         }
 
 
         if(studentDecoded.school === 1){
             this.setState({school: School[0]})
         }
         else if(studentDecoded.school === 2){
             this.setState({school: School[1]})
         }
         else if(studentDecoded.school === 3){
             this.setState({school: School[2]})
         }
         else if(studentDecoded.school === 4){
             this.setState({school: School[3]})
         }
 
         if(bloodDecoded.bloodType === 1){
             this.setState({bloodType: bloodTypesList[0]})
         }
         else if(bloodDecoded.bloodType === 2){
             this.setState({bloodType: bloodTypesList[1]})
         }
         else if(bloodDecoded.bloodType === 3){
             this.setState({bloodType: bloodTypesList[2]})
         }
         else if(bloodDecoded.bloodType === 4){
             this.setState({bloodType: bloodTypesList[3]})
         }
         else if(bloodDecoded.bloodType === 5){
             this.setState({bloodType: bloodTypesList[4]})
         }
         else if(bloodDecoded.bloodType === 6){
             this.setState({bloodType: bloodTypesList[5]})
         }
         else if(bloodDecoded.bloodType === 7){
             this.setState({bloodType: bloodTypesList[6]})
         }
         else{
             this.setState({bloodType: bloodTypesList[7]})
         }

         this.forceUpdate()
       
    }

    catch(error) {
        console.log("error: " + error);
    }
    finally {
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
                        <tr>
                            <td>Allergens</td>
                            <td>{this.state.allergens}</td>
                        </tr> 
                        <tr>
                            <td>Diseases</td>
                            <td>{this.state.diseases}</td>
                        </tr> 
                        <tr>
                            <td>Conditions</td>
                            <td>{this.state.conditions}</td>
                        </tr> 
                    </tbody>
                </table>
            </div>
        </div>
        )}
}



export default Profile;