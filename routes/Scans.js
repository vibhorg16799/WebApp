// This file handles all routes associated with the Scan model 

const express = require("express"); // imports express
const scans = express.Router(); // sets scans as express routeer 
const cors = require('cors'); // imports cors
const jwt = require(`jsonwebtoken`); // imports jwt 
const bcrypt = require('bcryptjs');

const Scan = require("../models/Scan"); // import scan module 

scans.use(cors()); // integrates express router and cors 

process.env.SECRET_KEY = 'secret'; // secret key for jwt 


// Precondition: frontend code posts to scans/resgister:
// bandID: int
// dateTimeScanned: auto implemented dateTime
// Postcondition: new record is created in scan table
scans.post('/register', (req, res) => {
    const today = new Date()
    const userData = {
        bandID: req.body.bandID,
        dateTimeScanned: today
    }

    // Queries scan table in RFID db to find scan in table where bandID = band ID sent 
   Scan.findOne({
        where: {
            bandID: req.body.bandID,
            dateTimeScanned: userData.dateTimeScanned,
        }
    })
    // If scan doesnt exist scan is put into scan table, if scan does exist you are prompted with error "scan already exists"
    .then(scan =>{
        if(!scan) {
         //   bcrypt.hash(req.body.phoneNumber, 10, (err, hash) => {
         //   userData.phoneNumber = hash
            Scan.create(userData) // creates new scan 
            .then(scan => {
                res.json({status: scan.scanID + ' registered'})
            })
            .catch(err => {
                res.send('error: ' + err) // error handling 
            })
        
     } else {
         res.json({error: "Scan already exists"}) // scan already exists
     }

  })
  .catch(err => {
      res.send('error: ' + err) // error handling 
  })
})

// Precondition: frontend code posts to rfids/login w/ fields in where clause:
// bandID: int
// Postcondition: record queried for is sent in jwt form 
scans.post('/login', (req, res) => {
    Scan.findOne({
        where: {
            bandID: req.body.bandID
        }
    })
    .then(scan => {
        if(scan) {
       //    if(bcrypt.compareSync(req.body.phoneNumber,scan.phoneNumber)) {
                let token = jwt.sign(scan.dataValues, process.env.SECRET_KEY, {
                    expiresIn: 1440
                })
                res.send(token) // record in jwt form 
            
        }else{
            res.status(400).json({error: 'Scan does not exist'}) // record not found 
        }
    })
    .catch(err => {
        res.status(400).json({error: err}) // error handling 
    })
})


module.exports = scans;