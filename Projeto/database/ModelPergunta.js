const Sequelize  = require("sequelize");  //importando o  sequelize
const Connection = require("./database"); //importanto a conexão com o banco

const Pergunta = Connection.define('Pergunta',{  // Desenhando a tabela que vai ser criada no banco
    titulo:{                                     // Nome do campo
        type: Sequelize.STRING,                  // Tipo do Campo
        allowNull: false                         // Não e permitido Nullo
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    }
},);

Pergunta.sync ({force: false}).then(() => { // Não força a criação da tabela se ela já existir  
    console.log("Tabelas criadas")}); 

module.exports = Pergunta;    
