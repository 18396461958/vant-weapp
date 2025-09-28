var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { VantComponent } from '../common/component';
import { button } from '../mixins/button';
import { canIUseFormFieldButton } from '../common/version';
const mixins = [button];
(() => __awaiter(void 0, void 0, void 0, function* () {
    if (yield canIUseFormFieldButton()) {
        mixins.push('wx://form-field-button');
    }
}))();
VantComponent({
    mixins,
    classes: ['hover-class', 'loading-class'],
    data: {
        baseStyle: '',
    },
    props: {
        formType: String,
        icon: String,
        classPrefix: {
            type: String,
            value: 'van-icon',
        },
        plain: Boolean,
        block: Boolean,
        round: Boolean,
        square: Boolean,
        loading: Boolean,
        hairline: Boolean,
        disabled: Boolean,
        loadingText: String,
        customStyle: String,
        loadingType: {
            type: String,
            value: 'circular',
        },
        type: {
            type: String,
            value: 'default',
        },
        dataset: null,
        size: {
            type: String,
            value: 'normal',
        },
        loadingSize: {
            type: String,
            value: '20px',
        },
        color: String,
    },
    methods: {
        onClick(event) {
            this.$emit('click', event);
            const { canIUseGetUserProfile, openType, getUserProfileDesc, lang, } = this.data;
            if (openType === 'getUserInfo' && canIUseGetUserProfile) {
                wx.getUserProfile({
                    desc: getUserProfileDesc || '  ',
                    lang: lang || 'en',
                    complete: (userProfile) => {
                        this.$emit('getuserinfo', userProfile);
                    },
                });
            }
        },
    },
});
