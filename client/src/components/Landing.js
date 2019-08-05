// This file contains the view and functionality for the Landing page 

import React, {Component} from 'react' // imports react



class Landing extends Component {
    render(){
        return (
            <div className="container">
                 <div style={listContainer} className="jumbotron mt-5">
                    <div className="col-sm-8 mx-auto">
                    <h1 style={title}className="text-center">Welcome to TrackerGen</h1> 
                </div>
            </div>

                <div >
                    <h2 className="text-center">We Track Your Student's:</h2> {/* List Heading  */}
                    <div align="center"> 
                    <ul style={listStyle}>  {/* List */}
                        <li>Allergies</li>
                        <li>Diseases</li>
                        <li>Medical Conditions</li>
                        <li>Food Service Information</li>
                    </ul>
                    </div>
                </div>
                    <br></br>
                    <div style={listContainer} align="center">
                    <br></br>
                    <h3 style={blueText}className="text-center">So You Don't Have To</h3> 
                    <br></br>
                    </div>
                    <br></br>
            </div>

        )
    }
}
//Inline css styling 
const title = {
    fontSize: '3.5em',
    fontWeight: '100px',
    
    
}
const listContainer={
    backgroundColor: '#282c34',
    color: 'white',
    width: '100%'
}
const listStyle={
    marginTop: '2%',
    marginLeft:'40%',
    textAlign: 'justify',
    width: '100%',
    display: 'inline-block',
    fontSize: '1.2em'
}
const blueText={
    color: '#dde8f0',
    fontSize: '2em',
    fontWeight: '70px'
}


export default Landing