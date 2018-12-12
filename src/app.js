var app = require("../config/server")

var  server = app.listen(80, ()=>{
    console.log("Servidor Online!")
})

var io = require('socket.io').listen(server)

app.set('io', io)

io.on('connection', (socket)=>{
    console.log("Usuário Conectou!")

    socket.on('disconnect', ()=>{
        console.log("Usuário Desconectou!")
    })

    socket.on('msgParaServidor', (data)=> {
        socket.emit(
            'msgParaCliente', 
            { apelido: data.apelido, mensagem: data.mensagem})

        socket.broadcast.emit(
            'msgParaCliente', 
            { apelido: data.apelido, mensagem: data.mensagem})
    

    if(parseInt(data.apelido_atualizado_clientes) == 0 ){
            socket.emit(
                'ParticipantesParaCliente', 
                { apelido: data.apelido})
    
            socket.broadcast.emit(
                'ParticipantesParaCliente', 
                { apelido: data.apelido})
    }
    })
    
    


})


