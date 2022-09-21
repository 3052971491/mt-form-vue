import { defineComponent, ref, reactive, inject, computed, toRefs } from "vue";
import { FormDesignElementTyping, ElementOptions } from "/@/types/form-design/index-typing";
import { Alias } from "/@/types/form-design/config/alias-config";
import { RuleConfig } from "/@/types/form-design/config/rule-config";
import type { Rule } from "ant-design-vue/es/form";
import { cloneDeep, isNil } from "lodash-es";
import mittEvent from "/@/utils/mitt/mitt";
import { IBsicElementOption } from "/@/types/form-design/basic-element/index-typing";
import { IBusinessElementOption } from "/@/types/form-design/business-element/index-typing"
import { IContainerElementOption } from "/@/types/form-design/container-element/index-typing";
import { IOtherElementOption } from '/@/types/form-design/other-element/index-typing'
export default defineComponent({
  data() {
    return {
      modelValue: null,
      reactiveData: {
        rules: [] as Rule[],
      },
    };
  },
  inject: ["globalData", "refList"],
  methods: {
    /**
     * 生成字段
     */
    buildField() {
      // 普通组件无需执行, 编辑状态无需执行
      if (!this.el.formItemFlag || this.redactState) {
        return;
      }
      const { elementId } = this.el;
      // 其他特殊处理
      if (false) {
      } else {
        // todo 待完善 简单版
        const { __fieldName__ } = this.el.options;
        if (
          this.globalData.hasOwnProperty(__fieldName__) &&
          !!this.globalData[__fieldName__]
        ) {
          this.modelValue = this.globalData[__fieldName__];
        } else if (
          this.globalData.hasOwnProperty(__fieldName__) &&
          !this.globalData[__fieldName__]
        ) {
          this.modelValue = !isNil(this.el.options.defaultValue)
            ? this.el.options.defaultValue
            : null;
        } else {
          this.modelValue = !isNil(this.el.options.defaultValue)
            ? this.el.options.defaultValue
            : null;
        }
        this.globalData[__fieldName__] = this.modelValue;
      }
    },
    /**
     * 生成校验规则
     */
    buildRule() {
      if (this.redactState) return;
      if (!this.el.options.rules) return;
      this.reactiveData.rules = [];
      this.el.options.rules.forEach((item: RuleConfig) => {
        let obj: Rule = {};
        if (item.type == "required") {
          obj = {
            required: true,
            message: item.message,
            trigger: ["change", "blur"],
          };
        } else {
          let validateFields = async (_rule: Rule, value: string) => {
            if (!value) {
              return Promise.resolve();
            } else {
              try {
                if (item.pattern && item.pattern.test(value)) {
                  return Promise.resolve();
                }
                return Promise.reject(item.message);
              } catch ({ message }) {
                console.warn(message);
                return Promise.reject(message);
              }
            }
          };
          obj = {
            validator: validateFields,
            message: item.message,
            trigger: ["change", "blur"],
          };
        }
        this.reactiveData.rules.push(obj);
      });
    },
    /**
     * 生成ref
     * 供外部调用内部方法
     */
    buildRef(oldRefName: string = "") {
      if (!this.refList) {
        this.refList = {};
      }
      if (!!this.el.elementId) {
        if (!!oldRefName) {
          delete this.refList[oldRefName];
        }
        this.refList[this.el.elementId] = this;
      }
    },
    /**
     * 生成事件监听
     */
    buildEvent() {},
    /**
     * 生成生命周期OnCreated
     */
    buildOnCreated() {
      if (!!this.el.options.onCreated) {
        let Func = new Function(this.el.options.onCreated);
        Func.call(this);
      }
    },
    /**
     * 生成生命周期OnMounted
     */
    buildOnMounted() {
      if (!!this.el.options.onMounted) {
        let Func = new Function(this.el.options.onMounted);
        Func.call(this);
      }
    },
    /**
     * 销毁ref
     */
    unregisterRef() {
      if (!!this.refList && !!this.el.elementId) {
        delete this.refList[this.el.elementId];
      }
    },
    /**
     * 获取焦点事件
     * 处理逻辑
     */
    handleFocusEvent(event: any) {
      if (!!this.el.options.onFocus) {
        let Func = new Function(this.el.options.onFocus);
        Func.call(this);
      }
    },
    /**
     * 失去焦点事件
     * 处理逻辑
     */
    handleBlurEvent(event: any) {
      if (!!this.el.options.onBlur) {
        let Func = new Function(this.el.options.onBlur);
        Func.call(this);
      }
    },
    /**
     * 输入事件
     * 处理逻辑
     */
    handleInputEvent(event: any) {
      if (!!this.el.options.onInput) {
        let Func = new Function(this.el.options.onInput);
        Func.call(this);
      }
    },
    /**
     * 修改事件
     * todo 待完善
     */
    handleChangeEvent(value: null) {
      const oldValue = cloneDeep(
        this.globalData[this.el.options.__fieldName__]
      );
      this.globalData[this.el.options.__fieldName__] = value;
      if (!!this.el.options.onChange) {
        let Func = new Function('newVal', 'oldVal' , this.el.options.onChange);
        Func.call(this, value, oldValue);
      }
      this.emitFormDataChange(
        this.globalData[this.el.options.__fieldName__],
        oldValue
      );
    },
    emitFormDataChange(newVal: any, oldVal: any) {
      mittEvent.emit("formDataChange", {
        element: this.el,
        newVal: newVal,
        oldVal: oldVal,
      });
    },
    /***********************************内部部调用api  结束位置*************************************************************************************** */
 
  },
});
