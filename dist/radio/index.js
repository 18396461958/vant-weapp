var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { canIUseModel } from '../common/version';
import { VantComponent } from '../common/component';
import { useParent } from '../common/relation';
VantComponent({
    field: true,
    relation: useParent('radio-group', function () {
        this.updateFromParent();
    }),
    classes: ['icon-class', 'label-class'],
    props: {
        name: null,
        value: null,
        disabled: Boolean,
        useIconSlot: Boolean,
        checkedColor: String,
        labelPosition: {
            type: String,
            value: 'right',
        },
        labelDisabled: Boolean,
        shape: {
            type: String,
            value: 'round',
        },
        iconSize: {
            type: null,
            value: 20,
        },
    },
    data: {
        direction: '',
        parentDisabled: false,
    },
    methods: {
        updateFromParent() {
            if (!this.parent) {
                return;
            }
            const { value, disabled: parentDisabled, direction } = this.parent.data;
            this.setData({
                value,
                direction,
                parentDisabled,
            });
        },
        emitChange(value) {
            return __awaiter(this, void 0, void 0, function* () {
                const instance = this.parent || this;
                instance.$emit('input', value);
                instance.$emit('change', value);
                if (yield canIUseModel()) {
                    instance.setData({ value });
                }
            });
        },
        onChange() {
            if (!this.data.disabled && !this.data.parentDisabled) {
                this.emitChange(this.data.name);
            }
        },
        onClickLabel() {
            const { disabled, parentDisabled, labelDisabled, name } = this.data;
            if (!(disabled || parentDisabled) && !labelDisabled) {
                this.emitChange(name);
            }
        },
    },
});
