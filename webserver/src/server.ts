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

  socket.on('join room', ({ channel }) => {
    socket.join(`${channel}`, () => {
      console.log(`JOIN_ROOM: User joined >>> ${channel}`);
    });
  })

  socket.on('streamer', ({ channel }) => {
    streams.add(channel, socket);
    console.log(`ChannelID ${channel} was added to the streamList`);
    socket.join(`${channel}`, () => {
      console.log(`JOIN_ROOM: Sreamer joined >>> ${channel}`);
    })
  })

  socket.on('disconnect', (socket) => {
    console.log('disconnected');
  })

  socket.on('message_room', ({ channel, message }) => {
    serverio.to(`${channel}`).emit('room_message', message);
    console.log(streams);
  })
});

function dateString() {
  return new Date().toString();
};
