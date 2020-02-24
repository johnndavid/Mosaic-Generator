import express from "express";
import http_lib from 'http';
import path_lib from 'path';
import io from 'socket.io';
import StreamList from './twitchStreams/StreamList';

const PORT = process.env.PORT || 3000;
const streams: StreamList = new StreamList();

// Express Server
const app = express();
app.use(express.static(path_lib.join(__dirname, 'public')));
const http = http_lib.createServer(app);
const serverio = io(http);

// app.get('/', (req, response) => {
//   // Don't know what this is yet
//   console.log(req);
// })

http.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

serverio.on('connection', (socket) => {
  // console.log('New Connection aquired');
  console.log(dateString());
  console.log(`----> SocketID: ${socket.id}`);

  socket.on('join room', ({ channel }) => {
    socket.join(`${channel}`, () => {
      console.log(`Audience ${socket.id} joined ${channel} channel`);
    });
  })

  socket.on('streamer', ({ channel }) => {
    streams.add(channel, socket);
    socket.join(`${channel}`, () => {
      console.log(`Streamer has joined the ${channel} channel`);
    })
    console.log(`ChannelID ${channel} was added to the streamList`);
  })

  socket.on('disconnect', (socket) => {
    console.log('disconnected');
  })

  socket.on('message_room', ({ channel, message }) => {
    serverio.to(`${channel}`).emit('room_message', message);
  })


});

function dateString() {
  return new Date().toString();
};
