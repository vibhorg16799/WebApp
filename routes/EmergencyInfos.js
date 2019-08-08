// This file handles all routes associated with the emergencyinfo model 

const express = require("express"); // imports express
const emergencyinfos = express.Router(); // sets plural name of table to use express router
const cors = require('cors'); // imports cors
const jwt = require(`jsonwebtoken`); // imports jwt to send web token
const bcrypt = require('bcryptjs'); // imports bcrypt to hash data 

const Emergencyinfo = require("../models/EmergencyInfo"); // imports Emergencyinfo table model
const student = require("../models/Student");
emergencyinfos.use(cors()); // implements cross origin server requests into express router

process.env.SECRET_KEY = 'secret'; // secret key for jwt

// Precondition: frontend code posts to emergencyinfos/resgister:
// userID: int
// phoneNumber: varchar
// roomNumber: int 
// Postcondition: new record is created in emergencyinfo table 
emergencyinfos.post('/register', (req, res) => {

    // holds the highest value of userID from student table to be used as auto implemented userID 
    var newuserID = student.max('userID').then(max => {
        newuserID = max;

    const userData = {
        // userID is set to pull from body text of POST request, make system to automate userID POST from user table to student and student tables
        userID: newuserID,
        emergencyContact1: req.body.emergencyContact1,
        emergencyContact2: req.body.emergencyContact2,
    }

    // Queries emergencyinfo table in rfid db to find user w/ userID sent to /emergencyinfos/register
   Emergencyinfo.findOne({
        where: {
            userID: userData.userID
        }
    })
    // If emergencyinfo doesnt exist emergencyinfo is put into emergencyinfo table, if emergencyinfo does exist you are prompted with error "user already exists"
    .then(emergencyinfo =>{
        if(!emergencyinfo) {
         //   bcrypt.hash(req.body.phoneNumber, 10, (err, hash) => {
         //   userData.phoneNumber = hash
            Emergencyinfo.create(userData)  // creates new record in emergencyinfo table w/ userData sent to route 
            .then(emergencyinfo => {
                res.json({status: emergencyinfo.userID + ' registered'}) // notifies emergencyinfo is registered 
            })
            .catch(err => {
                res.send('error: ' + err)
            })
        
     } else {
         res.json({error: "emergencyinfo already exists"}) // emergencyinfo's userID is found and record is not created 
     }

  })
  .catch(err => {
      res.send('error: ' + err) // error handling 
  })
})})

// Precondition: frontend code posts to emergencyinfos/login, searches for variables with values in where clause:
// userID: int
// Postcondition: jwt token is sent to client containing values for record found 
emergencyinfos.post('/login', (req, res) => {
    Emergencyinfo.findOne({
        where: {
            userID: req.body.userID //log in perameters 
        }
    })
    .then(emergencyinfo => {
        if(emergencyinfo) {
       //    if(bcrypt.compareSync(req.body.phoneNumber,school.phoneNumber)) {
                let token = jwt.sign(emergencyinfo.dataValues, process.env.SECRET_KEY, {
                    expiresIn: 1440
                }) 
                res.send(token) // sends log in token to client 
            
        }else{
            res.status(400).json({error: 'Emergencyinfo does not exist'}) //no record found with perameters sent 
        }
    })
    .catch(err => {
        res.status(400).json({error: err}) //error handling 
    })
})


module.exports = emergencyinfos;