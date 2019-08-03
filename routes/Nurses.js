const express = require("express");
const nurss = express.Router();
const cors = require('cors');
const jwt = require(`jsonwebtoken`);
const bcrypt = require('bcryptjs');

const Nurse = require("../models/Nurse");
const User = require("../models/User");
nurss.use(cors());

process.env.SECRET_KEY = 'secret';

//School.belongsTo(User, {foreignKey: 'userID'});

nurss.post('/register', (req, res) => {
    const userData = {
        //userID is set to pull from body text of POST request, make system to automate userID POST from user table to school and student tables
        userID: req.body.userID,
        phoneNumber: req.body.phoneNumber,
        roomNumber: req.body.roomNumber
    }

    //Queries User table in RFID db to find all users in table 
   Nurse.findOne({
        where: {
            userID: req.body.userID
        }
    })
    //If user doesnt exist user is put into User table, if user does exist you are prompted with error "user already exists"
    .then(nurse =>{
        if(!nurse) {
         //   bcrypt.hash(req.body.phoneNumber, 10, (err, hash) => {
         //   userData.phoneNumber = hash
            Nurse.create(userData)
            .then(nurse => {
                res.json({status: nurse.userID + ' registered'})
            })
            .catch(err => {
                res.send('error: ' + err)
            })
        
     } else {
         res.json({error: "Nurse already exists"})
     }

  })
  .catch(err => {
      res.send('error: ' + err)
  })
})

nurss.post('/login', (req, res) => {
    Nurse.findOne({
        where: {
            userID: req.body.userID
        }
    })
    .then(nurse => {
        if(nurse) {
       //    if(bcrypt.compareSync(req.body.phoneNumber,school.phoneNumber)) {
                let token = jwt.sign(nurse.dataValues, process.env.SECRET_KEY, {
                    expiresIn: 1440
                })
                res.send(token)
            
        }else{
            res.status(400).json({error: 'Nurse does not exist'})
        }
    })
    .catch(err => {
        res.status(400).json({error: err})
    })
})


module.exports = nurss;