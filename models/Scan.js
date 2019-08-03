const Sequelize = require("sequelize"); //imports sequelize
const db = require("../database/db.js"); // imports DB file that points to rfid db 


/*Forces sequilize to use the name defined in each model definition instead of plural version of model name. 
var opts = {
    define: {
        //prevent sequelize from pluralizing table names
        freezeTableName: true
    }
}*/

module.exports = db.sequelize.define(
    "scan", {
        scanID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        bandID: {
            type: Sequelize.INTEGER,
        },
        dateTimeScanned: {
            type: Sequelize.DATE,
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
)

