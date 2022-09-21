import { RuleConfig } from "/@/types/form-design/config/rule-config";
import { ElementSizeEnum } from '/@/enums/form-design/size-enum';
/** 数字输入框配置 */
export interface inputNumberTyping {
  /** 表名 */
  __tableName__: string | null;
  /** 字段名 */
  __fieldName__: string | null;
  /** label名称 */
  label: string | null;
  /** 是否显示label */
  hiddenLabel: boolean;
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
  defaultValue: number | null;
  /** 校验规则 */
  rules: Array<RuleConfig>;
  /** 自定义样式 */
  customStyles: Array<string>,
  /** 带标签的 input，设置后置标签 */
  addonAfter: string | null;
  /** 带标签的 input，设置前置标签 */
  addonBefore: string | null;
  /** 是否显示增减按钮 */
  controls: boolean;
  /** 小数点 */
  decimalSeparator: string | null;
  /** 是否启用键盘快捷行为 */
  keyboard: boolean;
  /** 最大值 */
  max: number | null;
  /** 最小值 */
  min: number | null;
  /** 数值精度 */
  precision: number | null;
  /** 每次改变步数，可以为小数 */
  step: string | number | null;
  /** 字符值模式，开启后支持高精度小数。同时 change 事件将返回 string 类型 */
  stringMode: boolean;
  /** 创建时 */
  onCreated: string | null;
  /** 挂载时 */
  onMounted: string | null;
  /** 修改时 */
  onChange: string | null;
}
