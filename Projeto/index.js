// Utilizando  o express
const express = require("express");
const projeto = express();
const bodyparser =  require("body-parser");
const Connection = require("./database/database");
const ModelPergunta = require("./database/ModelPergunta");
const ModelResposta = require("./database/ModelResposta");

//Banco de dados
Connection
.authenticate()
.then(() =>{
    console.log("Conexão feita com sucesso");})
.catch((msgErro)=> {
    console.log("Não Conectou");}); 
    
    
// Estou dizendo para o express usar o EJS como view Engine
projeto.set('view engine','ejs');
projeto.use(express.static('Public'));

//Body-parser
projeto.use(bodyparser.urlencoded({extended: false})); //Permite que  a pessoa envia o formulario e agente consegue usar o script
projeto.use(bodyparser.json());

//Rota index
projeto.get("/",(req,res) =>{
    ModelPergunta.findAll({ raw: true, order:[
        ['id','ASC'] // ASC = Crescente || DESC = Decresente
    ]}).then(pergunta =>{
        res.render("index",{
            pergunta: pergunta
        });
    });    
});
//Rota Perguntar
projeto.get("/perguntar",(req,res) =>{
    res.render("perguntar");
});

// Rota Para localizar uma pergunta pelo ID
projeto.get("/perg/:id",(req,res) =>{
    var id = req.params.id;
    ModelPergunta.findOne({
        where: {id: id}
    }).then(pergunta =>{
        if(pergunta != undefined){ //Achou a pergunta

            ModelResposta.findAll({
                where: {perguntaid: pergunta.id},
                order:[['id','DESC']]
            }).then(resposta =>{
                res.render("perg" ,{
                pergunta: pergunta,
                resposta: resposta
            });          
        });    
        }else{ // não acho encontrada
            res.redirect("/")
        }
    });
});

//Rota Salvar pergunta
projeto.post("/salvar",(req,res) => {
    var titulo = req.body.titulo;
    var desc = req.body.descricao;
    ModelPergunta.create({
        titulo: titulo,
        descricao: desc
    }).then(() =>{
        res.redirect("/");
    });
     
});

// Rota para localizar a resposta 
projeto.post("/resp",(req,res)=> {
    var corpo = req.body.corpo;
    var perguntaid = req.body.pergunta;
    if(corpo != ''){ 
    ModelResposta.create({
        corpo: corpo,
        perguntaid: perguntaid
    }).then(() =>{
        res.redirect("/final");
    });
     } else{ // não acho encontrada
     res.redirect("/")}
});

projeto.get("/final",(req,res) =>{
    res.render("final");
});

// Librando a Porta do servidor local
projeto.listen(8080,()=>{console.log ("Projeto Rodando");});
