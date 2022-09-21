import { computed } from "vue";
import mittEvent from "/@/utils/mitt/mitt";
/**
 * @param formRenderRef 当前dom
 * @param _this 当前实例this
 * @param global 全局变量
 * @param formJson 表单json
 * @param DSV 数据源变量
 */
export default function useFormRender(formRenderRef: any, _this: any, global: any, formJson: any, DSV: any) {
  /** 表单配置 */
  const formConfig = computed(() => {
    if (!!formJson && !!formJson.formConfig) {
      return formJson.formConfig
    }
    return null;
  })

  const getElementName = (type: string, category: string) => {
    if (category == "contianer") {
      return `mt-${type}-item`;
    } else {
      return `mt-${type}-element`;
    }
  };

  /**
   * form表单触发生命周期--onCreated
   */
  const buildFormOnCreated = () => {
    if (!!formJson.formConfig.onCreated) {
      let Func = new Function(formJson.formConfig.onCreated);
      Func.call(_this.exposed);
    }
  };
  /**
   * form表单触发生命周期--OnMounted
   */
  const buildFormOnMounted = () => {
    if (!!formJson.formConfig.onMounted) {
      let Func = new Function(formJson.formConfig.onMounted);
      Func.call(_this.exposed);
    }
  };
  /**
   * form表单触change事件--change
   * formDataChange
   */
  const handleFormChange = () => {
    mittEvent.off("formDataChange");
    mittEvent.on("formDataChange", (info: any) => {
      if (!!formJson.formConfig.onChange) {
        let Func = new Function(
          "element",
          "newVal",
          "oldVal",
          formJson.formConfig.onChange
        );
        Func.call(_this.exposed, info.element, info.newVal, info.oldVal);
      }
    });
  };

  return {
    formConfig,
    getElementName,
    buildFormOnCreated,
    buildFormOnMounted,
    handleFormChange,
  };
}
