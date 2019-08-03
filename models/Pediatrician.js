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
    "pediatrician", {
        pediatricianID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
           // defaultValue: Sequelize.NOW
        },
        userID: {
            type: Sequelize.INTEGER,
            references: {
                //references model User
                model: student,
                //references field userID
                key: 'userID'
            },
        },
        name: {
            type: Sequelize.STRING,
           // defaultValue: Sequelize.NOW
        },
        phoneNumber: {
            type: Sequelize.STRING,
           // defaultValue: 'jmast'
        },
    },
    {
        freezeTableName: true,
        timestamps: false
    }
)

