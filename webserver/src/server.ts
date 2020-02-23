import express from "express";
import http_lib from 'http';
import path_lib from 'path';
import io from 'socket.io';

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.static(path_lib.join(__dirname, 'public')));
const http = http_lib.createServer(app);
const serverio = io(http);

app.get('/', (req, response) => {
  console.log(req);
})

http.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
})

serverio.on('connection', (socket) => {
  console.log('New Connection aquired');
  console.log(`SocketID: ${socket.id}`);
  console.log('testing live reload3');
  serverio.emit('welcome', `Welcome SocketID: ${socket.id}`)
})
