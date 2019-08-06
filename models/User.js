// This file defines the user table from our database 

const Sequelize = require("sequelize"); //imports sequelize
const db = require("../database/db.js"); // imports DB file that points to rfid db
const student = require("../models/Student") // imports student model for relationship 
const school = require("../models/School") // imports school model for relationship

// creates sequelize model for user
module.exports = db.sequelize.define("user",
     {
        userID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        dateTimeCreated: {
            type: Sequelize.DATE,
           
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
           
        },
        profilePhoto: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
           
        },
        address: {
            type: Sequelize.STRING,
            allowNull: false,
           
        }
    },
    {
        freezeTableName: true, // forces table name to remain as defined 
        timestamps: false, // does not record timestamps automatically 
        /*classMethods: {
            associate: function() {
                school.belongsTo(user) // 1-1 school to user relationship
                student.belongsTo(user) // 1-1 student to user relationship
            }
        }*/
    }
    
)




