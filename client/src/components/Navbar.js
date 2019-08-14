// This file contains the view and functionality for the Navbar

import React, {Component} from 'react' // imports react 
import {Link, withRouter} from 'react-router-dom' // imports react router and Link 
import jwt_decode from 'jwt-decode'; // imports jwt decode module
import { isSchool } from './UserFunctions'; // imports isSChool function to test user type


class Navbar extends Component {

    // Precondition: User is logged in 
    // Postcondition: User is logged out and pushed to home page
    logOut(e) {
        e.preventDefault()

        console.log(jwt_decode(localStorage.usertoken)) //logs decoded user data 

        var userDecoded = (jwt_decode(localStorage.usertoken)); // holds user table data 
        isSchool(userDecoded).then(isSchool => {

            // if user is school the following is ran
            if(isSchool){

                try{
                console.log("this is a school");
                localStorage.removeItem('usertoken') // removes usertoken from localstorage
                localStorage.removeItem('schoolToken') // removes school token from local storage
                this.props.history.push(`/`)
                
                }
                catch(error){
                    console.log("error:" + error);
                }
                finally{
                    
                }

            }
            // if user is not a school the follwing is ran
            else{

                try{
                console.log("this is not a school");
                localStorage.removeItem('usertoken'); // removes usertoken from localstorage
                localStorage.removeItem('studentToken'); // removes student token from local storage
                localStorage.removeItem('allergyToken');
                localStorage.removeItem('allergyNameList');
                localStorage.removeItem('conditionToken');
                localStorage.removeItem('conditionNameList');
                localStorage.removeItem('diseaseToken');
                localStorage.removeItem('diseaseNameList');
                localStorage.removeItem('bloodToken');
                localStorage.removeItem('emergencyToken');
                localStorage.removeItem('rfidToken');
                this.props.history.push(`/`)
                }
                catch(error){
                    console.log("error:" + error);
                }
                finally{
                    
                }

            }

        })
    }

    render() {
        const loginRegLink = (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/login"className="nav-link"> {/* Log In Link*/}
                        Login
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/register"className="nav-link"> {/* Register Link*/}
                        Register
                    </Link>
                </li>
            </ul>
        )

        // this link allows logged in school users to logout 
        const userLink = (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/profile"className="nav-link"> {/* Profile Link*/}
                        User
                    </Link>
                </li>
                <li className="nav-item">
                    <a href="" onClick={this.logOut.bind(this)}className="nav-link"> {/* Log Out Link*/}
                        Logout
                    </a>
                </li>
            </ul>
        )

         // this link allows logged in student users to logout 
        const studentUserLink = (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/studentprofile"className="nav-link"> {/* Profile Link*/}
                        User
                    </Link>
                </li>
                <li className="nav-item">
                    <a href="" onClick={this.logOut.bind(this)}className="nav-link"> {/* Log Out Link*/}
                        Logout
                    </a>
                </li>
            </ul>
        )

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded">
                <button className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarsExample10"
                aria-controls="navbarsExample10"
                aria-expanded="false"
                aria-label="Toggle Navigation"
                >
                    <span className="navbar-toggle-icon"/>
                </button>

                <div className="collapse navbar-collapse justify-content-md-center" 
                id="navbarsExample10">
                    <ul className="navbar-nav">
                        <li className="nav-item"> 
                            <Link to="/"className="nav-link"> {/* Home Link*/}
                                Home
                            </Link>
                        </li>
                    </ul>
        {localStorage.usertoken ? userLink : loginRegLink} {/* if usertoken show userlink menu, if not loginreg link menu */}
                </div>
            </nav>
        )
    }
}

export default withRouter(Navbar)