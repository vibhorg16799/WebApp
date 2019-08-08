// This file defines the nearester table from our database 

const Sequelize = require("sequelize"); //imports sequelize
const db = require("../database/db.js"); // imports DB file that points to rfid db 
const school = require("../models/School") // imports school model for fk relationship

// creates sequelize model for nearester 
module.exports = db.sequelize.define(
    "nearester", {
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
        address: {
            type: Sequelize.STRING,
           
        },
        phoneNumber: {
            type: Sequelize.STRING,
          
        },
    },
    {
        freezeTableName: true, // forces table name to remain as defined 
        timestamps: false // does not record timestamps automatically 
    }
)

