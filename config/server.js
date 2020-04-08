// Configuração do Servidor

var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

// Iniciando o Express
var app = express();

// Setando as variaveis 'view engine' e 'views' do express
app.set('view engine', 'ejs');
app.set('views', './app/views');

// Configurando os Middleware
app.use(express.static('./app/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());

// Consign que efetua o autoload das rotas
consign()
	.include('app/routes')
	.then('app/models')
	.then('app/controllers')
	.into(app);

module.exports = app;