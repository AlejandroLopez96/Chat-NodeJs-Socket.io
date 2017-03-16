var socket = io.connect('http://192.168.1.144:6677', {"forceNew": true});

socket.on('mensajes', (datos) => pintaMensajes(datos));

function pintaMensajes(mensajes){
    var html = mensajes.map((m) => {
        return (`
            <div class="mensaje">
                <b>${m.apodo}</b> ${m.texto}
            </div>
        `);
    }).join(' ');

    var divMensajes = document.getElementById('mensajes');
    divMensajes.innerHTML = html;
    divMensajes.scrollTop = divMensajes.scrollHeight;
    
}

function nuevoMensaje(e){
    var mensaje = {
        apodo: document.getElementById('apodo').value,
        texto: document.getElementById('texto').value
    };

    document.getElementById('apodo').style.display = 'none';
    socket.emit('nuevo-mensaje', mensaje);
    return false;
}