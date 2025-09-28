interface CustomSystemInfo {
    pixelRatio: number;
    platform: string;
    environment?: 'wxwork';
    SDKVersion: string;
    windowHeight: number;
    statusBarHeight: number;
}
export declare function getSystemInfoSync(): Promise<CustomSystemInfo>;
export declare function canIUseModel(): Promise<boolean>;
export declare function canIUseFormFieldButton(): Promise<boolean>;
export declare function canIUseAnimate(): Promise<boolean>;
export declare function canIUseGroupSetData(): Promise<boolean>;
export declare function canIUseNextTick(): Promise<boolean>;
export declare function canIUseCanvas2d(): Promise<boolean>;
export declare function canIUseGetUserProfile(): boolean;
export {};
