/** 标签页-子标签页配置 */
export interface tabPaneTyping {
  /** 自定义样式 */
  customStyles: Array<string>,
  /** 标签名 */
  label: string;
  /** 是否隐藏 */
  hidden: boolean;
  /** 是否选中 */
  active: boolean;
  /** 是否禁用 */
  disabled: boolean;
}
