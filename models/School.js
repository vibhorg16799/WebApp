const Sequelize = require("sequelize"); //imports sequelize
const db = require("../database/db.js"); // imports DB file that points to rfid db 
const user = require('./User')
/*Forces sequilize to use the name defined in each model definition instead of plural version of model name. 
var opts = {
    define: {
        //prevent sequelize from pluralizing table names
        freezeTableName: true
    }
}*/

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
        freezeTableName: true,
        timestamps: false
    },
)

//db.school.belongsTo(db.user, {foreignKey: 'userID'});