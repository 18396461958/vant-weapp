interface CustomSystemInfo {
  pixelRatio: number;
  platform: string;
  environment?: 'wxwork';
  SDKVersion: string;
  windowHeight: number;
  statusBarHeight: number;
}

let deviceInfo: WechatMiniprogram.DeviceInfo | null = null;
let windowInfo: WechatMiniprogram.WindowInfo | null = null;
let appBaseInfo: WechatMiniprogram.AppBaseInfo | null = null;

// 获取设备信息（同步）
async function getDeviceInfoSync(): Promise<WechatMiniprogram.DeviceInfo> {
  if (!deviceInfo) {
    deviceInfo = await wx.getDeviceInfo();
  }
  return deviceInfo;
}

// 获取窗口信息（同步）
async function getWindowInfoSync(): Promise<WechatMiniprogram.WindowInfo> {
  if (!windowInfo) {
    windowInfo = await wx.getWindowInfo();
  }
  return windowInfo;
}

// 获取应用基础信息（同步）
async function getAppBaseInfoSync(): Promise<WechatMiniprogram.AppBaseInfo> {
  if (!appBaseInfo) {
    appBaseInfo = await wx.getAppBaseInfo();
  }
  return appBaseInfo;
}


// 组合系统信息
export async function getSystemInfoSync(): Promise<CustomSystemInfo> {
  const device = await getDeviceInfoSync();
  const window = await getWindowInfoSync();
  const appBase = await getAppBaseInfoSync();

  // 更可靠的企业微信环境判断
  let environment: 'wxwork' | undefined = undefined;
  try {
    // 企业微信特有的API
    if (typeof wx.qy !== 'undefined') {
      environment = 'wxwork';
    }
  } catch (e) {
    // 忽略错误
  }

  return {
    pixelRatio: window.pixelRatio, // 从windowInfo中获取
    platform: device.platform,
    environment: environment,
    SDKVersion: appBase.SDKVersion,
    windowHeight: window.windowHeight,
    statusBarHeight: window.statusBarHeight
  };
}

// 比较版本号函数保持不变
function compareVersion(v1: string, v2: string) {
  const v1Parts = v1.split('.').map(Number);
  const v2Parts = v2.split('.').map(Number);
  const len = Math.max(v1Parts.length, v2Parts.length);

  for (let i = 0; i < len; i++) {
    const num1 = v1Parts[i] || 0;
    const num2 = v2Parts[i] || 0;

    if (num1 > num2) return 1;
    if (num1 < num2) return -1;
  }

  return 0;
}

async function gte(version: string) {
  const system = await getSystemInfoSync();
  return compareVersion(system.SDKVersion, version) >= 0;
}

export async function canIUseModel() {
  return await gte('2.9.3');
}

export async function canIUseFormFieldButton() {
  return await gte('2.10.3');
}

export async function canIUseAnimate() {
  return await gte('2.9.0');
}

export async function canIUseGroupSetData() {
  return await gte('2.4.0');
}

export async function canIUseNextTick() {
  try {
    return wx.canIUse('nextTick');
  } catch (e) {
    return await gte('2.7.1');
  }
}

export async function canIUseCanvas2d() {
  return await gte('2.9.0');
}

export function canIUseGetUserProfile() {
  return !!wx.getUserProfile;
}
