"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var path_1 = __importDefault(require("path"));
var socket_io_1 = __importDefault(require("socket.io"));
var StreamList_1 = __importDefault(require("./twitchStreams/StreamList"));
var PORT = process.env.PORT || 3000;
var streams = new StreamList_1.default();
// Express Server
var app = express_1.default();
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
var http = http_1.default.createServer(app);
var serverio = socket_io_1.default(http);
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
            serverio.to('${socket.id}').emit('Campain_State', streams.streamList[channelID].state());
            // get the state of the current campain
        });
    });
    socket.on('request_state', function (_a) {
        var channelID = _a.channelID;
        console.log("request_state recieved");
        if (streams.streamList[channelID]) {
            console.log("request_state sent");
            serverio.to("" + socket.id).emit('Campain_State', streams.streamList[channelID].state());
        }
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
    socket.on('change_state', function (_a) {
        var channelID = _a.channelID;
        streams.streamList[channelID].stateChange();
        serverio.in("" + channelID).emit('Campain_State', streams.streamList[channelID]);
    });
    socket.on('message_room', function (_a) {
        var channelID = _a.channelID, message = _a.message;
        serverio.to("" + channelID).emit('room_message', message);
        console.log(streams);
    });
});
function dateString() {
    return new Date().toString();
}
;
