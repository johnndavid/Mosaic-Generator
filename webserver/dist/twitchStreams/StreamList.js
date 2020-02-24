"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Campain_1 = __importDefault(require("./Campain"));
var StreamList = /** @class */ (function () {
    function StreamList() {
        this.streamList = {};
    }
    StreamList.prototype.inStreamList = function (channelID) {
        return (!Object.keys(this.streamList).includes(channelID));
    };
    StreamList.prototype.add = function (channelID) {
        if (this.inStreamList(channelID)) {
            this.streamList[channelID] = new Campain_1.default(channelID);
        }
    };
    StreamList.prototype.state = function (channelID) {
        if (this.inStreamList(channelID)) {
            return this.streamList[channelID].state();
        }
    };
    StreamList.prototype.changeState = function (channelID) {
        if (this.inStreamList(channelID)) {
            return this.streamList[channelID].changeState();
        }
    };
    StreamList.prototype.delete = function (channelID) {
        delete this.streamList[channelID];
    };
    return StreamList;
}());
exports.default = StreamList;
