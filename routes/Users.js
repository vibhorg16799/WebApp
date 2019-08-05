// This file handles all routes associated with the User model 

const express = require("express"); // imports express 
const users = express.Router(); // sets users to express router 
const cors = require('cors'); // imports cors 
const jwt = require(`jsonwebtoken`); // imports jwt 
const bcrypt = require('bcryptjs'); // import bcrypt 

const User = require("../models/User"); // imports user model
users.use(cors()); // sets express router to use cors 

process.env.SECRET_KEY = 'secret'; // jwt secret key 

// Precondition: frontend code posts to users/resgister: 
//  password: varchar
//  profilePhoto: varchar 
//  email: varchar 
//  address: varchar 
// Postcondition: new record is created in user table
users.post('/register', (req, res) => {
    const today = new Date()
    const userData = {
        dateTimeCreated: today,
        password: req.body.password,
        profilePhoto: req.body.profilePhoto,
        email: req.body.email,
        address: req.body.address
    }

    // Queries User table in RFID db to find user where email = email sent 
   User.findOne({
        where: {
            email: req.body.email
        }
    })
    // If user doesnt exist user is put into User table, if user does exist you are prompted with error "user already exists"
    .then(user =>{
        if(!user) {
            bcrypt.hash(req.body.password, 10, (err, hash) => { //hashes password before being sent to db 
            userData.password = hash
            User.create(userData) // creates new user record 
            .then(user => {
                res.json({status: user.email + ' registered'})
            })
            .catch(err => {
                res.send('error: ' + err) // error handling 
            })
        })
     } else {
         res.json({error: "User already exists"}) // record already exists 
     }

  })
  .catch(err => {
      res.send('error: ' + err) // error handling 
  })
})

// Precondition: frontend code posts to users/login w/ parameters in where clause: 
// email: varchar
// password: varchar
// Postcondition: record is returned in jwt form
users.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email // login parameter
        }
    })
    .then(user => {
        if(user) {
            if(bcrypt.compareSync(req.body.password,user.password)) { // tests password sent to hashed password saved to see if comparable 
                let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                    expiresIn: 1440
                })
                res.send(token) // sends record in jwt form 
            }
        }else{
            res.status(400).json({error: 'User does not exist'}) // record not found 
        }
    })
    .catch(err => {
        res.status(400).json({error: err}) // error handling 
    })
})

// Precondition: frontend code posts to users/loginscan w/ parameters found in where clause:
// email: varchar 
// Postcondition: record is returned in jwt form 
users.post('/loginscan', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email // log in paramater 
        }
    })
    .then(user => {
        if(user) {
      //      if(user.password === !null)) {
                let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                    expiresIn: 1440
                })
                res.send(token) // record in jwt form 
            }
        else{
            res.status(400).json({error: 'User does not exist'}) // record not found 
        }
    })
    .catch(err => {
        res.status(400).json({error: err}) // error handling 
    })
})

// Precondition: frontend code posts to users/logininfo w/ parameters found in where clause: 
// userID: int 
// Postcondition: email and password are returned from record found 
users.post('/logininfo', (req,res) => {
    User.findOne({
        where: {
            userID: req.body.userID // log in parameter 
        }
    }).then((user) => {
        res.send({email: user.email, password: user.password}) // email and password sent 
    })
})

module.exports = users;