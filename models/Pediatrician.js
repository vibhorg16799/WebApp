// This file defines the pediatrician table from our database 

const Sequelize = require("sequelize"); //imports sequelize
var db = require("../database/db.js"); // imports DB file that points to rfid db 
const student = require("../models/Student") // imports student model for fk relationship

// creates sequelize model for pediatrician
module.exports = db.sequelize.define(
    "pediatrician", {
        pediatricianID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
           
        },
        userID: {
            type: Sequelize.INTEGER,
            references: {
                //references model User
                model: student,
                //references field userID
                key: 'userID'
            },
        },
        name: {
            type: Sequelize.STRING,
           
        },
        phoneNumber: {
            type: Sequelize.STRING,
           
        },
    },
    {
        freezeTableName: true, // forces table name to remain as defined 
        timestamps: false  // does not record timestamps automatically 
    }
)

