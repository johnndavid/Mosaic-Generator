"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var audience_1 = __importDefault(require("./audience"));
var Stream = /** @class */ (function () {
    function Stream(streamID, socket) {
        this.streamID = streamID;
        this.socket = socketID;
        this.audience = [];
        this.mosaicState = 'Start';
    }
    Stream.prototype.add = function (audienceID, audienceSocket) {
        this.audience.push(new audience_1.default(audienceID, audienceSocket));
    };
    return Stream;
}());
exports.default = Stream;
