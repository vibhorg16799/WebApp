// This file defines the medicalcondition table from our database 

const Sequelize = require("sequelize"); //imports sequelize
const db = require("../database/db.js"); // imports DB file that points to rfid db 
const rfid = require("../models/RFID") // imports student model for fk relationship
const diseasename = require("../models/DiseaseName") // imports condition name for fk relationship 

// creates sequelize model for emergencyinfo
module.exports = db.sequelize.define(
    "contagiousdisease", {
        bandID: {
            type: Sequelize.INTEGER,
            //primaryKey: true, //primary key for now, may change to allow multiple userID entries, which implies multiple medical conditions 
            unique: 'compositeIndex',
            references: {
                //references model User
                model: rfid,
                //references field userID
                key: 'bandID'
            },
        },
        diseaseID: { // another potential point for failure
            type: Sequelize.INTEGER,
            unique: 'compositeIndex',
            references: {
                //references model User
                model: diseasename,
                //references field userID
                key: 'diseaseID'
            }
           
        },
    },
    {
        freezeTableName: true, // forces table name to remain singular 
        timestamps: false // does not record timestamp for record 
    }
)
