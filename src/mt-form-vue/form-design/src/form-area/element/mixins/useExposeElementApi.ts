import { defineComponent } from "vue";
import { Alias } from "/@/types/form-design/config/alias-config";
import { formConfigTyping } from "/@/types/form-design/form/form-config-typing";
export default defineComponent({
  methods: {
    /************************************* 组件相关Api start ******************************************************************************************* */
    /**
     * 获取组件ref
     */
    getElementRef() {
      return this
    },
    /**
     * 设置组件数据
     */
    setValue(newValue: any) {
      if (!!this.el.formItemFlag) {
        this.modelValue = newValue;
        this.handleChangeEvent(this.modelValue);
      }
    },
    /**
     * 获取组件数据
     */
    getValue() {
      return this.modelValue;
    },
    /**
     * 重置组件为默认值，并清除组件校验状态
     */
    resetField() {
      const defaultValue = this.el.options.defaultValue;
      this.setValue(defaultValue);
    },
    /**
     * 设置组件是否禁用
     */
    setDisabled(val: boolean) {
      this.el.options.disabled = val;
    },
    /** 获取组件是否禁用 */
    getDisabled() {
      return this.el.options.disabled
    },
    /**
     * 设置组件是否隐藏
     */
    setHidden(val: boolean) {
      this.el.options.hidden = val;
    },
    /** 获取组件是否隐藏 */
    getHidden() {
      return this.el.options.hidden
    },
    /**
     * 设置组件是否必填
     */
    setRequired() {
      if (!this.getRequired()) {
        this.el.options.rules.push(
          {
          type:
          "required",
          message:
          "该字段不能为空"
          })
      }
    },
    /** 获取组件是否必填 */
    getRequired() {
      return this.el.options.rules.findIndex((item) => {
        return item.type == "required"
      }) != -1
    },
    /**
     * 设置组件标签文字（label）
     */
    setLabel(val: string) {
      this.el.options.label = val;
    },
    /** 获取组件标签文字（label）*/
    getLabel() {
      return this.el.options.label
    },
    /** 格式化数据来源合适，配合alias使用 */
    formatOptions(data: any, alias: Alias) {
      if (!alias) return data;
      const arr: Array<any> = data.map((item: any) => {
        const obj: any = {};
        Object.keys(alias).forEach((i: string) => {
          obj[i] = item[alias[i]]
        });
        return obj
      })
      return arr;
    },
    /** 获取组件ref列表 */
    getElementRefList(): Array<any> {
      return this.refList
    },
    /** 根据id获取组件ref */
    getElementRefById(elementId: string) {
      if (this.getElementRefList().hasOwnProperty(elementId)) {
        return this.getElementRefList()[elementId]
      }
      return null;
    },
    /************************************* 组件相关Api end ******************************************************************************************* */

    /************************************* 表单相关Api start ******************************************************************************************* */
    
    /** 获取表单配置 */
    getFormConfig(): formConfigTyping {
      return this.config;
    },
    /** 获取全局函数 */
    getGolbalFunction() {
      return this.getFormConfig().GFUNC
    },
    /** 获取数据源变量 */
    getDsv() {
      return eval("(" + this.getFormConfig().DSV + ")")
    },
    /** 获取全局变量 */
    getGsv() {
      return eval("(" + this.getFormConfig().GSV + ")")
    },
    /** 设置数据源变量 */
    setDsv(key: string, value: any) {
      const dsv = this.getDsv();
      dsv[key] = value;
      this.getFormConfig().DSV = JSON.stringify(dsv);
    },
    /** 设置数据源变量 */
    setGsv(key: string, value: any) {
      const gsv = this.getGsv();
      gsv[key] = value;
      this.getFormConfig().GSV = JSON.stringify(gsv);
    },

    /** 数值输入框 获取前缀 */
    getInputNumberAddonBefore() {
      if (this.el.type != 'input-number') return null;
      return this.el.options.addonBefore;
    },
    /** 数值输入框 设置前缀 */
    setInputNumberAddonBefore(val: string) {
      if (this.el.type != 'input-number') return;
      this.el.options.addonBefore = val;
    },
    /** 数值输入框 获取后缀 */
    getInputNumberAddonAfter() {
      if (this.el.type != 'input-number') return null;
      return this.el.options.addonAfter;
    },
    /** 数值输入框 设置后缀 */
    setInputNumberAddonAfter(val: string) {
      if (this.el.type != 'input-number') return;
      this.el.options.addonAfter = val;
    },



    /************************************* 表单相关Api end ******************************************************************************************* */
  }
})