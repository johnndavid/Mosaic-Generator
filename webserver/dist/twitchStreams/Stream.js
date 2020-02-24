"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Stream = /** @class */ (function () {
    function Stream(channelID, socket) {
        this.channelID = channelID;
        this.socket = socket;
        this.mosaicState = 'Start';
    }
    Stream.prototype.setSocket = function (socket) {
        this.socket = socket;
    };
    return Stream;
}());
exports.default = Stream;
