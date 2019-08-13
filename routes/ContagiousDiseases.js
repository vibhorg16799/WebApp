// This file handles all routes associated with the RFID model 

const express = require("express"); // import express
const contagiousdiseases = express.Router(); // sets express router to rfids
const cors = require('cors'); // import cors 
const jwt = require(`jsonwebtoken`); // import jwt 
const bcrypt = require('bcryptjs'); // import bcrypt 

const ContagiousDisease = require("../models/ContagiousDisease"); // import rfid model 
const rfid = require("../models/RFID"); 
contagiousdiseases.use(cors()); // plugs express router into cors 

process.env.SECRET_KEY = 'secret'; // secret key for jwt 

// Precondition: frontend code posts to rfids/resgister:
// bandID: int
// userID: int
// Postcondition: new record is created in rfid table
contagiousdiseases.post('/register', (req, res) => {

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

    const userData = {
        //userID is set to pull from body text of POST request, make system to automate userID POST from user table to school and student tables
        bandID: newbandID.bandID,
        diseaseID: req.body.diseaseID,
    }

    // Queries rfid table in rfid db to find record where bandID = bandID sent to /rfids/register
   ContagiousDisease.findOne({
        where: {
            bandID: newbandID.bandID,
            diseaseID: req.body.diseaseID,
        }
    })
    // If rfid doesnt exist rfid is put into rfid table, if rfid does exist you are prompted with error "user already exists"
    .then(contagiousdisease =>{
        if(!contagiousdisease) {
         //   bcrypt.hash(req.body.phoneNumber, 10, (err, hash) => {
         //   userData.phoneNumber = hash
            ContagiousDisease.create(userData) // creates new rfid record with data sent to route 
            .then(contagiousdisease => {
                response.json({status: contagiousdisease.bandID + ' registered'})
            })
            .catch(err => {
                response.send('error: ' + err) // error handling 
            })
        
     } else {
         response.json({error: "contagious disease already exists"}) // record already exists 
     }

  })
  .catch(err => {
      response.send('error: ' + err) // error handling 
  })
})})})

// Precondition: frontend code posts to rfids/login w/ fields found in where clause:
// bandID: int
// Postcondition: record is sent to frontend in jwt form
contagiousdiseases.post('/login', (req, res) => {
    ContagiousDisease.findOne({
        where: {
            bandID: req.body.bandID //log in parameter 
        }
    })
    .then(contagiousdisease => {
        if(contagiousdisease) {
       //    if(bcrypt.compareSync(req.body.phoneNumber,school.phoneNumber)) {
                let token = jwt.sign(contagiousdisease.dataValues, process.env.SECRET_KEY, {
                    expiresIn: 1440
                })
                res.send(token) // record data sent as jwt 
            
        }else{
            res.status(400).json({error: 'contagious disease does not exist'}) // record not found 
        }
    })
    .catch(err => {
        res.status(400).json({error: err}) // error handling
    })
})

// Precondition: frontend code posts to allergys/list, sequelize searches for fields found in where clause:
// bandID: int
// Postcondition: returns Allergies of bandID provided
contagiousdiseases.post('/list', (req,res) => {
    ContagiousDisease.findAll({
        where: {
            bandID: req.body.bandID
        }
    })
    .then((disease) => {
        if(disease){
        res.send(disease);
        }
        else{
            res.status(400).json({error: 'Disease does not exist'}); // record not found 
        }
    })
    .catch(err =>{
        console.log("Error: " + err);
    })
})



module.exports = contagiousdiseases;