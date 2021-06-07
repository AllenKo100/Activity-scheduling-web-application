const Sequelize = require("sequelize");
const sequelize = require("./db.js");

module.exports = function(sequelize) {
    const Student = sequelize.define("student",{
        ime: Sequelize.STRING,
        index: Sequelize.STRING
    })
    return Student;
}