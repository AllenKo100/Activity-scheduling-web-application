const Sequelize = require("sequelize");
const sequelize = require("./db.js");

module.exports = function(sequelize) {
    /*const Grupa = sequelize.define("grupa",{
        naziv: Sequelize.STRING
    })
    return Grupa;*/
    const Grupa = sequelize.define('Grupa', {
        naziv: {
            type: Sequelize.STRING,
            allowNull: false
        },
    }, {
        name: {
            singular: 'Grupa',
            plural: 'Grupe',
        }
    });
 return Grupa;
}