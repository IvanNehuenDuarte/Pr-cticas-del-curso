//  --- Traemos la librería de "express" ---
const express = require("express");

const app = express();

//  ---- Indicamos el puerto ----
app.set("port", process.env.PORT || 8080);

//indicamos que acepte formato json para los middleware
app.use(express.json());

app.use('/api/productos', require("./routes/user.route"))

//  --- Llamada a que se inicie el servidor ---
app.listen(app.get("port"), () => {
    console.log(`servidor corriendo en http://localhost:${app.get("port")}`);
})

