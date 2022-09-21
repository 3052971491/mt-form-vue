import { RuleConfig } from '/#/types/form-design/config/rule-config';
import { DateConfig } from './date-config';
import { ElementSizeEnum } from '/@/enums/form-design/size-enum';
/**
 * 时间组件配置
 */
export interface dateTyping {
  /** 表名 */
  __tableName__: string | null;
  /** 字段名 */
  __fieldName__: string | null;
  /** label名称 */
  label: string | null;
  /** 是否显示label */
  hiddenLabel: boolean;
  /** 是否显示清除按钮*/
  allowClear: boolean;
  /** 是否需要边框 */
  bordered: boolean;
  /** 是否禁用 */
  disabled: boolean;
  /** 是否隐藏 */
  hidden: boolean;
  /** 组件大小 */
  size: ElementSizeEnum | null;
  /** 默认提示文字 */
  placeholder?: string | null;
  /** 范围组件提示文字-start */
  startPlaceholder?: string| null;
  /** 范围组件提示文字-end */
  endPlaceholder?: string| null;
  /** 默认值 */
  defaultValue: string | null;
  /** 校验规则*/
  rules: RuleConfig[];
  /** 自定义样式 */
  customStyles: Array<string>,
  /** 时间组件配置项配置，不需要展示 */
  dateConfig?: DateConfig;
  /** 格式化显示文本 */
  dateFormat: string;
  /** 绑定值的格式，对 value、defaultValue 起作用。不指定则绑定值为 dayjs 对象 */
  dateValueFormat: string;
  /** 增加时间选择功能 */
  showTime?: boolean;
  /** 面板是否显示“此刻”按钮 */
  showNow?: boolean;
  /** 是否展示“今天”按钮 */
  showToday?: boolean;
  /** 创建时 */
  onCreated: string | null;
  /** 挂载时 */
  onMounted: string | null;
  /** 修改时 */
  onChange: string | null;
}

