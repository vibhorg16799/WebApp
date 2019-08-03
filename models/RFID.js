const Sequelize = require("sequelize"); //imports sequelize
const db = require("../database/db.js"); // imports DB file that points to rfid db 
const user = require('./User') // imports User model 

/*Forces sequilize to use the name defined in each model definition instead of plural version of model name. 
var opts = {
    define: {
        //prevent sequelize from pluralizing table names
        freezeTableName: true
    }
}*/

module.exports = db.sequelize.define(
    "rfid", {
        bandID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        userID: {
            type: Sequelize.INTEGER,
            references: {
                //references model User
                model: user,
                //references field userID
                key: 'userID'
            }
        },
    },
    {
        freezeTableName: true,
        timestamps: false
    }
)