import express from "express";
import http_lib from 'http';
import path_lib from 'path';
import io from 'socket.io';
import fileUpload from 'express-fileupload';
import StreamList from './twitchStreams/StreamList';

const PORT = process.env.PORT || 3000;
const streams: StreamList = new StreamList();

// Express Server
const app = express();
app.use(express.static(path_lib.join(__dirname, 'public')));
const http = http_lib.createServer(app);
const serverio = io(http);

// app.use(fileUpload());

// app.post('/upload', (req, res) => {
//   if (!req.files || Object.keys(req.files).length === 0) {
//     return res.status(400).send('No files were uploaded.');
//   }
//
//   let sampleFile = req.files.sampleFile;
//
//   sampleFile.mv('/imgs/filename.jpg', (err) => {
//     if (err) {
//       return res.status(500).send(err);
//     }
//     res.send('File Upload');
//   })
// })

http.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});



serverio.on('connection', (socket) => {

  // Audience controls
  socket.on('join room', ({ channelID }) => {
    // add audience to a room based on the channelID
    socket.join(`${channelID}`, () => {
      console.log(`JOIN_ROOM ${channelID}: User joined`);
      serverio.to('${socket.id}').emit('Campain_State', streams.streamList[channelID].state())
      // get the state of the current campain
    });
  })

  socket.on('request_state', ({ channelID }) => {
    console.log("request_state recieved")
    if (streams.streamList[channelID]) {
      console.log("request_state sent")
      serverio.to(`${socket.id}`).emit('Campain_State', streams.streamList[channelID].state())
    }
  })

  //Streamer controls
  socket.on('streamer_join', ({ channelID }) => {
    streams.add(channelID);
    console.log(`ChannelID ${channelID} was added to the streamList`);
    socket.join(`${channelID}`, () => {
      console.log(`JOIN_ROOM ${channelID}: Streamer joined`);
    })
    serverio.in(`${channelID}`).emit('Campain_State', streams.streamList[channelID]);
  })

  socket.on('change_state', ({ channelID }) => {
    streams.streamList[channelID].stateChange();
    serverio.in(`${channelID}`).emit('Campain_State', streams.streamList[channelID]);
  })

  socket.on('message_room', ({ channelID, message }) => {
    serverio.to(`${channelID}`).emit('room_message', message);
    console.log(streams);
  })
});

function dateString() {
  return new Date().toString();
};
