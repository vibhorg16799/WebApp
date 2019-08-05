// This file imports our mySQL database via sequalize

const Sequelize = require("sequelize"); // imports sequelize 
const db = {}; // creates db object 

//imports mySQL database w/ specified user account
const sequelize = new Sequelize("rfid", "admin","Louisville@911RFID", {
    dialect: 'mysql',
    host: 'localhost',
    define: {
        timestamps: false
    },

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

//instantiates sequelize for models in db object 
db.sequelize = sequelize;
db.Sequelize = Sequelize;

/* 
// Models/Tables
db.user = require('../models/User');
db.student = require('../models/Student');
db.school = require('../models/School');
db.scan = require('../models/Scan');
db.rfid = require('../models/RFID');
db.pediatrician = require('../models/Pediatrician');
db.nurse = require('../models/Nurse');
db.news = require('../models/News');
db.nearester = require('../models/NearestER');
db.emergencyinfo = require('../models/EmergencyInfo');
db.bloodchart = require('../models/BloodChart');


// Table Relationships
db.student.belongsTo(db.user);
db.school.belongsTo(db.user);

db.student.hasOne(db.emergencyinfo);
db.student.hasOne(db.bloodchart);
db.student.hasOne(db.pediatrician);

db.school.hasOne(db.nearester);
db.school.hasOne(db.nurse);
db.school.hasOne(db.news);

db.rfid.hasMany(db.scan);
*/


// exports db object 
module.exports = db;