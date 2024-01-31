var DataTypes = require("sequelize").DataTypes;
var _bvb = require("./bvb");
var _teata = require("./teata");

function initModels(sequelize) {
  var bvb = _bvb(sequelize, DataTypes);
  var teata = _teata(sequelize, DataTypes);


  return {
    bvb,
    teata,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
