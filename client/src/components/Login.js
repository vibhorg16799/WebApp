import React, { Component } from 'react';
import {login, registerScan, getUserID, getLogInInfo, loginScan} from './UserFunctions'
import axios from 'axios'


class Login extends Component {
    constructor(){
        super()
        this.state = {
            email: '',
            password: '',
            bandID: ''
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }


    onChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e){
        e.preventDefault()
        const { history } = this.props;

        const user = {
            email: this.state.email,
            password: this.state.password
        }
        const scan = {
            bandID: this.state.bandID
        }

        if(this.state.bandID === '') {

            login(user).then(res => {
                if(res) {
                 this.props.history.push(`/profile`)
            }
        })
    }
    else{
        console.log(user);
        try{

            registerScan(scan)

            var userID = getUserID(scan)

            userID.then(function(result) {

                console.log(result);
                var loginfo = getLogInInfo(result.userID)

                loginfo.then(function(user){

                console.log(user);
                loginScan(user).then(res => {
                    if(res) {
                        history.push(`/profile`)
                    }
                })
            })
            })
        //    var info = getLogInInfo(userID);
        //    console.log(info);
        }
        catch{console.error();
        

        }
        
      /*  function getID(scan){
          axios.get('/rfids/id', {
              bandID: scan.bandID
          })
          .then(function (res) {
              console.log(res);
          })
        }*/

           /*  getUserID(scan).then(res => {
                 getLogInInfo(res)
             }).then(re s => {
                login(res)
             })

            })*/
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
                            </button>
                        </form>
                    </div>


                </div>

            </div>
        )
    }
}

export default Login 