const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();

let dataString = fs.readFileSync('./product.json', 'utf-8');
let data = JSON.stringify(dataString);

app.locals.data = data;

app.set('port', process.env.PORT || 8080);

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.set('views', path.join(__dirname, 'views'));
app.locals.basedir = path.join(__dirname, 'views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index')
});

app.get('/newProduct', (req, res) => {
    res.render('newProduct')
});

app.post('/newProduct', (req, res) => {
    if (!req.body.nombre || !req.body.precio || !req.body.imagen){
        res.send(400).send('El producto debe contener un nombre, precio e imagen');
    }
    
    let nuevoProducto = {
        nombre: req.body.nombre,
        precio: req.body.precio,
        imagen: req.body.imagen
    }

    data.push(nuevoProducto);

    fs.writeFileSync('./product.json', JSON.stringify(data));

    res.redirect('/');
});

app.listen(app.get('port'), () => {
    console.log(`Servidor corriendo en el puerto: http://localhost:${app.get('port')}`);
});