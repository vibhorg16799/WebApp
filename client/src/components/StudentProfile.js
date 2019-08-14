// This file contains the view and functionality for the Student Profile page 

import React, { Component } from 'react'; // imports react
import jwt_decode from 'jwt-decode'; // imports jwt decode module
import { loginAllergen, allergenName } from './UserFunctions';

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


            // Get Allergen Information From list of RFID Bands 
         //   let rfidCodes = JSON.parse(rfidToken); // parses text to json object 

         //   let minCode = (rfidCodes[0])

         //   console.log(rfidCodes[0]);

         //   loginAllergen(minCode); // passes rfidCodes json object to loginAllergen method

          //  const allergensExtracted = localStorage.getItem('allergyToken'); // sets allergyToken sent from loginAllergen method to const allergensExtracted

          //  console.log(allergensExtracted);

          //  let allergenID = JSON.parse(allergensExtracted); // parses text to json object

          ///  allergenName(allergenID); // passes allergenID json object to allergenName method
        
         //   const allergenNameExtracted = localStorage.getItem('allergyNameToken');

        //    const allergenNameDecoded = jwt_decode(allergenNameExtracted);

         //   console.log("Allergen Name " + allergenNameDecoded);
            
            const allergyNames = localStorage.getItem('allergyNameList');
            
            console.log("rfidToken " + rfidToken);

            const conditionNames = localStorage.getItem('conditionNameList');

            const diseaseNames = localStorage.getItem('diseaseNameList')

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
            allergens: allergyNames,
            diseases: diseaseNames,
            conditions: conditionNames,
        })

       
    }

    catch(error) {
        console.log("error: " + error);
    }
    finally {
        this.forceUpdate()

         // Integer ID to String Value Conversions
        /*
         const Pediatricians = ['Dr. Peters', 'Dr.Matthers', 'Dr.Gupta', 'Dr.Gine']
         const School = ['Wheeler','Middletown','J-Town','Anchorage']
         const bloodTypesList = ['O+','O-','A+','A-','B+','B-','AB+','AB-']
 
         if(this.state.pediatricianID === 1){
             this.setState({pediatricianID: Pediatricians[0]})
         }
         else if(this.state.pediatricianID === 2){
             this.setState({pediatricianID: Pediatricians[1]})
         }
         else if(this.state.pediatricianID === 3){
             this.setState({pediatricianID: Pediatricians[2]})
         }
         else {
             this.setState({pediatricianID: Pediatricians[3]})
         }
 
 
         if(this.state.school === 1){
             this.setState({school: School[0]})
         }
         else if(this.state.school === 2){
             this.setState({school: School[1]})
         }
         else if(this.state.school === 3){
             this.setState({school: School[2]})
         }
         else if(this.state.school === 4){
             this.setState({school: School[3]})
         }
 
         if(this.state.bloodType === 1){
             this.setState({bloodType: bloodTypesList[0]})
         }
         else if(this.state.bloodType === 2){
             this.setState({bloodType: bloodTypesList[1]})
         }
         else if(this.state.bloodType === 3){
             this.setState({bloodType: bloodTypesList[2]})
         }
         else if(this.state.bloodType === 4){
             this.setState({blodType: bloodTypesList[3]})
         }
         else if(this.state.bloodType === 5){
             this.setState({blodType: bloodTypesList[4]})
         }
         else if(this.state.bloodType === 6){
             this.setState({blodType: bloodTypesList[5]})
         }
         else if(this.state.bloodType === 7){
             this.setState({blodType: bloodTypesList[6]})
         }
         else{
             this.setState({blodType: bloodTypesList[7]})
         }*/

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