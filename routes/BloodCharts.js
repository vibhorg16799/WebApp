// This file handles all routes associated with the bloodchart model 

const express = require("express"); // imports express
const bloodcharts = express.Router(); // sets plural name of table to use express router
const cors = require('cors'); // imports cors
const jwt = require(`jsonwebtoken`); // imports jwt to send web token
const bcrypt = require('bcryptjs'); // imports bcrypt to hash data 

const Bloodchart = require("../models/BloodChart"); // imports bloodchart table model
const student = require("../models/Student");
bloodcharts.use(cors()); // implements cross origin server requests into express router

process.env.SECRET_KEY = 'secret'; // secret key for jwt

// Precondition: frontend code posts to bloodcharts/resgister:
// userID: int
// phoneNumber: varchar
// roomNumber: int 
// Postcondition: new record is created in bloodchart table 
bloodcharts.post('/register', (req, res) => {

    // holds the highest value of userID from student table to be used as auto implemented userID 
    var newuserID = student.max('userID').then(max => {
        newuserID = max;

    const userData = {
        // userID is set to pull from body text of POST request, make system to automate userID POST from user table to student and student tables
        userID: newuserID,
        bloodType: req.body.bloodType,
    }

    // Queries Bloodchart table in rfid db to find user w/ userID sent to /bloodcharts/register
   Bloodchart.findOne({
        where: {
            userID: userData.userID
        }
    })
    // If bloodchart doesnt exist bloodchart is put into bloodchart table, if bloodchart does exist you are prompted with error "user already exists"
    .then(bloodchart =>{
        if(!bloodchart) {
         //   bcrypt.hash(req.body.phoneNumber, 10, (err, hash) => {
         //   userData.phoneNumber = hash
            Bloodchart.create(userData)  // creates new record in bloodchart table w/ userData sent to route 
            .then(bloodchart => {
                res.json({status: bloodchart.userID + ' registered'}) // notifies bloodchart is registered 
            })
            .catch(err => {
                res.send('error: ' + err)
            })
        
     } else {
         res.json({error: "bloodchart already exists"}) // bloodchart's userID is found and record is not created 
     }

  })
  .catch(err => {
      res.send('error: ' + err) // error handling 
  })
})})

// Precondition: frontend code posts to bloodcharts/login, searches for variables with values in where clause:
// userID: int
// Postcondition: jwt token is sent to client containing values for record found 
bloodcharts.post('/login', (req, res) => {
    Bloodchart.findOne({
        where: {
            userID: req.body.userID //log in perameters 
        }
    })
    .then(bloodchart => {
        if(bloodchart) {
       //    if(bcrypt.compareSync(req.body.phoneNumber,school.phoneNumber)) {
                let token = jwt.sign(bloodchart.dataValues, process.env.SECRET_KEY, {
                    expiresIn: 1440
                }) 
                res.send(token) // sends log in token to client 
            
        }else{
            res.status(400).json({error: 'Bloodchart does not exist'}) //no record found with perameters sent 
        }
    })
    .catch(err => {
        res.status(400).json({error: err}) //error handling 
    })
})


module.exports = bloodcharts;