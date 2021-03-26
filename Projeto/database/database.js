const Sequelize  = require("sequelize");
const Connection = new Sequelize('projeto','root','root'
,{host:'localhost',dialect: 'mysql'});
module.exports = Connection;
