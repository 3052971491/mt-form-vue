import { Layout } from '/@/enums/form-design/form-enum'
import { ElementSizeEnum } from '/@/enums/form-design/size-enum'
import { Position } from '/@/enums/form-design/element-enum'
/**
 * 数据源配置 header
 * @param type (header 类型)
 * @param label (header 名称)
 * @param value (header 值)
 */
export interface dataSourcesHeaderConfig {
  /** 数据源配置 header 类型 */
  type: string;
  /** 数据源配置 header 名称 */
  label: string;
  /** 数据源配置 header 值 */
  value: string;
}
/**
 * 数据源配置 params
 * @param type (header 类型)
 * @param label (header 名称)
 * @param value (header 值)
 */
export interface dataSourcesParamsConfig {
  /** 数据源配置 params类型 */
  type: string;
  /** 数据源配置 params名称 */
  label: string;
  /** 数据源配置 params值 */
  value: string;
}
/**
 * 数据源配置 data
 * @param type (header 类型)
 * @param label (header 名称)
 * @param value (header 值)
 */
export interface dataSourcesDataConfig {
  /** 数据源配置 data类型 */
  type: string;
  /** 数据源配置 data名称 */
  label: string;
  /** 数据源配置 data值 */
  value: string;
}
/**
 * 数据源配置
 * @param dataSourceId (唯一 ID)
 * @param uniqueName (唯一名称)
 * @param requestURL (请求地址)
 * @param requestURLType (请求类型)
 * @param requestMethod (请求方法)
 * @param description (描述)
 * @param headers (请求头配置)
 * @param params (参数配置)
 * @param data (发送数据)
 * @param configHandlerCode (请求配置)
 * @param dataHandlerCode (数据处理)
 * @param errorHandlerCode (错误处理)
 */
export interface dataSourcesConfigTyping {
  /** 唯一 ID */
  dataSourceId: string;
  /** 唯一名称 */
  uniqueName: string | null;
  /** 请求地址 */
  requestURL: string | null;
  /** 请求类型 */
  requestURLType: string;
  /** 请求方法 */
  requestMethod: string;
  /** 描述 */
  description: string | null;
  /** 请求头配置 */
  headers: Array<dataSourcesHeaderConfig>;
  /** 参数配置 */
  params: Array<dataSourcesParamsConfig>;
  /** 发送数据 */
  data: Array<dataSourcesDataConfig>;
  /** 请求配置 */
  configHandlerCode: string;
  /** 数据处理 */
  dataHandlerCode: string;
  /** 错误处理 */
  errorHandlerCode: string;
}
/**
 * 表单配置
 * @param formId (唯一ID)
 * @param name (名称)
 * @param size (全局组件大小)
 * @param labelWidth (label 宽度)
 * @param hideRequiredMark (隐藏所有表单项的必选标记)
 * @param labelAlign (label 标签的文本对齐方式)
 * @param layout (表单布局)
 * @param dataSources (数据源集合)
 * @param onCreated (onCreated 钩子函数)
 * @param onMounted (onMounted 钩子函数)
 * @param onChange (onCreated 钩子函数)
 */
export interface formConfigTyping {
  /** 唯一ID */
  formId: string;
  /** 名称 */
  // name: string | null;
  /** 全局组件大小 */
  size: ElementSizeEnum | null;
  /** label 宽度 */
  labelWidth?: number | null;
  /** 隐藏所有表单项的必选标记 */
  hideRequiredMark: boolean;
  /** label 标签的文本对齐方式 */
  labelAlign: Position;
  /** 表单布局 */
  layout: Layout;
  /** 自定义样式 */
  customStyles: Array<string>,
  /** 数据源集合 */
  dataSources: Array<dataSourcesConfigTyping>;
  /** 数据源变量集合 Data source variable */
  DSV: string | null,
  /** 全局源变量集合 Global source variable */
  GSV: string | null,
  /** 全局CSS */
  GCSS: string | null,
  /** 全局函数 */
  GFUNC: string | null,
  /** onCreated 钩子函数 */
  onCreated: string | null;
  /** onMounted 钩子函数 */
  onMounted: string | null;
  /** onChange 钩子函数 */
  onChange: string | null;
}
