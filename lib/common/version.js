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
exports.canIUseGetUserProfile = exports.canIUseCanvas2d = exports.canIUseNextTick = exports.canIUseGroupSetData = exports.canIUseAnimate = exports.canIUseFormFieldButton = exports.canIUseModel = exports.getSystemInfoSync = void 0;
var deviceInfo = null;
var windowInfo = null;
var appBaseInfo = null;
// 获取设备信息（同步）
function getDeviceInfoSync() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!deviceInfo) return [3 /*break*/, 2];
                    return [4 /*yield*/, wx.getDeviceInfo()];
                case 1:
                    deviceInfo = _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/, deviceInfo];
            }
        });
    });
}
// 获取窗口信息（同步）
function getWindowInfoSync() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!windowInfo) return [3 /*break*/, 2];
                    return [4 /*yield*/, wx.getWindowInfo()];
                case 1:
                    windowInfo = _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/, windowInfo];
            }
        });
    });
}
// 获取应用基础信息（同步）
function getAppBaseInfoSync() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!appBaseInfo) return [3 /*break*/, 2];
                    return [4 /*yield*/, wx.getAppBaseInfo()];
                case 1:
                    appBaseInfo = _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/, appBaseInfo];
            }
        });
    });
}
// 组合系统信息
function getSystemInfoSync() {
    return __awaiter(this, void 0, void 0, function () {
        var device, window, appBase, environment;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getDeviceInfoSync()];
                case 1:
                    device = _a.sent();
                    return [4 /*yield*/, getWindowInfoSync()];
                case 2:
                    window = _a.sent();
                    return [4 /*yield*/, getAppBaseInfoSync()];
                case 3:
                    appBase = _a.sent();
                    environment = undefined;
                    try {
                        // 企业微信特有的API
                        if (typeof wx.qy !== 'undefined') {
                            environment = 'wxwork';
                        }
                    }
                    catch (e) {
                        // 忽略错误
                    }
                    return [2 /*return*/, {
                            pixelRatio: window.pixelRatio,
                            platform: device.platform,
                            environment: environment,
                            SDKVersion: appBase.SDKVersion,
                            windowHeight: window.windowHeight,
                            statusBarHeight: window.statusBarHeight
                        }];
            }
        });
    });
}
exports.getSystemInfoSync = getSystemInfoSync;
// 比较版本号函数保持不变
function compareVersion(v1, v2) {
    var v1Parts = v1.split('.').map(Number);
    var v2Parts = v2.split('.').map(Number);
    var len = Math.max(v1Parts.length, v2Parts.length);
    for (var i = 0; i < len; i++) {
        var num1 = v1Parts[i] || 0;
        var num2 = v2Parts[i] || 0;
        if (num1 > num2)
            return 1;
        if (num1 < num2)
            return -1;
    }
    return 0;
}
function gte(version) {
    return __awaiter(this, void 0, void 0, function () {
        var system;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getSystemInfoSync()];
                case 1:
                    system = _a.sent();
                    return [2 /*return*/, compareVersion(system.SDKVersion, version) >= 0];
            }
        });
    });
}
function canIUseModel() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, gte('2.9.3')];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.canIUseModel = canIUseModel;
function canIUseFormFieldButton() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, gte('2.10.3')];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.canIUseFormFieldButton = canIUseFormFieldButton;
function canIUseAnimate() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, gte('2.9.0')];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.canIUseAnimate = canIUseAnimate;
function canIUseGroupSetData() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, gte('2.4.0')];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.canIUseGroupSetData = canIUseGroupSetData;
function canIUseNextTick() {
    return __awaiter(this, void 0, void 0, function () {
        var e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 1, , 3]);
                    return [2 /*return*/, wx.canIUse('nextTick')];
                case 1:
                    e_1 = _a.sent();
                    return [4 /*yield*/, gte('2.7.1')];
                case 2: return [2 /*return*/, _a.sent()];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.canIUseNextTick = canIUseNextTick;
function canIUseCanvas2d() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, gte('2.9.0')];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.canIUseCanvas2d = canIUseCanvas2d;
function canIUseGetUserProfile() {
    return !!wx.getUserProfile;
}
exports.canIUseGetUserProfile = canIUseGetUserProfile;
