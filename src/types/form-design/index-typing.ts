import { IBsicElementOption } from "./basic-element/index-typing";
import { IBusinessElementOption } from "./business-element/index-typing"
import { IContainerElementOption } from "./container-element/index-typing";
import { IOtherElementOption } from './other-element/index-typing'
/** 设计器组件类型 */
export interface FormDesignElementTyping {
  /** 组件唯一id */
  elementId: string;
  /** 组件类型 */
  type: string;
  /** 组件名称 */
  name: string;
  /** 图标类型 */
  iconType: string;
  /** 图标名称 */
  icon: string;
  /** 是否需要a-form-item组件包裹 */
  formItemFlag: boolean;
  /** 组件配置 */
  options: ElementOptions;
  /** 组件种类 */
  category?: string;
  /** 是否是可拖拽组件 */
  internal?: boolean;
  /** 内部组件列表, internal为true */
  list?: Array<FormDesignElementTyping>;
  /** 子容器使用*/
  children?: Array<FormDesignElementTyping>;
}

/** 设计器组件Option类型 */
export type ElementOptions = IBsicElementOption & IBusinessElementOption & IContainerElementOption & IOtherElementOption