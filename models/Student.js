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
    "student", {
        userID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            references: {
                //references model User
                model: user,
                //references field userID
                key: 'userID'
            }
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
        freezeTableName: true,
        timestamps: false
    }
)

//db.student.belongsTo(db.user, {foreignKey: 'userID'});
