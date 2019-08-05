// This file handles all routes associated with the School model 

const express = require("express"); // imports express
const schools = express.Router(); // sets schools to express router 
const cors = require('cors'); // imports cors 
const jwt = require(`jsonwebtoken`); // imports jwt 
const bcrypt = require('bcryptjs'); // import bcrypt 

const School = require("../models/School"); // imports school model 
const User = require("../models/User");
schools.use(cors()); // sets express router to use cors 

process.env.SECRET_KEY = 'secret'; // jwt secret key 


// Precondition: frontend code posts to schools/resgister:
// userID: int 
// name: varchar 
// phoneNumber: varchar
// Postcondition: new record is created in school table
schools.post('/register', (req, res) => {
    const userData = {
        //userID is set to pull from body text of POST request, make system to automate userID POST from user table to school and student tables
        userID: req.body.userID,
        name: req.body.name,
        phoneNumber: req.body.phoneNumber
    }

    // Queries school table in RFID db to find school where userID = userID sent 
   School.findOne({
        where: {
            userID: req.body.userID
        }
    })
    // If school doesnt exist school is put into school table, if school does exist you are prompted with error "school already exists"
    .then(school =>{
        if(!school) {
         //   bcrypt.hash(req.body.phoneNumber, 10, (err, hash) => {
         //   userData.phoneNumber = hash
            School.create(userData) // creates new school record
            .then(school => {
                res.json({status: school.name + ' registered'})
            })
            .catch(err => {
                res.send('error: ' + err)
            })
        
     } else {
         res.json({error: "School already exists"}) // school exists 
     }

  })
  .catch(err => {
      res.send('error: ' + err) // error handling 
  })
})

// Precondition: frontend code posts to schools/login w/ paremeters found in where clause:
// userID: int
// Postcondition: record is returned in jwt form 
schools.post('/login', (req, res) => {
    School.findOne({
        where: {
            userID: req.body.userID // log in parameters 
        }
    })
    .then(school => {
        if(school) {
       //    if(bcrypt.compareSync(req.body.phoneNumber,school.phoneNumber)) {
                let token = jwt.sign(school.dataValues, process.env.SECRET_KEY, {
                    expiresIn: 1440
                })
                res.send(token) // record in jwt form 
            
        }else{
            res.status(400).json({error: 'School does not exist'}) // record does not exist 
        }
    })
    .catch(err => {
        res.status(400).json({error: err}) // error hanlding 
    })
})


module.exports = schools;