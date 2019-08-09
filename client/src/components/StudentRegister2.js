// This file contains the view and functionality for the StudentRegister 2 page 

import React, { Component } from 'react'; // imports react 
import {registerPediatrician, registerEmergencyContact, registerBloodChart, registerMedicalCondition, registerContagiousDisease, registerAllergy} from './UserFunctions' // imports registerPediatrician function




class StudentRegister2 extends Component {
    constructor(){
        super()
        this.state = { // state of StudentRegister2 component
        emergencyContact1: '',
        emergencyContact2: '',
        bloodType: '',
        bandID: '',
        conditionID: '',
        diseaseID: '',
        allergyID: '',

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

        // userEmergency object that holds data needed to register emergencyInfo
        const userEmergency = {
            emergencyContact1: this.state.emergencyContact1,
            emergencyContact2: this.state.emergencyContact2, 
        }

        // userBlood object that holds data needed to register bloodchart 
        const userBlood = {
            bloodType: this.state.bloodType,
        }

        // medicalCondition object holds data needed to register medical conditions for student 
        const medicalCondition = {
            bandID: this.state.bandID,
            conditionID: this.state.conditionID,
        }

        // medicalCondition object holds data needed to register contagious Diseases for student 
        const contagiousDisease = {
            bandID: this.state.bandID,
            diseaseID: this.state.conditionID,
        }

         // allergy object holds data needed to register allergies for student 
        const allergy = {
            bandID: this.state.bandID,
            allergyID: this.state.conditionID,
        }

        // Sends userEmergency object to registerEmergencyInfo method, then push's user to login page
        registerEmergencyContact(userEmergency).then(res => {
            this.props.history.push(`/login`)
        })

        // Sends userBlood object to registerBloodChart method, then returns response
        registerBloodChart(userBlood).then(res =>{
            console.log(res);
        })

        // Sends medicalCondition object to registerMedicalCondition method, then returns response
        registerMedicalCondition(medicalCondition).then(res =>{
            console.log(res);
        })

        // Sends contagiousDisease object to registerContagiousDisease method, then returns response
        registerContagiousDisease(contagiousDisease).then(res =>{
            console.log(res);
        })

        // Sends allergy object to registerAllergy method, then returns response
        registerAllergy(allergy).then(res =>{
            console.log(res);
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
                        {/*    <div className="form-group">
                                <label htmlFor="userID">User ID</label>
                                <input type="number"
                                 className="form-control"
                                name="userID"
                                placeholder="Enter User ID"
                                value={this.state.userID}
                                onChange={this.onChange}
                                />
                            </div>           OBSOLETE FIELD */}   
                           <div className="form-group">
                                <label htmlFor="emergencyContact1">Emergency Contact 1</label> 
                                <input type="text"
                                 className="form-control"
                                name="emergencyContact1"
                                placeholder="Enter Emergency Contact"
                                value={this.state.emergencyContact1}
                                onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="emergencyContact2">Emergency Contact 2</label>
                                <input type="text"
                                 className="form-control"
                                name="emergencyContact2"
                                placeholder="Enter 2nd Emergency Contact"
                                value={this.state.emergencyContact2}
                                onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="bloodType">Blood Type</label>
                                <select
                                 className="form-control"
                                 name="bloodType"
                                 value={this.state.bloodType}
                                 onChange={this.onChange}
                                 >
                                     <option value="0">Select Blood Type</option>
                                     <option value="1">O+</option>
                                     <option value="2">O-</option>
                                     <option value="3">A+</option>
                                     <option value="4">A-</option>
                                     <option value="5">B+</option>
                                     <option value="6">B-</option>
                                     <option value="7">AB+</option>
                                     <option value="8">AB-</option>
                                </select> 
                            </div>
                            <div className="form-group">
                                <label htmlFor="conditionID">Medical Condition(s)</label>
                                <select
                                 className="form-control"
                                 name="conditionID"
                                 value={this.state.conditionID}
                                 onChange={this.onChange}
                                 >
                                     <option value="0">Select Medical Condition(s)</option>
                                     <option value="1">Gout</option>
                                     <option value="2">Plague</option>
                                     <option value="3">Seliac</option>
                                     <option value="4">Diabeties</option>
                                </select> 
                            </div>
                            <div className="form-group">
                                <label htmlFor="diseaseID">Contagious Disease(s)</label>
                                <select
                                 className="form-control"
                                 name="diseaseID"
                                 value={this.state.diseaseID}
                                 onChange={this.onChange}
                                 >
                                     <option value="0">Select Contagious Disease(s)</option>
                                     <option value="1">Whooping Cough</option>
                                     <option value="2">Scabies</option>
                                     <option value="3">Flu</option>
                                     <option value="4">Hepatitis A</option>
                                     <option value="5">Hepatitis B</option>
                                     <option value="6">Hepatitis C</option>
                                </select> 
                            </div>
                            <div className="form-group">
                                <label htmlFor="allergyID">Allergy Name(s)</label>
                                <select
                                 className="form-control"
                                 name="allergyID"
                                 value={this.state.allergyID}
                                 onChange={this.onChange}
                                 >
                                     <option value="0">Select Allergy(s)</option>
                                     <option value="1">Tree Nuts</option>
                                     <option value="2">Penecilin</option>
                                     <option value="3">Amoxocilin</option>
                                     <option value="4">Zythromax</option>
                                </select> 
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