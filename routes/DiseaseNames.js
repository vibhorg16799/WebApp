// This file handles all routes associated with the RFID model 

const express = require("express"); // import express
const diseasenames = express.Router(); // sets express router to rfids
const cors = require('cors'); // import cors 
const jwt = require(`jsonwebtoken`); // import jwt 
const bcrypt = require('bcryptjs'); // import bcrypt 

const DiseaseName = require("../models/DiseaseName"); // import rfid model 
const User = require("../models/User"); 
diseasenames.use(cors()); // plugs express router into cors 

process.env.SECRET_KEY = 'secret'; // secret key for jwt 

// Precondition: frontend code posts to rfids/resgister:
// bandID: int
// userID: int
// Postcondition: new record is created in rfid table
diseasenames.post('/register', (req, res) => {
    const userData = {
        //userID is set to pull from body text of POST request, make system to automate userID POST from user table to school and student tables
        diseaseID: req.body.diseaseID,
        diseaseName: req.body.diseaseName,
    }

    // Queries rfid table in rfid db to find record where bandID = bandID sent to /rfids/register
   DiseaseName.findOne({
        where: {
            diseaseID: req.body.diseaseID
        }
    })
    // If rfid doesnt exist rfid is put into rfid table, if rfid does exist you are prompted with error "user already exists"
    .then(diseasename =>{
        if(!diseasename) {
         //   bcrypt.hash(req.body.phoneNumber, 10, (err, hash) => {
         //   userData.phoneNumber = hash
            DiseaseName.create(userData) // creates new rfid record with data sent to route 
            .then(diseasename => {
                res.json({status: diseasename.diseaseID + ' registered'})
            })
            .catch(err => {
                res.send('error: ' + err) // error handling 
            })
        
     } else {
         res.json({error: "Disease Name already exists"}) // record already exists 
     }

  })
  .catch(err => {
      res.send('error: ' + err) // error handling 
  })
})

// Precondition: frontend code posts to rfids/login w/ fields found in where clause:
// bandID: int
// Postcondition: record is sent to frontend in jwt form
diseasenames.post('/login', (req, res) => {
    DiseaseName.findOne({
        where: {
            diseaseID: req.body.diseaseID //log in parameter 
        }
    })
    .then(diseasename => {
        if(diseasename) {
       //    if(bcrypt.compareSync(req.body.phoneNumber,school.phoneNumber)) {
                let token = jwt.sign(diseasename.dataValues, process.env.SECRET_KEY, {
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
diseasenames.post('/id', (req,res) => {
    DiseaseName.findOne({
        where: {
            diseaseID: req.body.diseaseID
        }
    })
    .then((diseasename) => {
        res.send({userID: rfid.userID})
    })
})

diseasenames.post('/list', (req,res) => {
    DiseaseName.findAll({
        attributes: ['diseaseName'],
        where: {
            diseaseID: [req.body.diseaseID1, req.body.diseaseID2, req.body.diseaseID3, req.body.diseaseID4]
        }
    })
    .then((disease) => {
        if(disease){
        res.send(disease);
        }
        else{
            res.status(400).json({error: 'disease Name does not exist'}); // record not found 
        }
    })
    .catch(err =>{
        console.log("Error: " + err);
    })
})




module.exports = diseasenames;