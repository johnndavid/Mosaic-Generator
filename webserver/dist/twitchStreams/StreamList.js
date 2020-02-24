"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Stream_1 = __importDefault(require("./Stream"));
var StreamList = /** @class */ (function () {
    function StreamList() {
        this.streamList = {};
    }
    StreamList.prototype.add = function (channelID, channelSocket) {
        if (Object.keys(this.streamList).includes(channelID)) {
            if (!(channelSocket === this.streamList[channelID].socket)) {
                this.streamList[channelID].setSocket(channelSocket);
            }
        }
        this.streamList[channelID] = new Stream_1.default(channelID, channelSocket);
    };
    StreamList.prototype.delete = function (channelID) {
        delete this.streamList[channelID];
    };
    return StreamList;
}());
exports.default = StreamList;
