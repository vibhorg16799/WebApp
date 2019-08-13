// This file handles all routes associated with the RFID model 

const express = require("express"); // import express
const medicalconditions = express.Router(); // sets express router to rfids
const cors = require('cors'); // import cors 
const jwt = require(`jsonwebtoken`); // import jwt 
const bcrypt = require('bcryptjs'); // import bcrypt 

const MedicalCondition = require("../models/MedicalCondition"); // import rfid model 
const rfid = require("../models/RFID"); // imports rfid model
medicalconditions.use(cors()); // plugs express router into cors 

process.env.SECRET_KEY = 'secret'; // secret key for jwt 



// Precondition: frontend code posts to rfids/resgister:
// bandID: int
// userID: int
// Postcondition: new record is created in rfid table
medicalconditions.post('/register', (req, res) => {
    
    // sets res value to constant response, fixes glitch of not seeing res parameter
    const response = res;
     // Finds max userID in rfid table 
     var newuserID = rfid.max('userID').then(max => {
         newuserID = max;
     
        console.log(newuserID);

    // Uses max userID from rfid table to find correlated bandID
    var newbandID = rfid.findOne({
        where: {
            userID: newuserID
        },
    }).then( res => { // sets max userID bandID to variable newbandID 
        newbandID = res;
    
        // logs newbandID
        console.log(newbandID.bandID)
    
    // holds data to make new medical condition object
    const userData = {
        bandID: newbandID.bandID,
        conditionID: req.body.conditionID,
    }

    // Queries rfid table in rfid db to find record where bandID = bandID sent to /rfids/register
   MedicalCondition.findOne({
        where: {
            conditionID: req.body.conditionID,
            bandID: newbandID.bandID,
        }
    })
    // If rfid doesnt exist rfid is put into rfid table, if rfid does exist you are prompted with error "user already exists"
    .then(medicalcondition =>{
        if(!medicalcondition) {
         //   bcrypt.hash(req.body.phoneNumber, 10, (err, hash) => {
         //   userData.phoneNumber = hash
            MedicalCondition.create(userData) // creates new rfid record with data sent to route 
            .then(medicalcondition => {
                response.json({status: medicalcondition.bandID + ' registered'})
            })
            .catch(err => {
                response.send('error: ' + err) // error handling 
            })
        
     } else {
        response.json({error: "Medical Condition already exists"}) // record exists 
     }

  })
  .catch(err => {
    response.send('error: ' + err) // error handling 
  })
})})})

// Precondition: frontend code posts to rfids/login w/ fields found in where clause:
// bandID: int
// Postcondition: record is sent to frontend in jwt form
medicalconditions.post('/login', (req, res) => {
    MedicalCondition.findOne({
        where: {
            bandID: req.body.bandID, //log in parameter 
        }
    })
    .then(medicalcondition => {
        if(medicalcondition) {
       //    if(bcrypt.compareSync(req.body.phoneNumber,school.phoneNumber)) {
                let token = jwt.sign(medicalcondition.dataValues, process.env.SECRET_KEY, {
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
medicalconditions.post('/id', (req,res) => {
    MedicalCondition.findOne({
        where: {
            bandID: req.body.bandID
        }
    })
    .then((rfid) => {
        res.send({userID: rfid.userID})
    })
})

// Precondition: frontend code posts to allergys/list, sequelize searches for fields found in where clause:
// bandID: int
// Postcondition: returns Allergies of bandID provided
medicalconditions.post('/list', (req,res) => {
    MedicalCondition.findAll({
        where: {
            bandID: req.body.bandID
        }
    })
    .then((condition) => {
        if(condition){
        res.send(condition);
        }
        else{
            res.status(400).json({error: 'Condition does not exist'}); // record not found 
        }
    })
    .catch(err =>{
        console.log("Error: " + err);
    })
})




module.exports = medicalconditions;