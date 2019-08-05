// This file defines the school table from our database 

const Sequelize = require("sequelize"); //imports sequelize
const db = require("../database/db.js"); // imports DB file that points to rfid db 
const user = require('./User') // imports user model for fk relationship

// creates sequelize model for school
module.exports = db.sequelize.define(
    "school", {
        //Foreign key from user.userID field, all school's are users. Therefore, they recieve their ID's from user's table
        userID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            references: {
                //references model User
                model: user,
                //references field userID
                key: 'userID'
            },
        },
        name: {
            type: Sequelize.STRING,
        },
        phoneNumber: {
            type: Sequelize.STRING,
        }
    },
    {
        freezeTableName: true, // forces table name to remain as defined 
        timestamps: false // does not record timestamps automatically 
    },
)

