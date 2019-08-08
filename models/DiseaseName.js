// This file defines the emergencyinfo table from our database 

const Sequelize = require("sequelize"); //imports sequelize
const db = require("../database/db.js"); // imports DB file that points to rfid db 



// creates sequelize model for emergencyinfo
module.exports = db.sequelize.define(
    "conditionname", {
        diseaseID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        diseaseName: {
            type: Sequelize.INTEGER,
           
        },
    },
    {
        freezeTableName: true, // forces table name to remain singular 
        timestamps: false // does not record timestamp for record 
    }
)
