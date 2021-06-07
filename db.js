const Sequelize = require("sequelize");
const sequelize = new Sequelize("wt2018314","root","root",{
    host:"localhost",
    dialect:"mysql",
    /*define: {
        freezeTableName: true
    }*/
});
const db={};

db.Sequelize = Sequelize;  
db.sequelize = sequelize;


module.exports=sequelize;