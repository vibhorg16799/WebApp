// This file defines the nurse table from our database 

const Sequelize = require("sequelize"); //imports sequelize
var db = require("../database/db.js"); // imports DB file that points to rfid db 
const school = require("../models/School") // imports school model for fk relationship

// creates sequelize model for nurse
module.exports = db.sequelize.define(
    "nurse", {
        userID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            references: {
                //references model User
                model: school,
                //references field userID
                key: 'userID'
            },
        },
        phoneNumber: {
            type: Sequelize.STRING,
           
        },
        roomNumber: {
            type: Sequelize.INTEGER,
           
        },
    },
    {
        freezeTableName: true, // forces table name to remain as defined 
        timestamps: false // does not record timestamps automatically 
    }
)

