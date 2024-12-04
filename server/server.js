const express =  require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');


const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "public")));


app.get('/', function(req, res){
    res.render('index')
});



io.on('connection', (socket) => {
    console.log("user connected", socket.id);
    socket.on('send-location', (data) => {
        console.log('Location shared:', socket.id);
        io.emit('recieve-location', {id : socket.id, ...data});
    })


    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id);
        io.emit('user-disconnected', socket.id);
    })
})

server.listen(8080, () => {
    console.log("server listening on port 8080")
});


