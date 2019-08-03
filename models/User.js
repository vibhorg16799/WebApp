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
    "user", {
        userID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        dateTimeCreated: {
            type: Sequelize.DATE,
           // defaultValue: Sequelize.NOW
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
           // defaultValue: 'jmast'
        },
        profilePhoto: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
           // defaultValue: 'jmas4@email.com'
        },
        address: {
            type: Sequelize.STRING,
            allowNull: false,
           // defaultValue: 'jmas sesame street'
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    },
    
)




//db.student.belongsTo(db.user, {foreignKey: 'userID'});
//db.school.belongsTo(db.user, {foreignKey: 'userID'});
