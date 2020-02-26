import express from "express";
import http_lib from 'http';
import path_lib from 'path';
import io from 'socket.io';
// import fileUpload from 'express-fileupload';
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
      serverio.to('${socket.id}').emit('Campain_State', streams.streamList[channelID])
    });
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

  socket.on('message_room', ({ channelID, message }) => {
    serverio.to(`${channelID}`).emit('room_message', message);
    console.log(streams);
  })

  socket.on('Start_State', ({ channelID, baseFile }) => {
    // do something when in start  state
    // streams.streamList[channelID].setFile(file);
    streams.streamList[channelID].saveBaseFile(`${process.cwd()}/imgs/${channelID}/baseFile`, baseFile)
    // serverio.in(`${channelID}`).emit('Campain_State', streams.streamList[channelID])
    emitChangeState(serverio, channelID);

  })

  socket.on('Stop_State', ({ channelID, file }) => {
    // Start creating a mosaic image
    streams.streamList[channelID].generateMosaic(channelID);
    // serverio.to(`${socket.id}`).emit('Reveal_Enabled');
    emitChangeState(serverio, channelID);
  })

  socket.on('Reveal_State', ({ channelID }) => {
    // send an link  to an image on the server
    if (streams.streamList[channelID].isGenerated) {
      emitChangeState(serverio, channelID);
    }
  })

  socket.on('Reset_State', ({ channelID }) => {
    // Create a new campainstate object
    streams.add(channelID);
    emitChangeState(serverio, channelID);
  })
});

function emitChangeState(server: any, channelID: string) {
  streams.streamList[channelID].stateChange();
  serverio.in(`${channelID}`).emit('Campain_State', streams.streamList[channelID])
}

function dateString() {
  return new Date().toString();
};
