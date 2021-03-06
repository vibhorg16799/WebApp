// This file imports express, our node.js backend framework as well as cors, our cross origin http handler, body parser, our middleware data parser and integrates these imported modules into our express app. This file also imports all of our routes and plugs them into our app to handle CRUD operation requests from our front end React code. Finally this file sets our backend express app to run on a designated port. 

var express = require("express"); // imports express, our node.js framework
var cors = require("cors"); // imports cors, cors allows for cross origin http requests
var bodyParser = require("body-parser"); // imports body parser, Parses incoming request bodies in a middleware before your handlers recieve them
var app = express(); // sets app variable to express function 
var port = process.env.PORT || 5000;  // Port that runs app 

app.use(cors()) // integrates cors into express app 
app.use(bodyParser.json()) // integrates body parser into express app 
app.use(bodyParser.urlencoded({extended: false})) // Forces querystring library to parse URL-encoded data 

//Importing Routes 
var users = require("../routes/Users") // Imports user table routes
var schools = require("../routes/Schools") // Imports user school routes
var students = require("../routes/Students") // Imports student table routes
var rfids = require("../routes/RFIDS") // Imports rfid table routes
var scans = require("../routes/Scans") // Imports scan table routes
var nurses = require("../routes/Nurses") // Imports nurse table routes
var pediatricians = require("../routes/Pediatrician") // Imports pediatrician table routes
var bloodcharts = require("../routes/BloodCharts") // Imports bloodchart table routes
var emergencyinfos = require("../routes/EmergencyInfos") // Imports emergency info table routes 
var nearesters = require("../routes/NearestERs") // Imports nearestER table routes
var medicalconditions = require("../routes/MedicalConditions") // imports medicalcondition table routes
var conditionnames = require("../routes/ConditionNames") // imports conditionnames table routes
var contagiousdiseases = require("../routes/ContagiousDiseases") // imports contagiousdiseases table routes
var diseasenames = require("../routes/DiseaseNames") // imports dieseasenames table routes
var allergys = require("../routes/Allergys") // imports allergy table routes
var allergynames = require("../routes/AllergyNames") // imports allergynames table routes

//Implementing routes
app.use('/users', users) // implements user routes from /users 
app.use('/schools', schools) // implements user routes from /schools 
app.use('/students', students) // implements user routes from /students
app.use('/rfids', rfids) // implements user routes from /rfids
app.use('/scans', scans) // implements user routes from /scans 
app.use('/nurses', nurses) // implements user routes from /nurses
app.use('/pediatricians', pediatricians) // implements user routes from /pediatricians
app.use('/bloodcharts', bloodcharts) // implements user routes from /bloodcharts
app.use('/emergencyinfos', emergencyinfos) // implements user routes from         /emergencyinfos 
app.use('/nearesters', nearesters) // implmenets user routes from /nearesters
app.use('/medicalconditions', medicalconditions) // implements user routes from /medicalconditions
app.use('/conditionnames', conditionnames) // implements user routes from conditionname 
app.use('/contagiousdiseases', contagiousdiseases) // implements user routes from /contagiousdiseases
app.use('/diseasenames', diseasenames) // implements user routes from /diseasenames
app.use('/allergys', allergys) // implements user routes from /allergys 
app.use('/allergynames', allergynames) // implements user routes from /allergynames


// Precondition: variable port holds value that corresponds to an open port to host site on
// Postcondition: Puts app on port held in variable port
app.listen(port, function() {
    console.log("Server is running on port : " + port)
})

