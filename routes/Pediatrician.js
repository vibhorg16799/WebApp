// This file handles all routes associated with the Pediatrician model 

const express = require("express"); // imports express 
const pediatricians = express.Router(); // sets pediatrician to express router 
const cors = require('cors'); // import cors 
const jwt = require(`jsonwebtoken`); // import sjwt 
const bcrypt = require('bcryptjs'); // import bcrypt 

const Pediatrician = require("../models/Pediatrician"); // import pediatrician model 
const student = require("../models/Student"); // imports student model 

pediatricians.use(cors()); // integrates express router with cors 

process.env.SECRET_KEY = 'secret'; // secret key for jwt 


// Precondition: frontend code posts to pediatricians/resgister:
// userID: int
// name: varchar
// phoneNumber: varchar
// Postcondition: new record is created in pediatrician table w/ the perameters sent
pediatricians.post('/register', (req, res) => {

    // holds the highest value of userID from student table to be used as auto implemented userID 
    var newuserID = student.max('userID').then(max => {
        newuserID = max;

    const userData = {
        userID: newuserID,
        name: req.body.name,
        phoneNumber: req.body.phoneNumber
    }

    // Queries pediatrician table in rfid db to find pediatrician where pediatrician.name = name sent to post request
   Pediatrician.findOne({
        where: {
            name: req.body.name
        }
    })
    // If pediatrician doesnt exist pediatrician is put into pediatrician table, if pediatrician does exist you are prompted with error "pediatrician already exists"
    .then(pediatrician =>{
        if(!pediatrician) {
         //   bcrypt.hash(req.body.phoneNumber, 10, (err, hash) => {
         //   userData.phoneNumber = hash
            Pediatrician.create(userData) // creates new pediatrician record 
            .then(pediatrician => {
                res.json({status: pediatrician.name + ' registered'})
            })
            .catch(err => {
                res.send('error: ' + err)
            })
        
     } else {
         res.json({error: "Scan already exists"}) // pediatrician already exists
     }

  })
  .catch(err => {
      res.send('error: ' + err) // error handling
  })
})})

// Precondition: frontend code posts to nurses/login w/ perameters in where clause:
// name: varchar
// Postcondition: record is sent to frontend in jwt form 
pediatricians.post('/login', (req, res) => {
    Pediatrician.findOne({
        where: {
            userID: req.body.userID //login parameter
        }
    })
    .then(pediatrician => {
        if(pediatrician) {
       //    if(bcrypt.compareSync(req.body.phoneNumber,scan.phoneNumber)) {
                let token = jwt.sign(pediatrician.dataValues, process.env.SECRET_KEY, {
                    expiresIn: 1440
                })
                res.send(token) // record sent in jwt form
          
        }else{
            res.status(400).json({error: 'Pediatrician does not exist'}) // no record found 
        }
    })
    .catch(err => {
        res.status(400).json({error: err}) // error handling 
    })
})


module.exports = pediatricians;