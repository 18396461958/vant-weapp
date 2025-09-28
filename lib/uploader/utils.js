"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.chooseFile = exports.isVideoFile = exports.isImageFile = void 0;
var utils_1 = require("../common/utils");
var validator_1 = require("../common/validator");
function isImageFile(item) {
    if (item.isImage != null) {
        return item.isImage;
    }
    if (item.type) {
        return item.type === 'image';
    }
    if (item.url) {
        return (0, validator_1.isImageUrl)(item.url);
    }
    return false;
}
exports.isImageFile = isImageFile;
function isVideoFile(item) {
    if (item.isVideo != null) {
        return item.isVideo;
    }
    if (item.type) {
        return item.type === 'video';
    }
    if (item.url) {
        return (0, validator_1.isVideoUrl)(item.url);
    }
    return false;
}
exports.isVideoFile = isVideoFile;
function formatImage(res) {
    return res.tempFiles.map(function (item) { return (__assign(__assign({}, (0, utils_1.pickExclude)(item, ['path'])), { type: 'image', url: item.tempFilePath || item.path, thumb: item.tempFilePath || item.path })); });
}
function formatVideo(res) {
    return [
        __assign(__assign({}, (0, utils_1.pickExclude)(res, ['tempFilePath', 'thumbTempFilePath', 'errMsg'])), { type: 'video', url: res.tempFilePath, thumb: res.thumbTempFilePath }),
    ];
}
function formatMedia(res) {
    return res.tempFiles.map(function (item) { return (__assign(__assign({}, (0, utils_1.pickExclude)(item, ['fileType', 'thumbTempFilePath', 'tempFilePath'])), { type: item.fileType, url: item.tempFilePath, thumb: item.fileType === 'video' ? item.thumbTempFilePath : item.tempFilePath })); });
}
function formatFile(res) {
    return res.tempFiles.map(function (item) { return (__assign(__assign({}, (0, utils_1.pickExclude)(item, ['path'])), { url: item.path })); });
}
function chooseFile(_a) {
    var _this = this;
    var accept = _a.accept, multiple = _a.multiple, capture = _a.capture, compressed = _a.compressed, maxDuration = _a.maxDuration, sizeType = _a.sizeType, camera = _a.camera, maxCount = _a.maxCount, mediaType = _a.mediaType, extension = _a.extension;
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = accept;
                    switch (_a) {
                        case 'image': return [3 /*break*/, 1];
                        case 'media': return [3 /*break*/, 5];
                        case 'video': return [3 /*break*/, 6];
                    }
                    return [3 /*break*/, 7];
                case 1: return [4 /*yield*/, (0, utils_1.isPC)()];
                case 2:
                    _b = (_c.sent());
                    if (_b) return [3 /*break*/, 4];
                    return [4 /*yield*/, (0, utils_1.isWxWork)()];
                case 3:
                    _b = (_c.sent());
                    _c.label = 4;
                case 4:
                    if (_b) {
                        wx.chooseImage({
                            count: multiple ? Math.min(maxCount, 9) : 1,
                            sourceType: capture,
                            sizeType: sizeType,
                            success: function (res) { return resolve(formatImage(res)); },
                            fail: reject,
                        });
                    }
                    else {
                        wx.chooseMedia({
                            count: multiple ? Math.min(maxCount, 9) : 1,
                            mediaType: ['image'],
                            sourceType: capture,
                            maxDuration: maxDuration,
                            sizeType: sizeType,
                            camera: camera,
                            success: function (res) { return resolve(formatImage(res)); },
                            fail: reject,
                        });
                    }
                    return [3 /*break*/, 8];
                case 5:
                    wx.chooseMedia({
                        count: multiple ? Math.min(maxCount, 9) : 1,
                        mediaType: mediaType,
                        sourceType: capture,
                        maxDuration: maxDuration,
                        sizeType: sizeType,
                        camera: camera,
                        success: function (res) { return resolve(formatMedia(res)); },
                        fail: reject,
                    });
                    return [3 /*break*/, 8];
                case 6:
                    wx.chooseVideo({
                        sourceType: capture,
                        compressed: compressed,
                        maxDuration: maxDuration,
                        camera: camera,
                        success: function (res) { return resolve(formatVideo(res)); },
                        fail: reject,
                    });
                    return [3 /*break*/, 8];
                case 7:
                    wx.chooseMessageFile(__assign(__assign({ count: multiple ? maxCount : 1, type: accept }, (extension ? { extension: extension } : {})), { success: function (res) { return resolve(formatFile(res)); }, fail: reject }));
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    }); });
}
exports.chooseFile = chooseFile;
