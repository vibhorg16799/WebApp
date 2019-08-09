// This file defines the emergencyinfo table from our database 

const Sequelize = require("sequelize"); //imports sequelize
var db = require("../database/db.js"); // imports DB file that points to rfid db 



// creates sequelize model for emergencyinfo
module.exports = db.sequelize.define(
    "conditionname", {
        conditionID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        conditionName: {
            type: Sequelize.STRING,
           
        },
    },
    {
        freezeTableName: true, // forces table name to remain singular 
        timestamps: false // does not record timestamp for record 
    }
)

