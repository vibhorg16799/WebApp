// This file defines the rfid table from our database 

const Sequelize = require("sequelize"); //imports sequelize
const db = require("../database/db.js"); // imports DB file that points to rfid db 
const user = require('./User') // imports User model for fk relationship

// creates sequelize model for rfid
module.exports = db.sequelize.define(
    "rfid", {
        bandID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        userID: {
            type: Sequelize.INTEGER,
            references: {
                //references model User
                model: user,
                //references field userID
                key: 'userID'
            }
        },
    },
    {
        freezeTableName: true, // forces table name to remain as defined 
        timestamps: false // does not record timestamps automatically 
    }
)