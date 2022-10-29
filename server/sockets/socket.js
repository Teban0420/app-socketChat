const { io } = require('../server');
const {Usuarios} = require('../clases/usuarios.js'); 
const usuarios = new Usuarios();
const {crearMensaje} = require('../utilidades/utilidades.js');


io.on('connection', (client) => {

    client.on('entrar-chat', (data, callback) => {

        if(!data.nombre || !data.sala){
            return callback({
                error: true,
                msg: 'El nombre y la sala son necesarios'
            });
        }

        // unimos al cliente a una sala 
        client.join(data.sala);

        usuarios.agregarpersona(client.id, data.nombre, data.sala);
        client.broadcast.to(data.sala).emit('lista-conectados', usuarios.getPersonasPorSala(data.sala));
        client.broadcast.to(data.sala).emit('crear-mensaje', crearMensaje('Administrador', `${data.nombre} se unio al chat`));

        callback(usuarios.getPersonasPorSala(data.sala));
    });

    client.on('crear-mensaje', (data, callback) => {

        let persona = usuarios.getPersona(client.id);

        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        client.broadcast.to(persona.sala).emit('crear-mensaje', mensaje);        

        callback(mensaje);
    });

    client.on('disconnect', () =>{

        let persona_borrada = usuarios.borrarPersona(client.id);
        client.broadcast.to(persona_borrada.sala).emit('crear-mensaje', crearMensaje('Administrador', `${persona_borrada.nombre} abandonó el chat`));
        client.broadcast.to(persona_borrada.sala).emit('lista-conectados', usuarios.getPersonasPorSala(persona_borrada.sala));
    });

    // mensajes privados
    client.on('mensaje-privado', data =>{

        let persona = usuarios.getPersona(client.id);
        client.broadcast.to(data.para).emit('mensaje-privado', crearMensaje(persona.nombre, data.nombre));
    });

});