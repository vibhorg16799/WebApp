// This file contains the view and functionality for the Login page 

import React, { Component } from 'react'; // imports react 
import {login, registerScan, getUserID, getLogInInfo, loginScan, loginSchool, loginStudent, isSchool, loginNurse, loginPediatrician, loginEmergencyInfo, loginBloodChart, loginRFID, loginMedicalCondition, loginAllergen,allergyList, conditionList, loginContagiousDisease, diseaseList} from './UserFunctions' // imports functions from UserFunctions
import jwt_decode from 'jwt-decode'; // imports jwt decode module



class Login extends Component {
    constructor(){
        super()
        this.state = { //State of login component 
            email: '',
            password: '',
            bandID: ''
        }

        this.onChange = this.onChange.bind(this) // changing focus from fields calls onChange function 
        this.onSubmit = this.onSubmit.bind(this) // clicking submit button calls submit function 
    }

    // Precondition: focus is changes from one field to another 
    // Postcondition: state is set to field input 
    onChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    // Precondition: submit button is clicked 
    // Postcondition: user is logged in 
    onSubmit(e){
        e.preventDefault()
        const { history } = this.props; // helper variable to fix issue of nested functions not allowing page push 

        // holds values needed to log in user 
        const user = { 
            email: this.state.email,
            password: this.state.password
        }

        // holds values needed to log in user via scanning log in 
        const scan = {
            bandID: this.state.bandID
        }

        // if no bandID is scanned in the page will attempt to login from the username and password fields
        if(this.state.bandID === '') {
        
            login(user).then(user => {
                console.log(jwt_decode(user))
                if(user) {
                //    loginSchool(jwt_decode(user)).then(user => {
                        var userDecoded = (jwt_decode(user));
                        isSchool(userDecoded).then(isSchool => {
                        // if user is school we return all school attributes 
                        if(isSchool){
                            try{
                            loginSchool(jwt_decode(user));
                            console.log(jwt_decode(user));
                            loginNurse(jwt_decode(user));
                            
                            }
                            catch(error){
                                console.log(error);
                            }
                            finally{
                                history.push(`/profile`); 
                            }
                        }
                        // if user is not school, user is student, we return student attributes
                        else{
                            try{
                            loginStudent(jwt_decode(user));
                            console.log(jwt_decode(user));
                          //  loginPediatrician(jwt_decode(user)); Arent returning pediatrician data yet 
                            loginEmergencyInfo(jwt_decode(user));
                            loginBloodChart(jwt_decode(user));
                            loginRFID(jwt_decode(user)).then( res => {

                            const rfidToken = localStorage.getItem('rfidToken'); // token sent from rfids/bands

                            let rfidCodes = JSON.parse(rfidToken); // parses rfidCode from string to JSON

                            let minCode = rfidCodes[0]; // gets the 0th RFID code from array, which is the minimum value RFID code

                            console.log(rfidCodes[0]); 

                            // returns list of allergens associated to bandID
                            loginAllergen(minCode).then( res =>{
                            
                            const allergensExtracted = localStorage.getItem('allergyToken'); // sets allergyToken sent from loginAllergen method to const allergensExtracted

                            console.log(allergensExtracted);

                            let allergenID = JSON.parse(allergensExtracted); // parses text to json object

                         // PREVIOUS WORKING VAR FOR ALLERGYNAME   let firstAllergen = allergenID[0];

                            let allergy = {
                                allergyID1: allergenID[0] ,
                                allergyID2: allergenID[1],
                                allergyID3: allergenID[2],
                                allergyID4: allergenID[3],
                            }
                            console.log(allergy);

                            allergyList(allergy); // gets names of allergies associated to users RFID bands

                           // allergenName(allergenID); // passes allergenID json object to allergenName method

                         //   history.push(`/studentprofile`);
                        })
                        // returns list of medical conditions associated to bandID
                        loginMedicalCondition(minCode).then( res => {

                            const conditionsExtracted = localStorage.getItem('conditionToken'); // sets medical condition token to local const

                            console.log(conditionsExtracted);

                            let conditionID = JSON.parse(conditionsExtracted); // parses text to json object

                            // object that holds medical conditions of RFID band
                            let condition = {
                                conditionID1: conditionID[0],
                                conditionID2: conditionID[1],
                                conditionID3: conditionID[2],
                                conditionID4: conditionID[3],
                            }
                            console.log(condition);

                            conditionList(condition); // gets names of conditions associated to users RFID bands
                        })

                        loginContagiousDisease(minCode).then( res => {

                            const diseaseExtracted = localStorage.getItem('diseaseToken') // sets disease token to local const

                            console.log(diseaseExtracted);

                            let diseaseID = JSON.parse(diseaseExtracted); // parses text to json object

                            //object that holds diseases of RFID band
                            let disease = {
                                diseaseID1: diseaseID[0],
                                diseaseID2: diseaseID[1],
                                diseaseID3: diseaseID[2],
                                diseaseID4: diseaseID[3],
                            }
                            console.log(disease);

                            diseaseList(disease); // gets names of disease's associate to users RFID bands
                            
                        })
                        })
                    }
                    catch(error){
                        console.log(error);
                    }
                    finally{
                        
                        this.forceUpdate();
                        history.push(`/studentprofile`);
                    }
                        
                        
                        }
                    })
                    
                }
            }) 
    }
    else{
        console.log(user); // logs values for user var 
        try{

            registerScan(scan) // passess scan object to resgisterScan function 

            var userID = getUserID(scan) // sets response from getUserID with scan sent to variable userID 

            // calls .then of userID to get data of userID
            userID.then(function(result) {

                console.log(result); // logs userID 
                var loginfo = getLogInInfo(result.userID) // puts the resulting userID into getLogInInfo function, sets the logInInfo result to loginfo variable 

                // calls .then  of loginfo to get data of loginfo
                loginfo.then(function(user){  

                console.log(user); // logs log in info, now stored in user object 

                // calls loginScan function for object user object, then shows user their profile 
                loginScan(user).then(user => {
                    if(user) {
                        
                        var userDecoded = (jwt_decode(user));
                        isSchool(userDecoded).then(isSchool => {

                            //if user is school we return all school attributes
                            if(isSchool){
                                loginSchool(jwt_decode(user));
                                console.log(jwt_decode(user));
                                loginNurse(jwt_decode(user));
                                history.push(`/profile`);
                                //removes student token from local storage
                            }
                            //if user is not school, user is student, we return student attributes, temporary solution to signign out apropriate tokens
                            else{
                                loginStudent(jwt_decode(user));
                                console.log(jwt_decode(user));
                                loginPediatrician(jwt_decode(user));
                                loginEmergencyInfo(jwt_decode(user));
                                loginBloodChart(jwt_decode(user));
                                loginRFID(jwt_decode(user)).then( res => {

                            
                                    const rfidToken = localStorage.getItem('rfidToken'); // token sent from rfids/bands
                                    let rfidCodes = JSON.parse(rfidToken); // parses rfidCode from string to JSON
                                    let minCode = rfidCodes[0]; // gets the 0th RFID code from array, which is the minimum value RFID code
                                    console.log(rfidCodes[0]); // sends min code to login allergen
                                    loginAllergen(minCode).then( res =>{
        
                                    
                                    const allergensExtracted = localStorage.getItem('allergyToken'); // sets allergyToken sent from loginAllergen method to const allergensExtracted
                                    console.log(allergensExtracted);
                                    let allergenID = JSON.parse(allergensExtracted); // parses text to json object
                                 // PREVIOUS WORKING VAR FOR ALLERGYNAME   let firstAllergen = allergenID[0];
                                    let allergy = {
                                        allergyID1: allergenID[0] ,
                                        allergyID2: allergenID[1],
                                        allergyID3: allergenID[2],
                                        allergyID4: allergenID[3],
                                    }
                                    console.log(allergy);
                                    allergyList(allergy);
                                   // allergenName(allergenID); // passes allergenID json object to allergenName method
                                  //  history.push(`/studentprofile`);
                                })
                                loginMedicalCondition(minCode).then( res => {

                                    const conditionsExtracted = localStorage.getItem('conditionToken'); // sets medical condition token to local const
        
                                    console.log(conditionsExtracted);
        
                                    let conditionID = JSON.parse(conditionsExtracted); // parses text to json object
        
                                    // object that holds medical conditions of RFID band
                                    let condition = {
                                        conditionID1: conditionID[0],
                                        conditionID2: conditionID[1],
                                        conditionID3: conditionID[2],
                                        conditionID4: conditionID[3],
                                    }
                                    console.log(condition);
        
                                    conditionList(condition); // gets names of conditions associated to users RFID bands
                                })
        
                                loginContagiousDisease(minCode).then( res => {
        
                                    const diseaseExtracted = localStorage.getItem('diseaseToken') // sets disease token to local const
        
                                    console.log(diseaseExtracted);
        
                                    let diseaseID = JSON.parse(diseaseExtracted); // parses text to json object
        
                                    //object that holds diseases of RFID band
                                    let disease = {
                                        diseaseID1: diseaseID[0],
                                        diseaseID2: diseaseID[1],
                                        diseaseID3: diseaseID[2],
                                        diseaseID4: diseaseID[3],
                                    }
                                    console.log(disease);
        
                                    diseaseList(disease); // gets names of disease's associate to users RFID bands
                                    history.push(`/studentprofile`);
                                })
                                })
                            }
                        })
                    }
                })
            })
            })
        }
        catch(error){
            
            console.log(error); // error handling 

        }
        finally{

                this.forceUpdate()
            
        }
    }
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
                                <input type="text"
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
                            <br></br>
                            <div align="center">
                            <p>or</p>
                            </div>
                            <h1 className="h3 mb-3 font-weight-normal"> </h1>
                            <div className="form-group">
                                <label htmlFor="bandID">Scan Bracelet</label> 
                                <input type="text"
                                 className="form-control"
                                name="bandID"
                                placeholder="RFID Code"
                                value={this.state.bandID}
                                onChange={this.onChange}
                                />
                            </div>
                            <button type="submit" 
                            className="btn btn-lg btn-primary btn-block"
                            >
                                Sign in
                            </button> {/* Submit Button */}
                        </form>
                    </div>


                </div>

            </div>
        )
    }
}

export default Login 