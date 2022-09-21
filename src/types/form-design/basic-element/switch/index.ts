import { RuleConfig } from '/@/types/form-design/config/rule-config';
import { ElementSizeEnum } from '/@/enums/form-design/size-enum';
/** 开关配置 */
export interface switchTyping {
  /** 表名 */
  __tableName__: string | null;
  /** 字段名 */
  __fieldName__: string | null;
  /** label名称 */
  label: string | null;
  /** 是否显示label */
  hiddenLabel: boolean;
  /** 是否禁用 */
  disabled: boolean;
  /** 是否隐藏 */
  hidden: boolean;
  /** 组件大小 */
  size: ElementSizeEnum | null;
  /** 默认值 */
  defaultValue: any | null;
  /** 校验规则 */
  rules: Array<RuleConfig>;
  /** 自定义样式 */
  customStyles: Array<string>,
  /** 选中时的内容 */
  checkedChildren: string;
  /** 选中时的值 */
  checkedValue: boolean | string | number;
  /** 非选中时的内容 */
  unCheckedChildren: string;
  /** 非选中时的值 */
  unCheckedValue: boolean | string | number;
  /** 创建时 */
  onCreated: string | null;
  /** 挂载时 */
  onMounted: string | null;
  /** 修改时 */
  onChange: string | null;
}
