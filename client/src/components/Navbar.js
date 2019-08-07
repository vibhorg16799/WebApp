// This file contains the view and functionality for the Navbar

import React, {Component} from 'react' // imports react 
import {Link, withRouter} from 'react-router-dom' // imports react router and Link 



class Navbar extends Component {

    //Precondition: User is logged in 
    //Postcondition: User is logged out and pushed to home page
    logOut(e) {
        e.preventDefault()
        localStorage.removeItem('usertoken')
        this.props.history.push(`/`)

  /*      var userToken = localStorage.usertoken;
        console.log(userToken);
        isSchool(userToken).then(isSchool => {

        if(isSchool) {
        localStorage.removeItem('usertoken')
        localStorage.removeItem('schoolToken')
        this.props.history.push(`/`)
        }
        else{
            localStorage.removeItem('usertoken')
            localStorage.removeItem('studentToken')
            this.props.history.push(`/`)
        }
    })*/
    }

    //INPROGRESS LOG OUT STUDENT METHOD, WE WILL ALSO NEED LOG OUT SCHOOL METHOD
    /*logOutStudent(e) {
        e.preventDefault()
        localStorage.removeItem('usertoken')
        localStorage.removeItem('studentToken')
        this.props.history.push(`/`)
    }*/

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
                    {localStorage.usertoken ? userLink : loginRegLink}
                </div>
            </nav>
        )
    }
}

export default withRouter(Navbar)