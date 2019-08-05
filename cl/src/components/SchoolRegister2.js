import React, { Component } from 'react';
import {registerNurse} from './UserFunctions'




class SchoolRegister2 extends Component {
    constructor(){
        super()
        this.state = {
            userID: '',
            phoneNumber: '',
            roomNumber: '',

        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }


    onChange(e){
        this.setState({[e.target.name]: e.target.value})
    }


    onSubmit(e){
        e.preventDefault()

        const newNurse = {
            userID: this.state.userID,
            phoneNumber: this.state.phoneNumber,
            roomNumber: this.state.roomNumber, 
            
        }

        registerNurse(newNurse).then(res => {
                this.props.history.push(`/login`)
        })
    }

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
                                <label htmlFor="phoneNumber">Nurse's Phone Number</label>
                                <input type="text"
                                 className="form-control"
                                name="phoneNumber"
                                placeholder="Enter Nurse's Phone Number"
                                value={this.state.phoneNumber}
                                onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="roomNumber">Nurse's Room Number</label>
                                <input type="number"
                                 className="form-control"
                                name="roomNumber"
                                placeholder="Enter Nurse's Room Number"
                                value={this.state.roomNumber}
                                onChange={this.onChange}
                                />
                            </div>
                            <button type="submit"
                            className="btn btn-lg btn-primary btn-block"
                            >
                                Register
                            </button>
                        </form>
                    </div>


                </div>

            </div>
        )
    }
}

export default SchoolRegister2