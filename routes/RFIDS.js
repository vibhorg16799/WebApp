const express = require("express");
const rfids = express.Router();
const cors = require('cors');
const jwt = require(`jsonwebtoken`);
const bcrypt = require('bcryptjs');

const RFID = require("../models/RFID");
const User = require("../models/User");
rfids.use(cors());

process.env.SECRET_KEY = 'secret';

//School.belongsTo(User, {foreignKey: 'userID'});

rfids.post('/register', (req, res) => {
    const userData = {
        //userID is set to pull from body text of POST request, make system to automate userID POST from user table to school and student tables
        bandID: req.body.bandID,
        userID: req.body.userID,
    }

    //Queries User table in RFID db to find all users in table 
   RFID.findOne({
        where: {
            bandID: req.body.bandID
        }
    })
    //If user doesnt exist user is put into User table, if user does exist you are prompted with error "user already exists"
    .then(rfid =>{
        if(!rfid) {
         //   bcrypt.hash(req.body.phoneNumber, 10, (err, hash) => {
         //   userData.phoneNumber = hash
            RFID.create(userData)
            .then(rfid => {
                res.json({status: rfid.bandID + ' registered'})
            })
            .catch(err => {
                res.send('error: ' + err)
            })
        
     } else {
         res.json({error: "RFID already exists"})
     }

  })
  .catch(err => {
      res.send('error: ' + err)
  })
})

rfids.post('/login', (req, res) => {
    RFID.findOne({
        where: {
            bandID: req.body.bandID,
        }
    })
    .then(rfid => {
        if(rfid) {
       //    if(bcrypt.compareSync(req.body.phoneNumber,school.phoneNumber)) {
                let token = jwt.sign(rfid.dataValues, process.env.SECRET_KEY, {
                    expiresIn: 1440
                })
                res.send(token)
            
        }else{
            res.status(400).json({error: 'RFID does not exist'})
        }
    })
    .catch(err => {
        res.status(400).json({error: err})
    })
})

//get user id from bandID 
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



module.exports = rfids;