// This file handles all routes associated with the Student model 

const express = require("express"); // imports express 
const students = express.Router(); // sets students to express router 
const cors = require('cors'); // imports cors 
const jwt = require(`jsonwebtoken`); // imports jwt 
const bcrypt = require('bcryptjs');

const Student = require("../models/Student"); // imports student model 
const User = require("../models/User")
students.use(cors()); // forces express router to use cors 

process.env.SECRET_KEY = 'secret'; // jwt secret key

// holds the highest value of userID from user table to be used as auto implemented userID 
var newuserID = User.max('userID').then(max => {
    newuserID = max;
})

// Precondition: frontend code posts to students/resgister: 
// userID: int
// pediatricianID: int
// firstName: varchar 
// lastName: varchar 
// school: varchar
// Postcondition: new record is created in student table
students.post('/register', (req, res) => {
    const userData = {
        userID: newuserID,
        pediatricianID: req.body.pediatricianID,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        school: req.body.school
    }

    // Queries student table in RFID db to find student in table where userID = userID sent
   Student.findOne({
        where: {
            userID: userData.userID
            // was req.body.userID
        }
    })
    // If student doesnt exist student is put into student table, if student does exist you are prompted with error "student already exists"
    .then(student =>{
        if(!student) {
        //    bcrypt.hash(req.body.school, 10, (err, hash) => {
        //    userData.school = hash
            Student.create(userData) // creates new student record
            .then(student => {
                res.json({status: student.firstName + ' ' +
                    student.lastName + ' registered'})
            })
            .catch(err => {
                res.send('error: ' + err) // error handling 
            })
        
     } else {
         res.json({error: "User already exists"}) // record already exists 
     }

  })
  .catch(err => {
      res.send('error: ' + err) // error handling 
  })
})

// Precondition: frontend code posts to rfids/lgoin w/ parameters found in where clause:
// userID: int 
// Postcondition: record is returned in jwt form 
students.post('/login', (req, res) => {
    Student.findOne({
        where: {
            userID: req.body.userID // login parameter 
        }
    })
    .then(student => {
        if(student) {
         //   if(bcrypt.compareSync(req.body.school,user.school)) {
                let token = jwt.sign(student.dataValues, process.env.SECRET_KEY, {
                    expiresIn: 1440
                })
                res.send(token) // sends record in jwt form 
            
        }else{
            res.status(400).json({error: 'Student does not exist'}) // record doesn't exist 
        }
    })
    .catch(err => {
        res.status(400).json({error: err}) // error handling 
    })
})


module.exports = students;