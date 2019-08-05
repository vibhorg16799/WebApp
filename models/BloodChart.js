const Sequelize = require("sequelize"); //imports sequelize
const db = require("../database/db.js"); // imports DB file that points to rfid db 
const student = require("../models/Student")

/*Forces sequilize to use the name defined in each model definition instead of plural version of model name. 
var opts = {
    define: {
        //prevent sequelize from pluralizing table names
        freezeTableName: true
    }
}*/

module.exports = db.sequelize.define(
    "nearester", {
        userID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            references: {
                //references model User
                model: student,
                //references field userID
                key: 'userID'
            },
        },
        bloodType: {
            type: Sequelize.INTEGER,
           // defaultValue: Sequelize.NOW
        },
    },
    {
        freezeTableName: true,
        timestamps: false
    }
)
