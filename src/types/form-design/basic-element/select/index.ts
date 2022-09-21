import { RuleConfig } from '/@/types/form-design/config/rule-config';
import { ElementDataSourceConfig } from '/@/types/form-design/config/element-data-source-config';
import { Alias } from '/@/types/form-design/config/Alias-config';
import { ElementSizeEnum } from '/@/enums/form-design/size-enum';
import { Mode } from '/@/enums/form-design/select-enum';
/** 下拉框配置 */
export interface selectTyping {
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
  /** 最多显示多少个 tag */
  maxTagCount: number | null;
  /** 最大显示的 tag 文本长度 */
  maxTagTextLength: number | null;
  /** 设置 Select 的模式为多选或标签 */
  mode: Mode;
  /** 使单选模式可搜索 */
  showSearch: boolean;
  /** 创建时 */
  onCreated: string | null;
  /** 挂载时 */
  onMounted: string | null;
  /** 修改时 */
  onChange: string | null;
}
