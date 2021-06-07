const Sequelize = require("sequelize");
const sequelize = require("./db.js");

module.exports = function(sequelize) {
    const Dan = sequelize.define("dan",{
        naziv: Sequelize.STRING
    })
    return Dan;
}