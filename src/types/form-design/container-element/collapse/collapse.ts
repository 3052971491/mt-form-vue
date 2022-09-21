import { Position } from '/@/enums/form-design/element-enum';
/** 折叠面板配置 */
export interface collapseTyping {
  /** 自定义样式 */
  customStyles: Array<string>;
  /** 手风琴模式 */
  accordion: boolean;
  /** 销毁折叠隐藏的面板 */
  destroyInactivePanel: boolean;
  /** 设置图标位置： left, right */
  expandIconPosition: Position;
  /** 使折叠面板透明且无边框 */
  ghost: boolean;
}
