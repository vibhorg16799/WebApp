// This file defines the emergencyinfo table from our database 

const Sequelize = require("sequelize"); //imports sequelize
const db = require("../database/db.js"); // imports DB file that points to rfid db 
const student = require("../models/Student") // imports student model for fk relationship


// creates sequelize model for emergencyinfo
module.exports = db.sequelize.define(
    "emergencyinfo", {
        userID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            references: {
                //references model User
                model: student,
                //references field userID
                key: 'userID'
            },
        },
        emergencycontact1: {
            type: Sequelize.STRING,
           
        },
        emergencycontact2: {
            type: Sequelize.STRING,
           
        },
    },
    {
        freezeTableName: true, // forces table name to remain singular 
        timestamps: false // does not record timestamp for record 
    }
)

