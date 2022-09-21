import { RuleConfig } from '/@/types/form-design/config/rule-config';
import { ElementDataSourceConfig } from '/@/types/form-design/config/element-data-source-config';
import { Alias } from '/@/types/form-design/config/Alias-config';
import { ElementSizeEnum } from '/@/enums/form-design/size-enum';
import { OptionType, ButtonStyle } from '/@/enums/form-design/radio-enum';
/** 单选框配置 */
export interface radioTyping {
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
  /** 子元素别名 */
  alias: Alias;
  /** 数据来源配置 */
  dataSourceConfig: ElementDataSourceConfig;
  /** RadioButton 的风格样式，目前有描边和填色两种风格 */
  buttonStyle: ButtonStyle;
  /** 用于设置 Radio options 类型 */
  optionType: OptionType;
  /** 创建时 */
  onCreated: string | null;
  /** 挂载时 */
  onMounted: string | null;
  /** 修改时 */
  onChange: string | null;
}
