/** 折叠面板-子面板配置 */
export interface collapsePanelTyping {
  /** 自定义样式 */
  customStyles: Array<string>;
  /** 被隐藏时是否渲染 DOM 结构 */
  forceRender: boolean;
  /** 是否展示当前面板上的箭头 */
  showArrow: boolean;
}
