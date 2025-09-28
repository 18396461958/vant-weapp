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
import { canIUseModel } from '../common/version';
VantComponent({
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
        onChange(event) {
            return __awaiter(this, void 0, void 0, function* () {
                if (yield canIUseModel()) {
                    this.setData({ value: event.detail });
                }
                this.$emit('change', event.detail);
            });
        },
        onCancel() {
            /**
             * 修复修改输入框值时，输入框失焦和赋值同时触发，赋值失效
             * https://github.com/youzan/vant-weapp/issues/1768
             */
            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                if (yield canIUseModel()) {
                    this.setData({ value: '' });
                }
                this.$emit('cancel');
                this.$emit('change', '');
            }), 200);
        },
        onSearch(event) {
            this.$emit('search', event.detail);
        },
        onFocus(event) {
            this.$emit('focus', event.detail);
        },
        onBlur(event) {
            this.$emit('blur', event.detail);
        },
        onClear(event) {
            this.$emit('clear', event.detail);
        },
        onClickInput(event) {
            this.$emit('click-input', event.detail);
        },
    },
});
