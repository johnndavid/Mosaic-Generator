"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var path_1 = __importDefault(require("path"));
var socket_io_1 = __importDefault(require("socket.io"));
var PORT = process.env.PORT || 5000;
var app = express_1.default();
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
var http = http_1.default.createServer(app);
var serverio = socket_io_1.default(http);
app.get('/', function (req, response) {
    console.log(req);
});
http.listen(PORT, function () {
    console.log("Listening on " + PORT);
});
serverio.on('connection', function (socket) {
    console.log(socket);
});
