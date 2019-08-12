// This file contains the view and functionality for the School Register page 

import React, { Component } from 'react'; // imports react 
import {registerRFID} from './UserFunctions' // imports registerNurse function



class BandRegister extends Component {
    constructor(){
        super()
        this.state = { 
            bandID1: '',
            bandID2: '',
            bandID3: '',
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

        
        // bandID1 object holds state of bandID 1 
        const bandID1 = {
            bandID: this.state.bandID1
        }

        // bandID2 object holds state of bandID 1 
        const bandID2 = {
            bandID: this.state.bandID2
        }

        // bandID3 object holds state of bandID 1 
        const bandID3 = {
            bandID: this.state.bandID3
        }

        // Sends bandID1 object to registerRFID method
        registerRFID(bandID1).then(res => {
               console.log(res);
        })

        // Sends bandID2 object to registerRFID method
        registerRFID(bandID2).then(res => {
            console.log(res);
     })

        // Sends bandID3 object to registerRFID method, then push's user to /studentregister2 page
        registerRFID(bandID3).then(res => {
             this.props.history.push(`/studentregister2`)
    })

    }

    // MAKE SURE this.state, the newStudent object and htmlFor, and name all match
    render() {
        return (
            <div className="countainer">
                <div classnam="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal">Enter RFID Codes </h1>
                            <div className="form-group">
                                <label htmlFor="bandID1">RFID Band ID</label>
                                <input type="text"
                                 className="form-control"
                                name="bandID1"
                                placeholder="Enter Band ID"
                                value={this.state.bandID1}
                                onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="bandID2">RFID BandID</label>
                                <input type="text"
                                 className="form-control"
                                name="bandID2"
                                placeholder="Enter Band ID"
                                value={this.state.bandID2}
                                onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="bandID3">RFID BandID</label>
                                <input type="text"
                                 className="form-control"
                                name="bandID3"
                                placeholder="Enter Band ID"
                                value={this.state.bandID3}
                                onChange={this.onChange}
                                />
                            </div>
                            <button type="submit"
                            className="btn btn-lg btn-primary btn-block"
                            >
                                Continue
                            </button>                       {/* Submit Button */}
                        </form>
                    </div>


                </div>

            </div>
        )
    }
}

export default BandRegister