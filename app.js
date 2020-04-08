// importa as configurações do servidor

var app = require('./config/server');

// Parametrizar a porta de escuta do servidor e iniciando o servidor

var server = app.listen(80, function(){
	console.log('Servidor ON');
});

// Dessa forma tanto como requisições do Socket.IO e da porta 80 ira funcionar
// Agora responde a dois protocolos diferentes
var io = require('socket.io').listen(server);

app.set('io', io);

// Criar a conexão por WebSocket

io.on('connection', function(socket) {
	console.log('Usuario Conectou (Socket) !');

	socket.on('disconnect', function(){
		console.log('Usuario Desconectou');
	});

	socket.on('msgParaServidor', function(data) { 
		// Escuta mensagem que vem do msgParaServidor
		// E emite a mensagem de volta com msgParaCliente 

		// Dialogo

		socket.emit( // Aparece para tela do usuário
			'msgParaCliente',
			{apelido: data.apelido, mensagem: data.mensagem 
		});

		socket.broadcast.emit( // Aparece para todos os usuários menos o que digitou
			'msgParaCliente',
			{apelido: data.apelido, mensagem: data.mensagem 
		});

		// Participantes

		if(parseInt(data.apelido_atualizado_nos_clientes) == 0)
		{
			socket.emit( 
				'participantesParaCliente',
				{apelido: data.apelido}
			);

			socket.broadcast.emit( 
				'participantesParaCliente',
				{apelido: data.apelido}
			);
		}



	});
});

// A instancia do objeto io na script do HTML, procura por uma uma chave connection que esta aqui no lado do servidor

