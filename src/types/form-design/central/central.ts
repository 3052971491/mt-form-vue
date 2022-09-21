import { formConfigTyping } from "../form/form-config-typing";
import { FormDesignElementTyping } from "../index-typing";
/**
 * 海克斯数据接口
 */
export interface centralDataTyping {
  /**
   * 组件列表
   */
  elementList: Array<FormDesignElementTyping>;
  /**
   * 表单配置
   */
  formConfig: formConfigTyping;
  /**
   * 选中组件Id
   */
  selectedId: string;
  /**
   * 选中组件
   */
  selectedElement: FormDesignElementTyping | null;
  /**
   * 一维组件列表: 不包括容器组件
   */
  linearElementList: Array<FormDesignElementTyping>;
  /**
   * 历史缓存记录
   */
  historyData: historyDataTypig;
  /**
   * 全局CSS
   */
  globalCss: Array<any>;
  /**
   * 全局方法
   */
  globalFunctions: Array<any>;
}

export interface historyDataTypig {
  index: number;
  maxStep: number;
  steps: Array<historyDataStepTypig>;
}
export interface historyDataStepTypig {
  elementList?: Array<FormDesignElementTyping>;
  formConfig?: formConfigTyping;
}
