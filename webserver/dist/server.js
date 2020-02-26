"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var socket_io_1 = __importDefault(require("socket.io"));
// import fileUpload from 'express-fileupload';
var StreamList_1 = __importDefault(require("./twitchStreams/StreamList"));
var PORT = process.env.PORT || 3000;
var streams = new StreamList_1.default();
// Express Server
var app = express_1.default();
// app.use(express.static(path_lib.join(__dirname, 'public')));
var http = http_1.default.createServer(app);
var serverio = socket_io_1.default(http);
console.log("" + process.cwd());
app.use('/imgs', express_1.default.static(process.cwd() + "/imgs"));
http.listen(PORT, function () {
    console.log("Listening on " + PORT);
});
serverio.on('connection', function (socket) {
    // Audience controls
    socket.on('join room', function (_a) {
        var channelID = _a.channelID;
        // add audience to a room based on the channelID
        socket.join("" + channelID, function () {
            console.log("JOIN_ROOM " + channelID + ": User joined");
        });
        serverio.to('${socket.id}').emit('Campain_State', streams.streamList[channelID]);
    });
    //Streamer controls
    socket.on('streamer_join', function (_a) {
        var channelID = _a.channelID;
        streams.add(channelID);
        console.log("ChannelID " + channelID + " was added to the streamList");
        socket.join("" + channelID, function () {
            console.log("JOIN_ROOM " + channelID + ": Streamer joined");
        });
        serverio.in("" + channelID).emit('Campain_State', streams.streamList[channelID]);
    });
    socket.on('message_room', function (_a) {
        var channelID = _a.channelID, message = _a.message;
        serverio.to("" + channelID).emit('room_message', message);
        console.log(streams);
    });
    socket.on('Start_State', function (_a) {
        var channelID = _a.channelID, baseFile = _a.baseFile;
        // do something when in start  state
        // streams.streamList[channelID].setFile(file);
        streams.streamList[channelID].saveBaseFile(process.cwd() + "/imgs/" + channelID + "/baseFile", baseFile);
        // serverio.in(`${channelID}`).emit('Campain_State', streams.streamList[channelID])
        emitChangeState(serverio, channelID);
    });
    socket.on('Stop_State', function (_a) {
        var channelID = _a.channelID, file = _a.file;
        // Start creating a mosaic image
        streams.streamList[channelID].generateMosaic(channelID);
        // serverio.to(`${socket.id}`).emit('Reveal_Enabled');
        emitChangeState(serverio, channelID);
    });
    socket.on('Reveal_State', function (_a) {
        var channelID = _a.channelID;
        // send an link  to an image on the server
        if (streams.streamList[channelID].isGenerated) {
            emitChangeState(serverio, channelID);
        }
    });
    socket.on('Reset_State', function (_a) {
        var channelID = _a.channelID;
        // Create a new campainstate object
        streams.add(channelID);
        emitChangeState(serverio, channelID);
    });
});
function emitChangeState(server, channelID) {
    streams.streamList[channelID].stateChange();
    serverio.in("" + channelID).emit('Campain_State', streams.streamList[channelID]);
}
function dateString() {
    return new Date().toString();
}
;
