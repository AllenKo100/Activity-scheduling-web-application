const Sequelize = require("sequelize");
const sequelize = require("./db.js");

module.exports = function(sequelize) {
    const Aktivnost = sequelize.define("aktivnost",{
        naziv: Sequelize.STRING,
        pocetak: Sequelize.FLOAT,
        kraj: Sequelize.FLOAT
    })
    return Aktivnost;
}