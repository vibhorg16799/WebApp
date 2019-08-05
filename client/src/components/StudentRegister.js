import React, { Component } from 'react';
import {registerStudent} from './UserFunctions'




class StudentRegister extends Component {
    constructor(){
        super()
        this.state = {
            userID: '',
            pediatricianID: '',
            firstName: '',
            lastName: '',
            school: '',

        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }


    onChange(e){
        this.setState({[e.target.name]: e.target.value})
    }


    onSubmit(e){
        e.preventDefault()

        
        
        const newStudent = {
            userID: this.state.userID,
            pediatricianID: this.state.pediatricianID,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            school: this.state.school,
 
        }

        registerStudent(newStudent).then(res => {
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
                            <h1 className="h3 mb-3 font-weight-normal"> </h1>
                            <div className="form-group">
                                <label htmlFor="userID">User ID</label>
                                <input type="number"
                                 className="form-control"
                                name="userID"
                                placeholder="Enter User ID"
                                value={this.state.userID}
                                onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="pediatricianID">Pediatrician ID</label>
                                <input type="number"
                                 className="form-control"
                                name="pediatricianID"
                                placeholder="Enter Pediatrician ID"
                                value={this.state.pediatricianID}
                                onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="firstName">First Name</label>
                                <input type="text"
                                 className="form-control"
                                name="firstName"
                                placeholder="Enter First Name"
                                value={this.state.firstName}
                                onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Last Name</label>
                                <input type="text"
                                 className="form-control"
                                name="lastName"
                                placeholder="Enter Last Name"
                                value={this.state.lastName}
                                onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="school">School</label>
                                <select
                                 className="form-control"
                                 name="school"
                                 value={this.state.school}
                                 onChange={this.onChange}
                                 >
                                     <option value="0">Select School</option>
                                     <option value="1">Wheeler</option>
                                     <option value="2">Middletown</option>
                                     <option value="3">J-Town</option>
                                     <option value="4">Anchorage</option>
                                </select> 
                            </div>
                            <button type="submit"
                            className="btn btn-lg btn-primary btn-block"
                            >
                                Continue
                            </button>
                        </form>
                    </div>


                </div>

            </div>
        )
    }
}

export default StudentRegister