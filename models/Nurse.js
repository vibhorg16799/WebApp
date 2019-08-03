const Sequelize = require("sequelize"); //imports sequelize
const db = require("../database/db.js"); // imports DB file that points to rfid db 
const school = require("../models/School")

/*Forces sequilize to use the name defined in each model definition instead of plural version of model name. 
var opts = {
    define: {
        //prevent sequelize from pluralizing table names
        freezeTableName: true
    }
}*/

module.exports = db.sequelize.define(
    "nurse", {
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
        phoneNumber: {
            type: Sequelize.STRING,
           // defaultValue: Sequelize.NOW
        },
        roomNumber: {
            type: Sequelize.INTEGER,
           // defaultValue: 'jmast'
        },
    },
    {
        freezeTableName: true,
        timestamps: false
    }
)

