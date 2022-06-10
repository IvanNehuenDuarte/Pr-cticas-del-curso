const express = require('express');
const hbs = require('express-handlebars');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');


let dataString = fs.readFileSync('./productos.json', 'utf-8');
let data = JSON.parse(dataString);

// Inicialización
const app = express();

app.locals.data = data;


app.use(express.json());
// app.use(express.urlencoded({extended:false}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// Configuraciones
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, './views'));
app.set('view engine', '.hbs');
app.engine('.hbs', hbs.engine({
    extname: '.hbs',
    defaultsLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layout'),
    partialsDir: path.join(app.get('views'), 'partials')
}));



app.get('/', (req, res) => {
    res.render('index');
})

app.listen(app.get('port'), () => {
    console.log(`Servidor escuchando en el puerto: http://localhost:${app.get('port')}`);
})
