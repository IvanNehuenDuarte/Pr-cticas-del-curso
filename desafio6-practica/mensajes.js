// *ACÁ ALMACENAMOS LOS MENSAJES

const message = [
    { autor: "Iván", texto: "Que onda los pibe" },
    { autor: "Huisi", texto: "Acá andamo" },
    { autor: "Fernando", texto: "laburando"},
];

const getMessage = () => message;

const saveMessage = mensaje => {
    message.push(mensaje)
}

module.exports = {
    getMessage,
    saveMessage
};