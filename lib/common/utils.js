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
exports.isWxWork = exports.isPC = exports.getCurrentPage = exports.clamp = exports.addNumber = exports.toPromise = exports.groupSetData = exports.getAllRect = exports.getRect = exports.pickExclude = exports.requestAnimationFrame = exports.addUnit = exports.nextTick = exports.range = exports.getSystemInfoSync = exports.isDef = void 0;
var validator_1 = require("./validator");
var version_1 = require("./version");
var validator_2 = require("./validator");
Object.defineProperty(exports, "isDef", { enumerable: true, get: function () { return validator_2.isDef; } });
var version_2 = require("./version");
Object.defineProperty(exports, "getSystemInfoSync", { enumerable: true, get: function () { return version_2.getSystemInfoSync; } });
function range(num, min, max) {
    return Math.min(Math.max(num, min), max);
}
exports.range = range;
function nextTick(cb) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, version_1.canIUseNextTick)()];
                case 1:
                    if (_a.sent()) {
                        wx.nextTick(cb);
                    }
                    else {
                        setTimeout(function () {
                            cb();
                        }, 1000 / 30);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.nextTick = nextTick;
function addUnit(value) {
    if (!(0, validator_1.isDef)(value)) {
        return undefined;
    }
    value = String(value);
    return (0, validator_1.isNumber)(value) ? "".concat(value, "px") : value;
}
exports.addUnit = addUnit;
function requestAnimationFrame(cb) {
    return setTimeout(function () {
        cb();
    }, 1000 / 30);
}
exports.requestAnimationFrame = requestAnimationFrame;
function pickExclude(obj, keys) {
    if (!(0, validator_1.isPlainObject)(obj)) {
        return {};
    }
    return Object.keys(obj).reduce(function (prev, key) {
        if (!keys.includes(key)) {
            prev[key] = obj[key];
        }
        return prev;
    }, {});
}
exports.pickExclude = pickExclude;
function getRect(context, selector) {
    return new Promise(function (resolve) {
        wx.createSelectorQuery()
            .in(context)
            .select(selector)
            .boundingClientRect()
            .exec(function (rect) {
            if (rect === void 0) { rect = []; }
            return resolve(rect[0]);
        });
    });
}
exports.getRect = getRect;
function getAllRect(context, selector) {
    return new Promise(function (resolve) {
        wx.createSelectorQuery()
            .in(context)
            .selectAll(selector)
            .boundingClientRect()
            .exec(function (rect) {
            if (rect === void 0) { rect = []; }
            return resolve(rect[0]);
        });
    });
}
exports.getAllRect = getAllRect;
function groupSetData(context, cb) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, version_1.canIUseGroupSetData)()];
                case 1:
                    if (_a.sent()) {
                        context.groupSetData(cb);
                    }
                    else {
                        cb();
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.groupSetData = groupSetData;
function toPromise(promiseLike) {
    if ((0, validator_1.isPromise)(promiseLike)) {
        return promiseLike;
    }
    return Promise.resolve(promiseLike);
}
exports.toPromise = toPromise;
// 浮点数精度处理
function addNumber(num1, num2) {
    var cardinal = Math.pow(10, 10);
    return Math.round((num1 + num2) * cardinal) / cardinal;
}
exports.addNumber = addNumber;
// 限制value在[min, max]之间
var clamp = function (num, min, max) { return Math.min(Math.max(num, min), max); };
exports.clamp = clamp;
function getCurrentPage() {
    var pages = getCurrentPages();
    return pages[pages.length - 1];
}
exports.getCurrentPage = getCurrentPage;
var isPC = function () { return __awaiter(void 0, void 0, void 0, function () {
    var device;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, version_1.getSystemInfoSync)()];
            case 1:
                device = _a.sent();
                return [2 /*return*/, ['mac', 'windows'].includes(device.platform)];
        }
    });
}); };
exports.isPC = isPC;
var isWxWork = function () { return __awaiter(void 0, void 0, void 0, function () {
    var environment;
    return __generator(this, function (_a) {
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
        return [2 /*return*/, environment === 'wxwork'];
    });
}); };
exports.isWxWork = isWxWork;
