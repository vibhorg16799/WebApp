// This file handles all routes associated with the RFID model 

const express = require("express"); // import express
const rfids = express.Router(); // sets express router to rfids
const cors = require('cors'); // import cors 
const jwt = require(`jsonwebtoken`); // import jwt 
const bcrypt = require('bcryptjs'); // import bcrypt 

const RFID = require("../models/RFID"); // import rfid model 
const User = require("../models/User"); 
rfids.use(cors()); // plugs express router into cors 

process.env.SECRET_KEY = 'secret'; // secret key for jwt 

// Precondition: frontend code posts to rfids/resgister:
// bandID: int
// userID: int
// Postcondition: new record is created in rfid table
rfids.post('/register', (req, res) => {

    // holds the highest value of userID from user table to be used as auto implemented userID 
    var newuserID = User.max('userID').then(max => {
        newuserID = max;


    const userData = {
        //userID is set to pull from body text of POST request, make system to automate userID POST from user table to school and student tables
        bandID: req.body.bandID,
        userID: newuserID,
    }

    // Queries rfid table in rfid db to find record where bandID = bandID sent to /rfids/register
   RFID.findOne({
        where: {
            bandID: req.body.bandID
        }
    })
    // If rfid doesnt exist rfid is put into rfid table, if rfid does exist you are prompted with error "user already exists"
    .then(rfid =>{
        if(!rfid) {
         //   bcrypt.hash(req.body.phoneNumber, 10, (err, hash) => {
         //   userData.phoneNumber = hash
            RFID.create(userData) // creates new rfid record with data sent to route 
            .then(rfid => {
                res.json({status: rfid.bandID + ' registered'})
            })
            .catch(err => {
                res.send('error: ' + err) // error handling 
            })
        
     } else {
         res.json({error: "RFID already exists"}) // record already exists 
     }

  })
  .catch(err => {
      res.send('error: ' + err) // error handling 
  })
})})

// Precondition: frontend code posts to rfids/login w/ fields found in where clause:
// bandID: int
// Postcondition: record is sent to frontend in jwt form
rfids.post('/login', (req, res) => {
    RFID.findOne({
        where: {
            userID: req.body.userID, //log in parameter 
        }
    })
    .then(rfid => {
        if(rfid) {
       //    if(bcrypt.compareSync(req.body.phoneNumber,school.phoneNumber)) {
                let token = jwt.sign(rfid.dataValues, process.env.SECRET_KEY, {
                    expiresIn: 1440
                })
                res.send(token) // record data sent as jwt 
                
        }else{
            res.status(400).json({error: 'RFID does not exist'}) // record not found 
        }
    })
    .catch(err => {
        res.status(400).json({error: err}) // error handling
    })
})

// Precondition: frontend code posts to rfids/id, sequelize searches fields found in where clause:
// bandID: int
// Postcondition: returns userID of record found
rfids.post('/id', (req,res) => {
    RFID.findOne({
        where: {
            bandID: req.body.bandID
        }
    })
    .then((rfid) => {
        res.send({userID: rfid.userID})
    })
})

// Precondition: frontend code posts to rfids/bands, sequelize searches for fields found in where clause:
// bandID: int
// Postcondition: returns bandID's of userID provided
rfids.post('/bands', (req,res) => {
    RFID.findAll({
        attributes: ['bandID'],
        where: {
            userID: req.body.userID
        }
    })
    .then((rfid) => {
        if(rfid){
        res.send(rfid);
        }
        else{
            res.status(400).json({error: 'RFID does not exist'}); // record not found 
        }
    })
    .catch(err =>{
        console.log("Error: " + err);
    })
})



module.exports = rfids;