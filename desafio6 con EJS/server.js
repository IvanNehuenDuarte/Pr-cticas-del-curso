const express = require('express');
const {Server: HTTPServer} = require('http');
const {Server: SocketServer} = require('socket.io');
const bodyParser = require('body-parser');
const path = require('path');
const { getMessage, saveMessage } = require('./message');
const fs = require('fs');

//---- Guardamos los productos en la variable "data"
let dataString = fs.readFileSync('productos.json', 'utf-8');
let data = JSON.parse(dataString);

//---- variables de servidor para usar los verbos http y socket.io
const app = express();
const server = new HTTPServer(app);
const io = new SocketServer(server);

//---- permitimos que express reconozca json, al igual que los verbos post.
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//---- Servimos el directorio raiz de archivos estaticos, esto devuelve un objeto
app.use(express.static(path.join(__dirname, '/public')));

//---- definimos a data como variable local y lo transforma en objeto
app.locals.data = data;

//---- configuramos la ruta de views que da estilo a la pagina
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//---- Página principal
app.get('/', (req, res)=>{
    res.render('index');
})

//---- Página para agregar nuevos productos
app.get('/newProduct', (req, res) => {
    res.render('newProduct')
})

//---- Verbo POST para agregar y pushear los nuevos productos
app.post('/newProduct', (req, res) => {
    if (!req.body.titulo || !req.body.precio || !req.body.imagen) {
        res.send(400).send('El producto debe contener un nombre, precio e imagen')
    }

    let nuevoProducto = {
        nombre: req.body.titulo,
        precio: req.body.precio,
        imagen: req.body.imagen
    }

    data.push(nuevoProducto);

    fs.writeFileSync('productos.json', JSON.stringify(data));
    
    res.redirect('/');
})


//---- Socket.io que utiliza los metodos para mostrar y guardar mensajes
io.on('connection', socket => {
    console.log('Nuevo cliente conectado');

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

