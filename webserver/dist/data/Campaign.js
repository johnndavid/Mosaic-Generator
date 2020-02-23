"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Campaign = /** @class */ (function () {
    function Campaign(channelId, createdAt, goal, amount) {
        this.channelId = channelId;
        this.createdAt = createdAt;
        this.goal = goal;
        this.amount = amount;
    }
    return Campaign;
}());
exports.Campaign = Campaign;
