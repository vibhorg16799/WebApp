const express = require("express");
const students = express.Router();
const cors = require('cors');
const jwt = require(`jsonwebtoken`);
const bcrypt = require('bcryptjs');

const Student = require("../models/Student");
const User = require("../models/User")
students.use(cors());

process.env.SECRET_KEY = 'secret';


students.post('/register', (req, res) => {
    const userData = {
        userID: req.body.userID,
        pediatricianID: req.body.pediatricianID,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        school: req.body.school
    }

    //Queries User table in RFID db to find all users in table 
   Student.findOne({
        where: {
            userID: req.body.userID
        }
    })
    //If user doesnt exist user is put into User table, if user does exist you are prompted with error "user already exists"
    .then(student =>{
        if(!student) {
        //    bcrypt.hash(req.body.school, 10, (err, hash) => {
        //    userData.school = hash
            Student.create(userData)
            .then(student => {
                res.json({status: student.firstName + ' ' +
                    student.lastName + ' registered'})
            })
            .catch(err => {
                res.send('error: ' + err)
            })
        
     } else {
         res.json({error: "User already exists"})
     }

  })
  .catch(err => {
      res.send('error: ' + err)
  })
})

students.post('/login', (req, res) => {
    Student.findOne({
        where: {
            userID: req.body.userID
        }
    })
    .then(student => {
        if(student) {
         //   if(bcrypt.compareSync(req.body.school,user.school)) {
                let token = jwt.sign(student.dataValues, process.env.SECRET_KEY, {
                    expiresIn: 1440
                })
                res.send(token)
            
        }else{
            res.status(400).json({error: 'Student does not exist'})
        }
    })
    .catch(err => {
        res.status(400).json({error: err})
    })
})


module.exports = students;