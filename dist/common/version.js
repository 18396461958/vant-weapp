var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let deviceInfo = null;
let windowInfo = null;
let appBaseInfo = null;
// 获取设备信息（同步）
function getDeviceInfoSync() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!deviceInfo) {
            deviceInfo = yield wx.getDeviceInfo();
        }
        return deviceInfo;
    });
}
// 获取窗口信息（同步）
function getWindowInfoSync() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!windowInfo) {
            windowInfo = yield wx.getWindowInfo();
        }
        return windowInfo;
    });
}
// 获取应用基础信息（同步）
function getAppBaseInfoSync() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!appBaseInfo) {
            appBaseInfo = yield wx.getAppBaseInfo();
        }
        return appBaseInfo;
    });
}
// 组合系统信息
export function getSystemInfoSync() {
    return __awaiter(this, void 0, void 0, function* () {
        const device = yield getDeviceInfoSync();
        const window = yield getWindowInfoSync();
        const appBase = yield getAppBaseInfoSync();
        // 更可靠的企业微信环境判断
        let environment = undefined;
        try {
            // 企业微信特有的API
            if (typeof wx.qy !== 'undefined') {
                environment = 'wxwork';
            }
        }
        catch (e) {
            // 忽略错误
        }
        return {
            pixelRatio: window.pixelRatio,
            platform: device.platform,
            environment: environment,
            SDKVersion: appBase.SDKVersion,
            windowHeight: window.windowHeight,
            statusBarHeight: window.statusBarHeight
        };
    });
}
// 比较版本号函数保持不变
function compareVersion(v1, v2) {
    const v1Parts = v1.split('.').map(Number);
    const v2Parts = v2.split('.').map(Number);
    const len = Math.max(v1Parts.length, v2Parts.length);
    for (let i = 0; i < len; i++) {
        const num1 = v1Parts[i] || 0;
        const num2 = v2Parts[i] || 0;
        if (num1 > num2)
            return 1;
        if (num1 < num2)
            return -1;
    }
    return 0;
}
function gte(version) {
    return __awaiter(this, void 0, void 0, function* () {
        const system = yield getSystemInfoSync();
        return compareVersion(system.SDKVersion, version) >= 0;
    });
}
export function canIUseModel() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield gte('2.9.3');
    });
}
export function canIUseFormFieldButton() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield gte('2.10.3');
    });
}
export function canIUseAnimate() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield gte('2.9.0');
    });
}
export function canIUseGroupSetData() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield gte('2.4.0');
    });
}
export function canIUseNextTick() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return wx.canIUse('nextTick');
        }
        catch (e) {
            return yield gte('2.7.1');
        }
    });
}
export function canIUseCanvas2d() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield gte('2.9.0');
    });
}
export function canIUseGetUserProfile() {
    return !!wx.getUserProfile;
}
