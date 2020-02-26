"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var MNG_1 = __importDefault(require("../mosGen-V2/MNG"));
var jimp_image_1 = __importDefault(require("../mosGen-V2/jimp-image"));
var report_json_1 = require("../mosGen-V2/report.json");
var Campain = /** @class */ (function () {
    function Campain() {
        this.mosaicState = 'Start';
        this.donators = [];
        this.donationTotal = 0;
        this.donationGoal = 500;
        this.isGenerated = false;
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
        return this;
    };
    Campain.prototype.setDonators = function (donators) { this.donators = donators; };
    ;
    Campain.prototype.setDonationTotal = function (total) { this.donationTotal = total; };
    ;
    Campain.prototype.setDonationGoal = function (goal) { this.donationGoal = goal; };
    ;
    Campain.prototype.getDonationsURLS = function () {
        return this.donators.map(function (_a) {
            var urls = _a.urls;
            return urls;
        });
    };
    Campain.prototype.saveBaseFile = function (saveLocation, baseFile) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = jimp_image_1.default.bind;
                        return [4 /*yield*/, jimp_image_1.default.read(baseFile)];
                    case 1:
                        new (_a.apply(jimp_image_1.default, [void 0, _b.sent()]))().save(saveLocation);
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    Campain.prototype.generateMosaic = function (channelID) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.setDonators(URLS);
                        _a = MNG_1.default.bind;
                        _b = jimp_image_1.default.bind;
                        return [4 /*yield*/, jimp_image_1.default.read(process.cwd() + "/imgs/" + channelID + "/baseFile.jpg")];
                    case 1: return [4 /*yield*/, new (_a.apply(MNG_1.default, [void 0, new (_b.apply(jimp_image_1.default, [void 0, _c.sent()]))(), this.getDonationsURLS()]))().generate(process.cwd() + "/imgs/" + channelID + "/MosaicImage.jpg")];
                    case 2:
                        _c.sent();
                        this.isGenerated = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    return Campain;
}());
exports.default = Campain;
var URLS = report_json_1.DATA.donations.slice(0, 10).map(function (_a) {
    var profile_image_url = _a.profile_image_url;
    return { "urls": profile_image_url };
});
