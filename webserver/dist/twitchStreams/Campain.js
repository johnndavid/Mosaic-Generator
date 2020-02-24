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
        if (this.mosaicState === 'Start') {
            this.mosaicState = 'Stop';
        }
        else if (this.mosaicState === 'Stop') {
            this.mosaicState = 'Reveal';
        }
        else if (this.mosaicState === 'Reveal') {
            this.mosaicState = 'Reset';
        }
        else if (this.mosaicState === 'Reset') {
            this.mosaicState = 'Start';
        }
        return this.state();
    };
    Campain.prototype.state = function () {
        return { state: this.mosaicState, donationTotal: this.donationTotal, donationGoal: this.donationGoal, };
    };
    return Campain;
}());
exports.default = Campain;
