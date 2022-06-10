const db = require('../dbSQLite');

const getMensajes = () => {
    db("mensajes")
    .select("id", "autor", "mensaje")
};

const saveMensajes = (obj) => db("mensajes").insert(obj)

module.exports = { getMensajes, saveMensajes }