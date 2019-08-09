// This file imports our mySQL database via sequalize

const Sequelize = require("sequelize"); // imports sequelize 
var db = {}; // creates db object 




//imports mySQL database w/ specified user account
var sequelize = new Sequelize("rfid", "admin","Louisville@911RFID", {
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
user = require('../models/User');
student = require('../models/Student');
school = require('../models/School');
scan = require('../models/Scan');
rfid = require('../models/RFID');
pediatrician = require('../models/Pediatrician');
nurse = require('../models/Nurse');
news = require('../models/News');
nearester = require('../models/NearestER');
emergencyinfo = require('../models/EmergencyInfo');
bloodchart = require('../models/BloodChart');


// Table Relationships
student.belongsTo(duser);
school.belongsTo(user);

student.hasOne(emergencyinfo);
student.hasOne(bloodchart);
student.hasOne(pediatrician);

school.hasOne(nearester);
school.hasOne(nurse);
school.hasOne(news);

rfid.hasMany(db.scan);
*/


// exports db object 
module.exports = db;