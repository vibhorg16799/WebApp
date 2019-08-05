// This file handles all routes associated with the nurse model 

const express = require("express"); // imports express
const nurss = express.Router(); // sets plural name of table to use express router
const cors = require('cors'); // imports cors
const jwt = require(`jsonwebtoken`); // imports jwt to send web token
const bcrypt = require('bcryptjs'); // imports bcrypt to hash data 

const Nurse = require("../models/Nurse"); // imports nurse table model
const User = require("../models/User");
nurss.use(cors()); // implements cross origin server requests into express router

process.env.SECRET_KEY = 'secret'; // secret key for jwt

// Precondition: frontend code posts to nurses/resgister:
// userID: int
// phoneNumber: varchar
// roomNumber: int 
// Postcondition: new record is created in nurse table 
nurss.post('/register', (req, res) => {
    const userData = {
        // userID is set to pull from body text of POST request, make system to automate userID POST from user table to school and student tables
        userID: req.body.userID,
        phoneNumber: req.body.phoneNumber,
        roomNumber: req.body.roomNumber
    }

    // Queries Nurse table in rfid db to find user w/ userID sent to /nurses/register
   Nurse.findOne({
        where: {
            userID: req.body.userID
        }
    })
    // If nurse doesnt exist nurse is put into nurse table, if nurse does exist you are prompted with error "user already exists"
    .then(nurse =>{
        if(!nurse) {
         //   bcrypt.hash(req.body.phoneNumber, 10, (err, hash) => {
         //   userData.phoneNumber = hash
            Nurse.create(userData)  // creates new record in nurse table w/ userData sent to route 
            .then(nurse => {
                res.json({status: nurse.userID + ' registered'}) // notifies nurse is registered 
            })
            .catch(err => {
                res.send('error: ' + err)
            })
        
     } else {
         res.json({error: "Nurse already exists"}) // nurse's userID is found and record is not created 
     }

  })
  .catch(err => {
      res.send('error: ' + err) // error handling 
  })
})

// Precondition: frontend code posts to nurses/login, searches for variables with values in where clause:
// userID: int
// Postcondition: jwt token is sent to client containing values for record found 
nurss.post('/login', (req, res) => {
    Nurse.findOne({
        where: {
            userID: req.body.userID //log in perameters 
        }
    })
    .then(nurse => {
        if(nurse) {
       //    if(bcrypt.compareSync(req.body.phoneNumber,school.phoneNumber)) {
                let token = jwt.sign(nurse.dataValues, process.env.SECRET_KEY, {
                    expiresIn: 1440
                }) 
                res.send(token) // sends log in token to client 
            
        }else{
            res.status(400).json({error: 'Nurse does not exist'}) //no record found with perameters sent 
        }
    })
    .catch(err => {
        res.status(400).json({error: err}) //error handling 
    })
})


module.exports = nurss;