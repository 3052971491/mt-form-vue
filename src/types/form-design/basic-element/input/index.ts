import { RuleConfig } from "/@/types/form-design/config/rule-config";
import { ElementSizeEnum } from '/@/enums/form-design/size-enum';
/** 输入框配置 */
export interface inputTyping {
  /** 表名 */
  __tableName__: string | null;
  /** 字段名 */
  __fieldName__: string | null;
  /** label名称 */
  label: string | null;
  /** 是否显示label */
  hiddenLabel: boolean;
  /** 是否显示清除按钮 */
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
  placeholder: string | null;
  /** 默认值 */
  defaultValue: string | null;
  /** 校验规则 */
  rules: Array<RuleConfig>;
  /** 自定义样式 */
  customStyles: Array<string>,
  /** 最大长度 */
  maxlength: number | null;
  /** 是否展示字数 */
  showCount: boolean;
  /** 创建时 */
  onCreated: string | null;
  /** 挂载时 */
  onMounted: string | null;
  /** 修改时 */
  onChange: string | null;
}
