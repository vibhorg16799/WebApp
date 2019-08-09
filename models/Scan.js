// This file defines the scan table from our database 

const Sequelize = require("sequelize"); //imports sequelize
var db = require("../database/db.js"); // imports DB file that points to rfid db 

// creates sequelize model for scan
module.exports = db.sequelize.define(
    "scan", {
        scanID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        bandID: {
            type: Sequelize.INTEGER,
        },
        dateTimeScanned: {
            type: Sequelize.DATE,
        }
    },
    {
        freezeTableName: true, // forces table name to remain as defined 
        timestamps: false // does not record timestamps automatically 
    }
)
