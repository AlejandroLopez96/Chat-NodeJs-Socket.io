var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('client'));

/*server.listen(6677, function(){
    console.log('El servidor esta funcionando en http://localhost:6677');
});
    Tambien podemos escribirlo como abajo y ahorramos codigo
*/

server.listen(6677, () => console.log('El servidor esta funcionando en http://localhost:6677'));

app.get('/hola-mundo', (req, res) => res.status(200).send('Hola'));

var mensajes = [{
    id: 1,
    texto: "Hola, este es un mensaje por defecto.",
    apodo: "Alex Cremento"
}];

io.on('connection', (s) => {
    console.log('El ordenador con IP: ' + s.handshake.address + ' se ha conectado');
    s.emit('mensajes', mensajes);

    s.on('nuevo-mensaje', (mensaje) => {
        mensajes.push(mensaje);

        io.sockets.emit('mensajes', mensajes);
    });
});