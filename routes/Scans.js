const express = require("express");
const scans = express.Router();
const cors = require('cors');
const jwt = require(`jsonwebtoken`);
const bcrypt = require('bcryptjs');

const Scan = require("../models/Scan");

scans.use(cors());

process.env.SECRET_KEY = 'secret';

//School.belongsTo(User, {foreignKey: 'userID'});

scans.post('/register', (req, res) => {
    const today = new Date()
    const userData = {
        bandID: req.body.bandID,
        dateTimeScanned: today
    }

    //Queries User table in RFID db to find all users in table 
   Scan.findOne({
        where: {
            bandID: req.body.bandID
        }
    })
    //If user doesnt exist user is put into User table, if user does exist you are prompted with error "user already exists"
    .then(scan =>{
        if(!scan) {
         //   bcrypt.hash(req.body.phoneNumber, 10, (err, hash) => {
         //   userData.phoneNumber = hash
            Scan.create(userData)
            .then(scan => {
                res.json({status: scan.scanID + ' registered'})
            })
            .catch(err => {
                res.send('error: ' + err)
            })
        
     } else {
         res.json({error: "Scan already exists"})
     }

  })
  .catch(err => {
      res.send('error: ' + err)
  })
})

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
                res.send(token)
            
        }else{
            res.status(400).json({error: 'Scan does not exist'})
        }
    })
    .catch(err => {
        res.status(400).json({error: err})
    })
})


module.exports = scans;