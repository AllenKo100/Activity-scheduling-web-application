const Sequelize = require("sequelize");
const sequelize = require("./db.js");

module.exports = function(sequelize) {
    const Predmet = sequelize.define("predmet",{
        naziv: Sequelize.STRING
    })
    return Predmet;
}