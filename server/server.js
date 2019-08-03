var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var app = express();
var port = process.env.PORT || 5000;  //Port that runs app 

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

//Routes 
var Users = require("../routes/Users")
var Schools = require("../routes/Schools")
var Students = require("../routes/Students")
var RFIDS = require("../routes/RFIDS")
var Scans = require("../routes/Scans")
var Nurses = require("../routes/Nurses")
var Pediatricians = require("../routes/Pediatrician")

//Implementing routes
app.use('/users', Users)
app.use('/schools', Schools)
app.use('/students', Students)
app.use('/rfids', RFIDS)
app.use('/scans', Scans)
app.use('/nurses', Nurses)
app.use('/pediatricians', Pediatricians)

//Puts app on var port 
app.listen(port, function() {
    console.log("Server is running on port : " + port)
})

