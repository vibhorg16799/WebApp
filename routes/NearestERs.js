// This file handles all routes associated with the nurse model 

const express = require("express"); // imports express
const nearesters = express.Router(); // sets plural name of table to use express router
const cors = require('cors'); // imports cors
const jwt = require(`jsonwebtoken`); // imports jwt to send web token
const bcrypt = require('bcryptjs'); // imports bcrypt to hash data 

const NearestER = require("../models/NearestER"); // imports nurse table model
const school = require("../models/School");
nearesters.use(cors()); // implements cross origin server requests into express router

process.env.SECRET_KEY = 'secret'; // secret key for jwt

// Precondition: frontend code posts to nurses/resgister:
// userID: int
// phoneNumber: varchar
// roomNumber: int 
// Postcondition: new record is created in nurse table 
nearesters.post('/register', (req, res) => {

    // holds the highest value of userID from school table to be used as auto implemented userID 
    var newuserID = school.max('userID').then(max => {
        newuserID = max;

    const userData = {
        // userID is set to pull from body text of POST request, make system to automate userID POST from user table to school and student tables
        userID: newuserID,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
    }

    // Queries Nurse table in rfid db to find user w/ userID sent to /nurses/register
   NearestER.findOne({
        where: {
            userID: userData.userID
        }
    })
    // If nurse doesnt exist nurse is put into nurse table, if nurse does exist you are prompted with error "user already exists"
    .then(nearester =>{
        if(!nearester) {
         //   bcrypt.hash(req.body.phoneNumber, 10, (err, hash) => {
         //   userData.phoneNumber = hash
            NearestER.create(userData)  // creates new record in nurse table w/ userData sent to route 
            .then(nearester => {
                res.json({status: nearester.userID + ' registered'}) // notifies nurse is registered 
            })
            .catch(err => {
                res.send('error: ' + err)
            })
        
     } else {
         res.json({error: "ER already exists"}) // nurse's userID is found and record is not created 
     }

  })
  .catch(err => {
      res.send('error: ' + err) // error handling 
  })
})})

// Precondition: frontend code posts to nurses/login, searches for variables with values in where clause:
// userID: int
// Postcondition: jwt token is sent to client containing values for record found 
nearesters.post('/login', (req, res) => {
    NearestER.findOne({
        where: {
            userID: req.body.userID //log in perameters 
        }
    })
    .then(nearester => {
        if(nearester) {
       //    if(bcrypt.compareSync(req.body.phoneNumber,school.phoneNumber)) {
                let token = jwt.sign(nearester.dataValues, process.env.SECRET_KEY, {
                    expiresIn: 1440
                }) 
                res.send(token) // sends log in token to client 
            
        }else{
            res.status(400).json({error: 'NearestER does not exist'}) //no record found with perameters sent 
        }
    })
    .catch(err => {
        res.status(400).json({error: err}) //error handling 
    })
})


module.exports = nearesters;