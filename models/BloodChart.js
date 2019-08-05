// This file defines the bloodchart table from our database 

const Sequelize = require("sequelize"); //imports sequelize
const db = require("../database/db.js"); // imports DB file that points to rfid db 
const student = require("../models/Student") // imports student model for fk relationship


// creates sequelize model for bloodchart
module.exports = db.sequelize.define(
    "bloodchart", {
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
        bloodType: {
            type: Sequelize.INTEGER,
          
        },
    },
    {
        freezeTableName: true, // forces table name to remain as defined 
        timestamps: false // does not record timestamps automatically 
    }
)

