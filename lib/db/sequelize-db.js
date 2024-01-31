const {Sequelize,Op} = require("sequelize")
const sequelize = new Sequelize('test', 'root', '111111', {
  host: 'localhost',
  dialect: 'mysql'
});

const DataTypes = require("sequelize").DataTypes;

module.exports = {'mysql':{sequelize:sequelize},dataTypes:DataTypes,Op:Op}
