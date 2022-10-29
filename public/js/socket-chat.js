var socket = io();

var param = new URLSearchParams( window.location.search);

//const {renderUsuarios} = require('./socket-chat-jquery.js');

if(!param.has('nombre') || !param.has('sala')){
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesarios');
}

var usuario = {
    nombre: param.get('nombre'),
    sala: param.get('sala')
};

socket.on('connect', function() {

    console.log('Conectado al servidor');

    socket.emit('entrar-chat', usuario, function(resp){
        renderUsuarios(resp);
    });
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');
});


// Enviar información
// socket.emit('crear-mensaje', {
//     usuario: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('crear-mensaje', function(mensaje) {

    //console.log('Servidor:', mensaje);
    renderizarMensajes(mensaje, false);
    scrollBottom();
});

// cuando usuario entra o sale del chat
socket.on('lista-conectados', function(personas) {
    renderUsuarios(personas);
});

// mensajes privados
socket.on('mensaje-privado', function(mensaje){

    console.log('mensaje privado: ', mensaje);
});