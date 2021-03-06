// This file defines the student table from our database 

const Sequelize = require("sequelize"); //imports sequelize
var db = require("../database/db.js"); // imports DB file that points to rfid db 
const user = require('./User') // imports User model 

// creates sequelize model for student
module.exports = db.sequelize.define(
    "student", {
        userID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            references: {
                //references model User
                model: user,
                //references field userID
                key: 'userID'
            },
            get() { 
                var userID =  user.max('userID').then(max => {
                    return max;
                })                                                          
                return userID; 
            },
            defaultValuye: {set(userID) {
                this.setDataValue(userID);
            }},

            
        },
        pediatricianID: {
            type: Sequelize.INTEGER,
        },
        firstName: {
            type: Sequelize.STRING,
        },
        lastName: {
            type: Sequelize.STRING,
        },
        school: {
            type: Sequelize.INTEGER,
        },
    },
    {
        freezeTableName: true, // forces table name to remain as defined 
        timestamps: false, // does not record timestamps automatically 
        /*classMethods: {
            associate: function() {
                student.belongsTo(user) // 1-1 student to user relationship
            }
        }*/
    }
)






