"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var audience_1 = __importDefault(require("./audience"));
var Stream = /** @class */ (function () {
    function Stream(streamID, socketID) {
        this.streamID = streamID;
        this.socketID = socketID;
        this.audience = [];
    }
    Stream.prototype.add = function (audienceID, audienceSocket) {
        this.audience.push(new audience_1.default(audienceID, audienceSocket));
    };
    return Stream;
}());
exports.default = Stream;
