const Sequelize  = require("sequelize");  //importando o  sequelize
const Connection = require("./database"); //importanto a conexão com o banco

const Resposta = Connection.define('Resposta',{ // Desenhando a tabela que vai ser criada no banco
    corpo:{                                     // Nome do campo
        type: Sequelize.TEXT,                   // Tipo do Campo
        allowNull: false                        // Não e permitido Nullo
    },
    perguntaid:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
},);

Resposta.sync ({force: false}).then(() => { // Não força a criação da tabela se ela já existir  
    console.log("Tabelas criadas")}); 

module.exports = Resposta;    
