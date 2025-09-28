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
var version_1 = require("../common/version");
(0, component_1.VantComponent)({
    field: true,
    classes: ['field-class', 'input-class', 'cancel-class'],
    props: {
        value: {
            type: String,
            value: '',
        },
        label: String,
        focus: Boolean,
        error: Boolean,
        disabled: Boolean,
        readonly: Boolean,
        inputAlign: String,
        showAction: Boolean,
        useActionSlot: Boolean,
        useLeftIconSlot: Boolean,
        useRightIconSlot: Boolean,
        leftIcon: {
            type: String,
            value: 'search',
        },
        rightIcon: String,
        placeholder: String,
        placeholderStyle: String,
        actionText: {
            type: String,
            value: '取消',
        },
        background: {
            type: String,
            value: '#ffffff',
        },
        maxlength: {
            type: Number,
            value: -1,
        },
        shape: {
            type: String,
            value: 'square',
        },
        clearable: {
            type: Boolean,
            value: true,
        },
        clearTrigger: {
            type: String,
            value: 'focus',
        },
        clearIcon: {
            type: String,
            value: 'clear',
        },
        cursorSpacing: {
            type: Number,
            value: 0,
        },
    },
    methods: {
        onChange: function (event) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, (0, version_1.canIUseModel)()];
                        case 1:
                            if (_a.sent()) {
                                this.setData({ value: event.detail });
                            }
                            this.$emit('change', event.detail);
                            return [2 /*return*/];
                    }
                });
            });
        },
        onCancel: function () {
            var _this = this;
            /**
             * 修复修改输入框值时，输入框失焦和赋值同时触发，赋值失效
             * https://github.com/youzan/vant-weapp/issues/1768
             */
            setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, (0, version_1.canIUseModel)()];
                        case 1:
                            if (_a.sent()) {
                                this.setData({ value: '' });
                            }
                            this.$emit('cancel');
                            this.$emit('change', '');
                            return [2 /*return*/];
                    }
                });
            }); }, 200);
        },
        onSearch: function (event) {
            this.$emit('search', event.detail);
        },
        onFocus: function (event) {
            this.$emit('focus', event.detail);
        },
        onBlur: function (event) {
            this.$emit('blur', event.detail);
        },
        onClear: function (event) {
            this.$emit('clear', event.detail);
        },
        onClickInput: function (event) {
            this.$emit('click-input', event.detail);
        },
    },
});
