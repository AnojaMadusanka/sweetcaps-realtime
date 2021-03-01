const express = require('express');
const http = require('http');

const app = express();

app.get('/', (req, res) => res.send("Socket Programming"));

const server = http.Server(app);
server.listen(3000);


//create a instance of socket io and pass to the server
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});

io.on('connection', (socket) => {
    socket.on("messageSent", (message) => {
        socket.broadcast.emit("messageSent", message);
    });
    console.log("Notification Socket Id"+ socket.id)
});

io.on('connection', (socket) => {
    socket.emit('hello', {
        greeting: 'Welcome to sweet capitals'
    });
    console.log("Socket Id"+ socket.id)
});

io.on('connection', (socket) => {
    socket.emit('customer', {
        greeting: 'Welcome to sweet capitals customer side'
    });
    console.log("Customer Socket Id"+ socket.id)
});
