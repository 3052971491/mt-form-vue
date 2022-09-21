import { RuleConfig } from "/@/types/form-design/config/rule-config";
/** 评分配置 */
export interface rateTyping {
  /** 表名 */
  __tableName__: string | null;
  /** 字段名 */
  __fieldName__: string | null;
  /** label名称 */
  label: string | null;
  /** 是否显示label */
  hiddenLabel: boolean;
  /** 是否允许再次点击后清除 */
  allowClear: boolean;
  /** 是否禁用 */
  disabled: boolean;
  /** 是否隐藏 */
  hidden: boolean;
  /** 默认值 */
  defaultValue: string | null;
  /** 校验规则 */
  rules: Array<RuleConfig>;
  /** 自定义样式 */
  customStyles: Array<string>,

  /** 是否允许半选 */
  allowHalf: boolean;
  /** star 总数 */
  count: number;
  /** 自定义每项的提示信息 */
  tooltips: Array<string>;

  /** 创建时 */
  onCreated: string | null;
  /** 挂载时 */
  onMounted: string | null;
  /** 修改时 */
  onChange: string | null;
}
