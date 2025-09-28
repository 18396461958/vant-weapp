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
var relation_1 = require("../common/relation");
var utils_1 = require("../common/utils");
var ARRAY = [];
(0, component_1.VantComponent)({
    field: true,
    classes: ['title-class'],
    relation: (0, relation_1.useChildren)('dropdown-item', function () {
        this.updateItemListData();
    }),
    props: {
        activeColor: {
            type: String,
            observer: 'updateChildrenData',
        },
        overlay: {
            type: Boolean,
            value: true,
            observer: 'updateChildrenData',
        },
        zIndex: {
            type: Number,
            value: 10,
        },
        duration: {
            type: Number,
            value: 200,
            observer: 'updateChildrenData',
        },
        direction: {
            type: String,
            value: 'down',
            observer: 'updateChildrenData',
        },
        safeAreaTabBar: {
            type: Boolean,
            value: false,
        },
        closeOnClickOverlay: {
            type: Boolean,
            value: true,
            observer: 'updateChildrenData',
        },
        closeOnClickOutside: {
            type: Boolean,
            value: true,
        },
    },
    data: {
        itemListData: [],
    },
    beforeCreate: function () {
        return __awaiter(this, void 0, void 0, function () {
            var windowHeight;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, utils_1.getSystemInfoSync)()];
                    case 1:
                        windowHeight = (_a.sent()).windowHeight;
                        this.windowHeight = windowHeight;
                        ARRAY.push(this);
                        return [2 /*return*/];
                }
            });
        });
    },
    destroyed: function () {
        var _this = this;
        ARRAY = ARRAY.filter(function (item) { return item !== _this; });
    },
    methods: {
        updateItemListData: function () {
            this.setData({
                itemListData: this.children.map(function (child) { return child.data; }),
            });
        },
        updateChildrenData: function () {
            this.children.forEach(function (child) {
                child.updateDataFromParent();
            });
        },
        toggleItem: function (active) {
            this.children.forEach(function (item, index) {
                var showPopup = item.data.showPopup;
                if (index === active) {
                    item.toggle();
                }
                else if (showPopup) {
                    item.toggle(false, { immediate: true });
                }
            });
        },
        close: function () {
            this.children.forEach(function (child) {
                child.toggle(false, { immediate: true });
            });
        },
        getChildWrapperStyle: function () {
            var _this = this;
            var _a = this.data, zIndex = _a.zIndex, direction = _a.direction;
            return (0, utils_1.getRect)(this, '.van-dropdown-menu').then(function (rect) {
                var _a = rect.top, top = _a === void 0 ? 0 : _a, _b = rect.bottom, bottom = _b === void 0 ? 0 : _b;
                var offset = direction === 'down' ? bottom : _this.windowHeight - top;
                var wrapperStyle = "z-index: ".concat(zIndex, ";");
                if (direction === 'down') {
                    wrapperStyle += "top: ".concat((0, utils_1.addUnit)(offset), ";");
                }
                else {
                    wrapperStyle += "bottom: ".concat((0, utils_1.addUnit)(offset), ";");
                }
                return wrapperStyle;
            });
        },
        onTitleTap: function (event) {
            var _this = this;
            var index = event.currentTarget.dataset.index;
            var child = this.children[index];
            if (!child.data.disabled) {
                ARRAY.forEach(function (menuItem) {
                    if (menuItem &&
                        menuItem.data.closeOnClickOutside &&
                        menuItem !== _this) {
                        menuItem.close();
                    }
                });
                this.toggleItem(index);
            }
        },
    },
});
