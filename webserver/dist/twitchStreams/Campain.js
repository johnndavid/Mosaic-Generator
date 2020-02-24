"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Campain = /** @class */ (function () {
    function Campain(channelID) {
        this.channelID = channelID;
        this.mosaicState = 'Start';
        this.donators = [];
        this.donationTotal = 0;
        this.donationGoal = 0;
    }
    Campain.prototype.stateChange = function () {
    };
    return Campain;
}());
exports.default = Campain;
