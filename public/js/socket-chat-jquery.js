
// aqui van todas las funciones para renderizar el html de usuarios

// referencias jquery
var divUsuarios = $('#divUsuarios');
var formenviar = $('#formEnviar'); 
var txtMensaje = $('#txtMensaje');
var chatbox = $('#divChatbox');

var param = new URLSearchParams( window.location.search);

var nombre = param.get('nombre');
var sala = param.get('sala');

function renderUsuarios( personas){
    console.log(personas);

    var html = '';

html += '<li>';
html +=     '<a href="javascript:void(0)" class="active"> Chat de <span> '+ param.get('sala')+' </span></a>';
html += '</li>';

for( var i = 0; i < personas.length; i++){
    html += '<li>';
    html +=     '<a data-id=" '+ personas[i].id +'" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>'+ personas[i].nombre +'<small class="text-success">online</small></span></a>';
    html += '</li>';
}

divUsuarios.html(html);
}

function renderizarMensajes(mensaje, yo){
    
    var html = '';
    var fecha =  new Date(mensaje.fecha);
    var hora = fecha.getHours() + ':' + fecha.getMinutes();
    var adminClass = 'info';

    if(mensaje.nombre == 'Administrador'){
        adminClass = 'danger';
    }

    if(yo){
        html += '<li class="reverse">';
        html += '    <div class="chat-content">';
        html += '        <h5>'+ mensaje.nombre +'</h5>';
        html += '        <div class="box bg-light-inverse">'+ mensaje.mensaje +'</div>';
        html += '    </div>';
        html += '    <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
        html += '    <div class="chat-time">'+ hora+'</div>';
        html += '</li>';
    }
    else{
        html += '<li class="animated fadeIn">';

        if(mensaje.nombre != 'Administrador'){
            html += '    <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
        }
        html += '    <div class="chat-content">';
        html += '        <h5>'+ mensaje.nombre +'</h5>';
        html += '        <div class="box bg-light-'+ adminClass+'">'+ mensaje.mensaje +'</div>';
        html += '    </div>';
        html += '    <div class="chat-time">'+ hora+'</div>';
        html += '</li>';
    }

    chatbox.append(html);
}

function scrollBottom() {

    // selectors
    var newMessage = chatbox.children('li:last-child');

    // heights
    var clientHeight = chatbox.prop('clientHeight');
    var scrollTop = chatbox.prop('scrollTop');
    var scrollHeight = chatbox.prop('scrollHeight');
    var newMessageHeight = chatbox.innerHeight();
    var lastMessageHeight = chatbox.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        chatbox.scrollTop(scrollHeight);
    }
}

// listeners
divUsuarios.on('click', 'a', function(){
    var id = $(this).data('id');
    if(id){
        console.log(id);
    }
});

formenviar.on('submit', function(e){

    e.preventDefault();
    if(txtMensaje.val().trim().length == 0){
       return; 
    }

    // Enviar información
    socket.emit('crear-mensaje', {
        usuario: nombre,
        mensaje: txtMensaje.val()
    }, function(mensaje) {
       txtMensaje.val('').focus();
       renderizarMensajes(mensaje, true);
       scrollBottom();
    });

});

