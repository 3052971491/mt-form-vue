import { computed } from "vue";
import { nextTick } from "vue";
import { formConfigTyping } from "/@/types/form-design/form/form-config-typing";
import { getGolbalCssList } from "/@/mt-form-vue/form-design/src/event/css-event"
import { getGlobalFunctions } from "/@/mt-form-vue/form-design/src/event/function-event"
/**
 * @param RendererInstance 渲染器实例
 * @param global 全局变量
 * @param formJson 表单json
 * @param DSV 数据源变量
 */
export default function useExposeRenderApi(RendererInstance: any,  global: any, formJson: any, DSV: any) {
  /** 表单配置 */
  const formConfig = computed(() => {
    if (!!formJson && !!formJson.formConfig) {
      return formJson.formConfig
    }
    return null;
  })

  /**
   * 获取表单配置
   */
  const getFormConfig = computed((): formConfigTyping => {
    return formConfig.value as any;
  })
  /**
   * 获取全局CSS
   */
  function getGolbalCss () {
    return getGolbalCssList(getFormConfig.value?.GCSS ?? '')
  }
  /**
   * 获取全局函数
   */
  function getGolbalFunction () {
    return getGlobalFunctions(getFormConfig.value?.GFUNC ?? '')
  }
  /**
   * 获取数据源变量
   */
  const getDsv = computed(() => {
    return eval("(" + getFormConfig.value.DSV + ")")
  })
  /**
   * 获取全局变量
   */
  const getGsv = computed(() => {
    return eval("(" + getFormConfig.value.GSV + ")")
  })
  
  /** 设置数据源变量 */
  function setDsv(key: string, value: any) {
    const dsv = getDsv.value;
    dsv[key] = value;
    getFormConfig.value.DSV = JSON.stringify(dsv);
  }
  /** 设置数据源变量 */
  function setGsv(key: string, value: any) {
    const gsv = getDsv.value;
    gsv[key] = value;
    getFormConfig.value.GSV = JSON.stringify(gsv);
  }
  /** 获取组件实例列表 */
  const getElementRef = computed(() => {
    if (!!global.refList) {
      return global.refList
    }
    return null;
  })
  /** 获取组件实例 */
  const getElementRefById = computed((elementId: string) => {
    if (global.refList.hasOwnProperty(elementId)) {
      return global.refList[elementId]
    }
    return null;
  })
  /**
   * 获取表单数据
   * 有表单校验
   */
  const getFormData = () => {
    return new Promise((resolve, reject) => {
      RendererInstance.value
        .validate()
        .then((valid: any) => {
          resolve(valid);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  };
  /**
   * 重置表单
   */
  const resetForm = () => {
    Object.values(global.refList).forEach((item: any) => {
      item.resetField();
    });
    nextTick(() => {
      clearValidate();
    });
  };
  /**
   * 清空表单
   */
  const clearValidate = () => {
    RendererInstance.value.clearValidate();
  };
  /**
   * 禁用表单
   */
  const setDisabledForm = (val: boolean = false) => {
    Object.values(global.refList).forEach((item: any) => {
      item.setDisabled(val);
    });
  };

  return {
    getFormData,
    resetForm,
    clearValidate,
    setDisabledForm,
    getFormConfig,
    getGolbalCss,
    getDsv,
    getGsv,
    getGolbalFunction,
    getElementRef,
    getElementRefById,
    setDsv,
    setGsv,
  };
}
