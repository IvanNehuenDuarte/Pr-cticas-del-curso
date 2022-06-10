const express = require('express');
const {Server: HTTPServer} = require('http');
const {Server: SocketServer} = require('socket.io');
const bodyParser = require('body-parser');
const path = require('path');
const { getMessage, saveMessage } = require('./mensajes');

let products= [];

const app = express();
const server = new HTTPServer(app);
const io = new SocketServer(server);

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname, '/public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res)=>{
    res.render('index');
})

//---- Socket.io que utiliza los metodos para mostrar y guardar mensajes
io.on('connection', socket => {
    console.log('Nuevo cliente conectado');

    socket.emit('server:loadproduct', products);

    socket.on('client:newproduct', newProduct => {
        const product = {...newProduct};
        products.push(product)
        socket.emit('server:newproduct', product)
    });

    const message = getMessage();
    socket.emit('message', message);

    socket.on('new-message', mensajes =>{
        saveMessage(mensajes);

        const allMessage = getMessage();
        io.sockets.emit('message', allMessage);
        
    })
    
});

// conectando server
app.set('port', process.env.PORT || 3000);

const conectedServer = server.listen(app.get('port'), ()=>{
    console.log(`Servidor escuchando en el puerto: http://localhost:${conectedServer.address().port}`);
})

conectedServer.on('error', error => console.log(`Error en el servidor: ${error}`));