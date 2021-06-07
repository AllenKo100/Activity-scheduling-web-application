const Sequelize = require("sequelize");
const sequelize = require("./db.js");

module.exports = function(sequelize) {
    const Tip = sequelize.define("tip",{
        naziv: Sequelize.STRING
    })
    return Tip;
}