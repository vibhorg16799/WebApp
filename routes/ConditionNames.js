// This file handles all routes associated with the RFID model 

const express = require("express"); // import express
const conditionnames = express.Router(); // sets express router to rfids
const cors = require('cors'); // import cors 
const jwt = require(`jsonwebtoken`); // import jwt 
const bcrypt = require('bcryptjs'); // import bcrypt 

const ConditionName = require("../models/ConditionName"); // import rfid model 
const User = require("../models/User"); 
conditionnames.use(cors()); // plugs express router into cors 

process.env.SECRET_KEY = 'secret'; // secret key for jwt 

// Precondition: frontend code posts to rfids/resgister:
// bandID: int
// userID: int
// Postcondition: new record is created in rfid table
conditionnames.post('/register', (req, res) => {
    const userData = {
        //userID is set to pull from body text of POST request, make system to automate userID POST from user table to school and student tables
        conditionID: req.body.conditionID,
        conditionName: req.body.conditionName,
    }

    // Queries rfid table in rfid db to find record where bandID = bandID sent to /rfids/register
   ConditionName.findOne({
        where: {
            conditionID: req.body.conditionID
        }
    })
    // If rfid doesnt exist rfid is put into rfid table, if rfid does exist you are prompted with error "user already exists"
    .then(conditionname =>{
        if(!conditionname) {
         //   bcrypt.hash(req.body.phoneNumber, 10, (err, hash) => {
         //   userData.phoneNumber = hash
            ConditionName.create(userData) // creates new rfid record with data sent to route 
            .then(conditionname => {
                res.json({status: conditionname.conditionID + ' registered'})
            })
            .catch(err => {
                res.send('error: ' + err) // error handling 
            })
        
     } else {
         res.json({error: "Condition Name already exists"}) // record already exists 
     }

  })
  .catch(err => {
      res.send('error: ' + err) // error handling 
  })
})

// Precondition: frontend code posts to rfids/login w/ fields found in where clause:
// bandID: int
// Postcondition: record is sent to frontend in jwt form
conditionnames.post('/login', (req, res) => {
    ConditionName.findOne({
        where: {
            conditionID: req.body.conditionID //log in parameter 
        }
    })
    .then(conditionname => {
        if(conditionname) {
       //    if(bcrypt.compareSync(req.body.phoneNumber,school.phoneNumber)) {
                let token = jwt.sign(conditionname.dataValues, process.env.SECRET_KEY, {
                    expiresIn: 1440
                })
                res.send(token) // record data sent as jwt 
            
        }else{
            res.status(400).json({error: 'Medical Condition does not exist'}) // record not found 
        }
    })
    .catch(err => {
        res.status(400).json({error: err}) // error handling
    })
})

// Precondition: frontend code posts to rfids/id, sequelize searches fields found in where clause:
// bandID: int
// Postcondition: returns userID of record found
conditionnames.post('/id', (req,res) => {
    ConditionName.findOne({
        where: {
            conditionID: req.body.conditionID
        }
    })
    .then((rfid) => {
        res.send({userID: rfid.userID})
    })
})



module.exports = conditionnames;