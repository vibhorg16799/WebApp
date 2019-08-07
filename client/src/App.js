import React, { Component } from 'react'; // imports react 
import {BrowserRouter as Router, Route} from 'react-router-dom'; // imports react router 

import Navbar from './components/Navbar' // imports navbar 
import Landing from './components/Landing' // imports landing page 
import Register from './components/Register' // imports register page 
import Login from './components/Login' // imports login page 
import Profile from './components/Profile' // imports profile page 
import StudentProfile from './components/StudentProfile' // imports student profile page
import SchoolRegister from './components/SchoolRegister' // imports school register page 
import StudentRegister from './components/StudentRegister' // imports student register page 
import StudentRegister2 from './components/StudentRegister2' // imports student register pt.2 page 
import SchoolRegister2 from './components/SchoolRegister2' // imports school register pt.2 page

//This class contains the entry point, views and runs our frontend react app 
class App extends Component {
  render() {
  return (
    <Router>
      <div className="App">
        <Navbar/> {/* Imports our navbar onto all pages */}
        {/* Sets site pages to different URL routes */}
        <Route exact path="/" component={Landing}/>  
        <div className="container">
        <Route exact path="/register" component={Register}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/profile" component={Profile}/>
        <Route exact path="/studentprofile" component={StudentProfile}/>
        <Route exact path="/schoolregister" component={SchoolRegister}/>
        <Route exact path="/studentregister" component={StudentRegister}/>
        <Route exact path="/studentregister2" component={StudentRegister2}/>
        <Route exact path="/schoolregister2" component={SchoolRegister2}/>
        </div>
      </div>
    </Router>
   )
  }
}

export default App
