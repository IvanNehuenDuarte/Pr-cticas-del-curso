//*------------- Lado del cliente ----------------

const socket = io.connect();

socket.on('message', data => {

    renderMessage(data);
})

// Hacemos el metodo para agregar mensajes
const addMessage = () => {
    const mensaje = {
        autor: document.getElementById('userName').value,
        texto: document.getElementById('texto').value
    }
    socket.emit('new-message', mensaje);

    // Limpiar los campos de texto
    document.getElementById('userName').value = ''
    document.getElementById('texto').value = ''
    return false
}

// ----- Mapeamos los mensajes y los mostramos en el documento
const renderMessage = (message) =>{
    const ejs = message.map((element, index) => {
        return (`
        <div class="panel" style="margin-top: 2rem">
            <strong>${index} - ${element.autor}:</strong>
            <em>${element.texto}</em>
            <hr>
        </div>
        `)
    }).join(' ')

    console.log(ejs);

    document.getElementById('message').innerHTML = ejs;
}
