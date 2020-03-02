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
// app.use(express.static(path_lib.join(__dirname, 'public')));
const http = http_lib.createServer(app);
const serverio = io(http);

console.log(`${process.cwd()}`)
app.use('/imgs', express.static(`${process.cwd()}/imgs`));

http.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

serverio.on('connection', (socket) => {

  // Audience controls
  socket.on('join room', ({ channelID }) => {
    // add audience to a room based on the channelID
    socket.join(`${channelID}`, () => {
      console.log(`JOIN_ROOM ${channelID}: User joined`);
    });
    serverio.to(`${socket.id}`).emit('Campain_State', streams.streamList[channelID])
  })

  socket.on('getDonations', ({ channelID }) => {
    serverio.to(`${socket.id}`).emit('donationTotal', streams.streamList[channelID].getDonationTotal)
  })

  socket.on('hasIMG', ({ channelID }) => {
    try {
      serverio.to(`${socket.id}`).emit('IMGState', streams.streamList[channelID].hasIMG(channelID))
    }
    catch {
      console.log('Error');
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

  socket.on('message_room', ({ channelID, message }) => {
    serverio.to(`${channelID}`).emit('room_message', message);
    console.log(streams);
  })

  socket.on('Start_State', ({ channelID, baseFile }) => {
    streams.streamList[channelID].saveBaseFile(`${process.cwd()}/imgs/${channelID}/baseFile`, baseFile)
    emitChangeState(serverio, channelID);

  })

  socket.on('Stop_State', ({ channelID, file }) => {
    streams.streamList[channelID].generateMosaic(channelID);
    serverio.to(`${socket.id}`).emit('Reveal_Enabled');
    emitChangeState(serverio, channelID);
  })

  socket.on('Reveal_State', ({ channelID }) => {
    if (streams.streamList[channelID].isGenerated) {
      emitChangeState(serverio, channelID);
    }
  })

  socket.on('Reset_State', ({ channelID }) => {
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
