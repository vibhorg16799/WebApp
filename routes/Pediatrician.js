const express = require("express");
const pediatricians = express.Router();
const cors = require('cors');
const jwt = require(`jsonwebtoken`);
const bcrypt = require('bcryptjs');

const Pediatrician = require("../models/Pediatrician");

pediatricians.use(cors());

process.env.SECRET_KEY = 'secret';

//School.belongsTo(User, {foreignKey: 'userID'});

pediatricians.post('/register', (req, res) => {
    const userData = {
        userID: req.body.userID,
        name: req.body.name,
        phoneNumber: req.body.phoneNumber
    }

    //Queries User table in RFID db to find all users in table 
   Pediatrician.findOne({
        where: {
            name: req.body.name
        }
    })
    //If user doesnt exist user is put into User table, if user does exist you are prompted with error "user already exists"
    .then(pediatrician =>{
        if(!pediatrician) {
         //   bcrypt.hash(req.body.phoneNumber, 10, (err, hash) => {
         //   userData.phoneNumber = hash
            Pediatrician.create(userData)
            .then(pediatrician => {
                res.json({status: pediatrician.name + ' registered'})
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

pediatricians.post('/login', (req, res) => {
    Pediatrician.findOne({
        where: {
            name: req.body.name
        }
    })
    .then(pediatrician => {
        if(pediatrician) {
       //    if(bcrypt.compareSync(req.body.phoneNumber,scan.phoneNumber)) {
                let token = jwt.sign(pediatrician.dataValues, process.env.SECRET_KEY, {
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


module.exports = pediatricians;