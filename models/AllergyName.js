// This file defines the medicalcondition table from our database 

const Sequelize = require("sequelize"); //imports sequelize
const db = require("../database/db.js"); // imports DB file that points to rfid db 


// creates sequelize model for emergencyinfo
module.exports = db.sequelize.define(
    "allergyname", {
        allergyID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        allergyName: { // another potential point for failure
            type: Sequelize.INTEGER,
        },
    },
    {
        freezeTableName: true, // forces table name to remain singular 
        timestamps: false // does not record timestamp for record 
    }
)
