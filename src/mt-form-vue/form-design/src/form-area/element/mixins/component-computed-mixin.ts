import { defineComponent } from "vue";
import { IBsicElementOption } from "/@/types/form-design/basic-element/index-typing";
import { IBusinessElementOption } from "/@/types/form-design/business-element/index-typing"
import { IContainerElementOption } from "/@/types/form-design/container-element/index-typing";
import { IOtherElementOption } from '/@/types/form-design/other-element/index-typing'
import { FormDesignElementTyping, ElementOptions } from "/@/types/form-design/index-typing";
export default defineComponent({
  computed: {
    el(): FormDesignElementTyping {
      return this.element as any;
    },
    options(): ElementOptions {
      return this.element.options as any;
    },
    /**
     * 组件大小: 使用表单配置的统一设置大小
     */
    size() {
      if (!this.el.options.size) return this.config.size;
      return this.el.options.size;
    },
  },
})