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
var color_1 = require("../common/color");
var component_1 = require("../common/component");
var utils_1 = require("../common/utils");
var validator_1 = require("../common/validator");
var version_1 = require("../common/version");
var canvas_1 = require("./canvas");
function format(rate) {
    return Math.min(Math.max(rate, 0), 100);
}
var PERIMETER = 2 * Math.PI;
var BEGIN_ANGLE = -Math.PI / 2;
var STEP = 1;
(0, component_1.VantComponent)({
    props: {
        text: String,
        lineCap: {
            type: String,
            value: 'round',
        },
        value: {
            type: Number,
            value: 0,
            observer: 'reRender',
        },
        speed: {
            type: Number,
            value: 50,
        },
        size: {
            type: Number,
            value: 100,
            observer: function () {
                this.drawCircle(this.currentValue);
            },
        },
        fill: String,
        layerColor: {
            type: String,
            value: color_1.WHITE,
        },
        color: {
            type: null,
            value: color_1.BLUE,
            observer: function () {
                var _this = this;
                this.setHoverColor().then(function () {
                    _this.drawCircle(_this.currentValue);
                });
            },
        },
        type: {
            type: String,
            value: '',
        },
        strokeWidth: {
            type: Number,
            value: 4,
        },
        clockwise: {
            type: Boolean,
            value: true,
        },
    },
    data: {
        hoverColor: color_1.BLUE,
    },
    methods: {
        getContext: function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, type, size, _b, ctx;
                var _this = this;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = this.data, type = _a.type, size = _a.size;
                            _b = type === '';
                            if (_b) return [3 /*break*/, 2];
                            return [4 /*yield*/, (0, version_1.canIUseCanvas2d)()];
                        case 1:
                            _b = !(_c.sent());
                            _c.label = 2;
                        case 2:
                            if (_b) {
                                ctx = wx.createCanvasContext('van-circle', this);
                                return [2 /*return*/, Promise.resolve(ctx)];
                            }
                            ;
                            return [2 /*return*/, new Promise(function (resolve) {
                                    (function () { return __awaiter(_this, void 0, void 0, function () {
                                        var info, dpr;
                                        var _this = this;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, (0, utils_1.getSystemInfoSync)()];
                                                case 1:
                                                    info = _a.sent();
                                                    dpr = info.pixelRatio;
                                                    wx.createSelectorQuery()
                                                        .in(this)
                                                        .select('#van-circle')
                                                        .node()
                                                        .exec(function (res) {
                                                        var canvas = res[0].node;
                                                        var ctx = canvas.getContext(type);
                                                        if (!_this.inited) {
                                                            _this.inited = true;
                                                            canvas.width = size * dpr;
                                                            canvas.height = size * dpr;
                                                            ctx.scale(dpr, dpr);
                                                        }
                                                        resolve((0, canvas_1.adaptor)(ctx));
                                                    });
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); })();
                                })];
                    }
                });
            });
        },
        setHoverColor: function () {
            var _this = this;
            var _a = this.data, color = _a.color, size = _a.size;
            if ((0, validator_1.isObj)(color)) {
                return this.getContext().then(function (context) {
                    if (!context)
                        return;
                    var LinearColor = context.createLinearGradient(size, 0, 0, 0);
                    Object.keys(color)
                        .sort(function (a, b) { return parseFloat(a) - parseFloat(b); })
                        .map(function (key) {
                        return LinearColor.addColorStop(parseFloat(key) / 100, color[key]);
                    });
                    _this.hoverColor = LinearColor;
                });
            }
            this.hoverColor = color;
            return Promise.resolve();
        },
        presetCanvas: function (context, strokeStyle, beginAngle, endAngle, fill) {
            var _a = this.data, strokeWidth = _a.strokeWidth, lineCap = _a.lineCap, clockwise = _a.clockwise, size = _a.size;
            var position = size / 2;
            var radius = position - strokeWidth / 2;
            context.setStrokeStyle(strokeStyle);
            context.setLineWidth(strokeWidth);
            context.setLineCap(lineCap);
            context.beginPath();
            context.arc(position, position, radius, beginAngle, endAngle, !clockwise);
            context.stroke();
            if (fill) {
                context.setFillStyle(fill);
                context.fill();
            }
        },
        renderLayerCircle: function (context) {
            var _a = this.data, layerColor = _a.layerColor, fill = _a.fill;
            this.presetCanvas(context, layerColor, 0, PERIMETER, fill);
        },
        renderHoverCircle: function (context, formatValue) {
            var clockwise = this.data.clockwise;
            // 结束角度
            var progress = PERIMETER * (formatValue / 100);
            var endAngle = clockwise
                ? BEGIN_ANGLE + progress
                : 3 * Math.PI - (BEGIN_ANGLE + progress);
            this.presetCanvas(context, this.hoverColor, BEGIN_ANGLE, endAngle);
        },
        drawCircle: function (currentValue) {
            var _this = this;
            var size = this.data.size;
            this.getContext().then(function (context) {
                if (!context)
                    return;
                context.clearRect(0, 0, size, size);
                _this.renderLayerCircle(context);
                var formatValue = format(currentValue);
                if (formatValue !== 0) {
                    _this.renderHoverCircle(context, formatValue);
                }
                context.draw();
            });
        },
        reRender: function () {
            var _this = this;
            // tofector 动画暂时没有想到好的解决方案
            var _a = this.data, value = _a.value, speed = _a.speed;
            if (speed <= 0 || speed > 1000) {
                this.drawCircle(value);
                return;
            }
            this.clearMockInterval();
            this.currentValue = this.currentValue || 0;
            var run = function () {
                _this.interval = setTimeout(function () {
                    if (_this.currentValue !== value) {
                        if (Math.abs(_this.currentValue - value) < STEP) {
                            _this.currentValue = value;
                        }
                        else if (_this.currentValue < value) {
                            _this.currentValue += STEP;
                        }
                        else {
                            _this.currentValue -= STEP;
                        }
                        _this.drawCircle(_this.currentValue);
                        run();
                    }
                    else {
                        _this.clearMockInterval();
                    }
                }, 1000 / speed);
            };
            run();
        },
        clearMockInterval: function () {
            if (this.interval) {
                clearTimeout(this.interval);
                this.interval = null;
            }
        },
    },
    mounted: function () {
        var _this = this;
        this.currentValue = this.data.value;
        this.setHoverColor().then(function () {
            _this.drawCircle(_this.currentValue);
        });
    },
    destroyed: function () {
        this.clearMockInterval();
    },
});
