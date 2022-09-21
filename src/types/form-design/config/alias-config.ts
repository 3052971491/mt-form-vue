/**
 * 别名
 * 相关组件: 单选框，多选框，下拉选择，级联选择，树选择
 */
export interface Alias {
  /** 名称别名 */
  label: string;
  /** 值别名 */
  value: string;
  /** 是否禁用别名 */
  disabled?: string;
  /** 子元素别名 */
  children?: string;
}