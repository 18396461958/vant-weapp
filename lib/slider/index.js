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
var component_1 = require("../common/component");
var touch_1 = require("../mixins/touch");
var version_1 = require("../common/version");
var utils_1 = require("../common/utils");
var DRAG_STATUS = {
    START: 'start',
    MOVING: 'moving',
    END: 'end',
};
(0, component_1.VantComponent)({
    mixins: [touch_1.touch],
    props: {
        range: Boolean,
        disabled: Boolean,
        useButtonSlot: Boolean,
        activeColor: String,
        inactiveColor: String,
        max: {
            type: Number,
            value: 100,
        },
        min: {
            type: Number,
            value: 0,
        },
        step: {
            type: Number,
            value: 1,
        },
        value: {
            type: null,
            value: 0,
            observer: function (val) {
                if (val !== this.value) {
                    this.updateValue(val);
                }
            },
        },
        vertical: Boolean,
        barHeight: null,
    },
    created: function () {
        this.updateValue(this.data.value);
    },
    methods: {
        onTouchStart: function (event) {
            var _this = this;
            if (this.data.disabled)
                return;
            var index = event.currentTarget.dataset.index;
            if (typeof index === 'number') {
                this.buttonIndex = index;
            }
            this.touchStart(event);
            this.startValue = this.format(this.value);
            this.newValue = this.value;
            if (this.isRange(this.newValue)) {
                this.startValue = this.newValue.map(function (val) { return _this.format(val); });
            }
            else {
                this.startValue = this.format(this.newValue);
            }
            this.dragStatus = DRAG_STATUS.START;
        },
        onTouchMove: function (event) {
            var _this = this;
            if (this.data.disabled)
                return;
            if (this.dragStatus === DRAG_STATUS.START) {
                this.$emit('drag-start');
            }
            this.touchMove(event);
            this.dragStatus = DRAG_STATUS.MOVING;
            (0, utils_1.getRect)(this, '.van-slider').then(function (rect) {
                var vertical = _this.data.vertical;
                var delta = vertical ? _this.deltaY : _this.deltaX;
                var total = vertical ? rect.height : rect.width;
                var diff = (delta / total) * _this.getRange();
                if (_this.isRange(_this.startValue)) {
                    _this.newValue[_this.buttonIndex] =
                        _this.startValue[_this.buttonIndex] + diff;
                }
                else {
                    _this.newValue = _this.startValue + diff;
                }
                _this.updateValue(_this.newValue, false, true);
            });
        },
        onTouchEnd: function () {
            var _this = this;
            if (this.data.disabled)
                return;
            if (this.dragStatus === DRAG_STATUS.MOVING) {
                this.dragStatus = DRAG_STATUS.END;
                (0, utils_1.nextTick)(function () {
                    _this.updateValue(_this.newValue, true);
                    _this.$emit('drag-end');
                });
            }
        },
        onClick: function (event) {
            var _this = this;
            if (this.data.disabled)
                return;
            var min = this.data.min;
            (0, utils_1.getRect)(this, '.van-slider').then(function (rect) {
                var vertical = _this.data.vertical;
                var touch = event.touches[0];
                var delta = vertical
                    ? touch.clientY - rect.top
                    : touch.clientX - rect.left;
                var total = vertical ? rect.height : rect.width;
                var value = Number(min) + (delta / total) * _this.getRange();
                if (_this.isRange(_this.value)) {
                    var _a = _this.value, left = _a[0], right = _a[1];
                    var middle = (left + right) / 2;
                    if (value <= middle) {
                        _this.updateValue([value, right], true);
                    }
                    else {
                        _this.updateValue([left, value], true);
                    }
                }
                else {
                    _this.updateValue(value, true);
                }
            });
        },
        isRange: function (val) {
            var range = this.data.range;
            return range && Array.isArray(val);
        },
        handleOverlap: function (value) {
            if (value[0] > value[1]) {
                return value.slice(0).reverse();
            }
            return value;
        },
        updateValue: function (value, end, drag) {
            return __awaiter(this, void 0, void 0, function () {
                var vertical, mainAxis, _a;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (this.isRange(value)) {
                                value = this.handleOverlap(value).map(function (val) { return _this.format(val); });
                            }
                            else {
                                value = this.format(value);
                            }
                            this.value = value;
                            vertical = this.data.vertical;
                            mainAxis = vertical ? 'height' : 'width';
                            this.setData({
                                wrapperStyle: "\n          background: ".concat(this.data.inactiveColor || '', ";\n          ").concat(vertical ? 'width' : 'height', ": ").concat((0, utils_1.addUnit)(this.data.barHeight) || '', ";\n        "),
                                barStyle: "\n          ".concat(mainAxis, ": ").concat(this.calcMainAxis(), ";\n          left: ").concat(vertical ? 0 : this.calcOffset(), ";\n          top: ").concat(vertical ? this.calcOffset() : 0, ";\n          ").concat(drag ? 'transition: none;' : '', "\n        "),
                            });
                            if (drag) {
                                this.$emit('drag', { value: value });
                            }
                            if (end) {
                                this.$emit('change', value);
                            }
                            _a = (drag || end);
                            if (!_a) return [3 /*break*/, 2];
                            return [4 /*yield*/, (0, version_1.canIUseModel)()];
                        case 1:
                            _a = (_b.sent());
                            _b.label = 2;
                        case 2:
                            if (_a) {
                                this.setData({ value: value });
                            }
                            return [2 /*return*/];
                    }
                });
            });
        },
        getScope: function () {
            return Number(this.data.max) - Number(this.data.min);
        },
        getRange: function () {
            var _a = this.data, max = _a.max, min = _a.min;
            return max - min;
        },
        getOffsetWidth: function (current, min) {
            var scope = this.getScope();
            // 避免最小值小于最小step时出现负数情况
            return "".concat(Math.max(((current - min) * 100) / scope, 0), "%");
        },
        // 计算选中条的长度百分比
        calcMainAxis: function () {
            var value = this.value;
            var min = this.data.min;
            if (this.isRange(value)) {
                return this.getOffsetWidth(value[1], value[0]);
            }
            return this.getOffsetWidth(value, Number(min));
        },
        // 计算选中条的开始位置的偏移量
        calcOffset: function () {
            var value = this.value;
            var min = this.data.min;
            var scope = this.getScope();
            if (this.isRange(value)) {
                return "".concat(((value[0] - Number(min)) * 100) / scope, "%");
            }
            return '0%';
        },
        format: function (value) {
            var min = +this.data.min;
            var max = +this.data.max;
            var step = +this.data.step;
            value = (0, utils_1.clamp)(value, min, max);
            var diff = Math.round((value - min) / step) * step;
            return (0, utils_1.addNumber)(min, diff);
        },
    },
});
