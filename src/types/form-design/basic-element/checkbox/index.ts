import { RuleConfig } from '/@/types/form-design/config/rule-config';
import { ElementDataSourceConfig } from '/@/types/form-design/config/element-data-source-config';
import { Alias } from '/@/types/form-design/config/Alias-config'
import { ElementSizeEnum } from '/@/enums/form-design/size-enum';
/** 多选框配置 */
export interface checkboxTyping {
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
  /** 默认值*/
  defaultValue: any | null;
  /** 校验规则 */
  rules: RuleConfig[];
  /** 自定义样式 */
  customStyles: Array<string>,
  /** 子元素别名 */
  alias: Alias;
  /** 数据来源配置 */
  dataSourceConfig: ElementDataSourceConfig;
  /** 创建时 */
  onCreated: string | null;
  /** 挂载时 */
  onMounted: string | null;
  /** 修改时 */
  onChange: string | null;
}
