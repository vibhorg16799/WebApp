// This file defines the news table from our database 

const Sequelize = require("sequelize"); //imports sequelize
const db = require("../database/db.js"); // imports DB file that points to rfid db 
const school = require("../models/School") // imports school model for fk relationship

// creates sequelize model for news
module.exports = db.sequelize.define(
    "news", {
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
        state: {
            type: Sequelize.INTEGER,
           
        },
        mostCommonConcern: {
            type: Sequelize.STRING,
           
        },
        weeklyConcern: {
            type: Sequelize.STRING,
        },
    },
    {
        freezeTableName: true, // forces table name to remain as defined 
        timestamps: false // does not record timestamps automatically 
    }
)

