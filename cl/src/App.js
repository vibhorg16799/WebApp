import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Navbar from './components/Navbar'
import Landing from './components/Landing'
import Register from './components/Register'
import Login from './components/Login'
import Profile from './components/Profile'
import SchoolRegister from './components/SchoolRegister'
import StudentRegister from './components/StudentRegister'
import StudentRegister2 from './components/StudentRegister2'
import SchoolRegister2 from './components/SchoolRegister2'

class App extends Component {
  render() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Route exact path="/" component={Landing}/>
        <div className="container">
        <Route exact path="/register" component={Register}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/profile" component={Profile}/>
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
