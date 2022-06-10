const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

let dataString = fs.readFileSync('./productos.json', 'utf-8');
let data = JSON.parse(dataString);


// Const app con la que utilizaremos los metodos necesarios
const app = express();

// Indico que data sea una variable local la cual tiene uan vida persistente en el servidor, aunque el servidor se reinicie los objetos de "data", seguiran estando
app.locals.data = data;

// Puerto
app.set('port', process.env.PORT || 8080);

app.use(express.json());
// middlewares, habilitar json() y convertir datos a JSON.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// Motor de plantillas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Rutas
app.get('/', (req, res)=>{
    res.render('index');
})

app.get('/newProduct', (req, res) => {
    res.render('newProduct')
})

app.post('/newProduct', (req, res) => {
    if (!req.body.titulo || !req.body.precio || !req.body.imagen) {
        res.send(400).send('El producto debe contener un tiulo, precio e imagen')
    }

    let nuevoProducto = {
        nombre: req.body.titulo,
        precio: req.body.precio,
        imagen: req.body.imagen
    }

    data.push(nuevoProducto);

    fs.writeFileSync('./productos.json', JSON.stringify(data))

    res.redirect('/');
});


app.use((req, res, next)=>{
    res.status(404).render('404',{
        'titulo': '404',
        'descripcion': 'Ruta indefinida'
    });
})

app.listen(app.get('port'), () =>{
    console.log(`Servidor escuchando en el puerto: http://localhost:${app.get('port')}`);
})