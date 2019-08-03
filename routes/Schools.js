const express = require("express");
const schools = express.Router();
const cors = require('cors');
const jwt = require(`jsonwebtoken`);
const bcrypt = require('bcryptjs');

const School = require("../models/School");
const User = require("../models/User");
schools.use(cors());

process.env.SECRET_KEY = 'secret';

//School.belongsTo(User, {foreignKey: 'userID'});

schools.post('/register', (req, res) => {
    const userData = {
        //userID is set to pull from body text of POST request, make system to automate userID POST from user table to school and student tables
        userID: req.body.userID,
        name: req.body.name,
        phoneNumber: req.body.phoneNumber
    }

    //Queries User table in RFID db to find all users in table 
   School.findOne({
        where: {
            userID: req.body.userID
        }
    })
    //If user doesnt exist user is put into User table, if user does exist you are prompted with error "user already exists"
    .then(school =>{
        if(!school) {
         //   bcrypt.hash(req.body.phoneNumber, 10, (err, hash) => {
         //   userData.phoneNumber = hash
            School.create(userData)
            .then(school => {
                res.json({status: school.name + ' registered'})
            })
            .catch(err => {
                res.send('error: ' + err)
            })
        
     } else {
         res.json({error: "School already exists"})
     }

  })
  .catch(err => {
      res.send('error: ' + err)
  })
})

schools.post('/login', (req, res) => {
    School.findOne({
        where: {
            userID: req.body.userID
        }
    })
    .then(school => {
        if(school) {
       //    if(bcrypt.compareSync(req.body.phoneNumber,school.phoneNumber)) {
                let token = jwt.sign(school.dataValues, process.env.SECRET_KEY, {
                    expiresIn: 1440
                })
                res.send(token)
            
        }else{
            res.status(400).json({error: 'School does not exist'})
        }
    })
    .catch(err => {
        res.status(400).json({error: err})
    })
})


module.exports = schools;