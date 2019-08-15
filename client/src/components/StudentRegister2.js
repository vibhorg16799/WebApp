// This file contains the view and functionality for the StudentRegister 2 page 

import React, { Component } from 'react'; // imports react 
import {registerEmergencyContact, registerBloodChart, registerMedicalCondition, registerContagiousDisease, registerAllergy,} from './UserFunctions' // imports registerPediatrician function
import FilteredMultiSelect from 'react-filtered-multiselect' // imports multifiltered select input
import 'bootstrap/dist/css/bootstrap.min.css' // imports bootstrap

// holds data values for allergy drop down selection input
const ALLERGY = [
    {id: 1, name: 'Tree Nuts'},
    {id: 2, name: 'Penecilin'},
    {id: 3, name: 'Amoxocilin'},
    {id: 4, name: 'Zythromax'}
  ]

  // holds data values for contagious disease drop down
  const DISEASE = [
    {id: 1, name: 'Whooping Cough'},
    {id: 2, name: 'Scabies'},
    {id: 3, name: 'Flu'},
    {id: 4, name: 'Hepatitis A'},
    {id: 5, name: 'Hepatitis B'},
    {id: 6, name: 'Hepatitis C'}
  ]

  // holds data values for medical condition drop down
  const CONDITION = [
    {id: 1, name: 'Gout'},
    {id: 2, name: 'Plague'},
    {id: 3, name: 'Seliac'},
    {id: 4, name: 'Diabeties'}
  ]

// holds bootstrap styling for multi selection search box's
const BOOTSTRAP_CLASSES = {
    filter: 'form-control',
    select: 'form-control',
    button: 'btn btn btn-block btn-default',
    buttonActive: 'btn btn btn-block btn-primary',
  }
  


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
       // allergyID: '',
        selectedAllergies: [],
        selectedDiseases: [],
        selectedConditions: [],


        }

        this.onChange = this.onChange.bind(this) // calls onChange for focus change 
        this.onSubmit = this.onSubmit.bind(this) // calls OnSubmit when submit button is clicked 
    }

    // handles deselcting of allergies from allergies list
    handleDeselect(index) {
        var selectedAllergies = this.state.selectedAllergies.slice()
        selectedAllergies.splice(index, 1)
        this.setState({selectedAllergies})
      }

      // handles deselcting of contagious diseases from disease list
      handleDeselectDisease(index) {
        var selectedDiseases = this.state.selectedDiseases.slice()
        selectedDiseases.splice(index, 1)
        this.setState({selectedDiseases})
      }

      // handles deslection of medical conditions from condition list
      handleDeselectCondition(index) {
        var selectedConditions = this.state.selectedConditions.slice()
        selectedConditions.splice(index, 1)
        this.setState({selectedConditions})
      }

      // handles selection change of allergies 
      handleSelectionChange = (selectedAllergies) => {
        this.setState({selectedAllergies})
      }

      // handles selction change of contagious diseases
      handleSelectionChangeDisease = (selectedDiseases) => {
        this.setState({selectedDiseases})
      }

      // handles selection change of medical conditions
      handleSelectionChangeCondition = (selectedConditions) => {
        this.setState({selectedConditions})
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

        try{

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

        // Calls Register Allergy List function and passes selected allergies state to function
        registerAllergyList(this.state.selectedAllergies);

        // Calls Register Disease List function and passes selected diseases state to function
        registerDiseaseList(this.state.selectedDiseases);

        // Calls Register Condition List function and passes selected conditions state to function
        registerConditionList(this.state.selectedConditions);

        // Sends allergy object to registerAllergy method, then returns response
            function registerAllergyList (selectedAllergies) {

                console.log(selectedAllergies);
               // console.log(selectedAllergies[0].id);
                for (var i = 0; i < selectedAllergies.length; i++){
                
                var user = {allergyID: selectedAllergies[i].id}

                registerAllergy(user).then(res =>{
                console.log(res);

            })
        }
        }

        // Sends disase object to registerDisease method, then returns response
        function registerDiseaseList (selectedDiseases) {

            console.log(selectedDiseases);
          //  console.log(selectedDiseases[0].id);
            for (var i = 0; i < selectedDiseases.length; i++){
            
            var user = {diseaseID: selectedDiseases[i].id}

            registerContagiousDisease(user).then(res =>{
            console.log(res);

        })
    }
    }

    // Sends condition object to registerCondition method, then returns response
    function registerConditionList (selectedConditions) {

        console.log(selectedConditions);
      //  console.log(selectedConditions[0].id);
        for (var i = 0; i < selectedConditions.length; i++){
        
        var user = {conditionID: selectedConditions[i].id}

        registerMedicalCondition(user).then(res =>{
        console.log(res);

    })
}
}
        }
        catch(error){

            console.log("Error: " + error);

        }
    }

    // MAKE SURE this.state, the newStudent object and htmlFor, and name all match
    render() {
        var {selectedAllergies} = this.state;
        var {selectedConditions} = this.state;
        var {selectedDiseases} = this.state;
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

                            <div className="row">

                                <div className="col-md-5">
                                <label htmlFor="medcondition">Medical Condition(s)</label>
                                <FilteredMultiSelect
                                onChange={this.handleSelectionChangeCondition}
                                options={CONDITION}
                                selectedOptions={selectedConditions}
                                textProp ="name"
                                valueProp ="id"
                                placeholder = 'Enter Medical Condition'
                                className = {BOOTSTRAP_CLASSES}
                                />

                                </div>
                                <div className="col-md-5">
                                {selectedConditions.length === 0 && <p> </p>}
                                {selectedConditions.length > 0 && <ul>
                                {selectedConditions.map((condition, i) => <li key={condition.id}>
                                {`${condition.name} `}
                                <button type="button" onClick={() => this.handleDeselectCondition(i)}>
                                                &times;
                                    </button>
                                    </li>)}
                                 </ul>}
                                 </div>
                            </div>

                            <br></br>

                             <div className="row">

                                <div className="col-md-5">
                                <label htmlFor="contagdis">Contagious Disease(s)</label>
                                <FilteredMultiSelect
                                onChange={this.handleSelectionChangeDisease}
                                options={DISEASE}
                                selectedOptions={selectedDiseases}
                                textProp ="name"
                                valueProp ="id"
                                placeholder = 'Enter Contagious Disease'
                                className = {BOOTSTRAP_CLASSES}
                                />

                                </div>
                                <div className="col-md-5">
                                {selectedDiseases.length === 0 && <p> </p>}
                                {selectedDiseases.length > 0 && <ul>
                                {selectedDiseases.map((disease, i) => <li key={disease.id}>
                                {`${disease.name} `}
                                <button type="button" onClick={() => this.handleDeselectDisease(i)}>
                                                &times;
                                    </button>
                                    </li>)}
                                 </ul>}
                                 </div>
                            </div>

                            <br></br>

                            <div className="row">

                                <div className="col-md-5">
                                <label htmlFor="allergyID">Allergies</label>
                                <FilteredMultiSelect
                                onChange={this.handleSelectionChange}
                                options={ALLERGY}
                                selectedOptions={selectedAllergies}
                                textProp ="name"
                                valueProp ="id"
                                placeholder = 'Enter Allergies'
                                className = {BOOTSTRAP_CLASSES}
                                />

                                </div>
                                <div className="col-md-5">
                                {selectedAllergies.length === 0 && <p></p>}
                                {selectedAllergies.length > 0 && <ul>
                                {selectedAllergies.map((allergy, i) => <li key={allergy.id}>
                                {`${allergy.name} `}
                                <button type="button" onClick={() => this.handleDeselect(i)}>
                                                &times;
                                    </button>
                                    </li>)}
                                 </ul>}
                                 </div>
                            </div>

                            <br></br>

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