import { ElementSizeEnum } from "/@/enums/form-design/size-enum";
import { Type, TabPosition } from "/@/enums/form-design/tabs-enum";
/** 标签页配置 */
export interface tabsTyping {
  /** 自定义样式 */
  customStyles: Array<string>,
  /** 页签的基本样式，可选 line、card editable-card 类型 */
  type: Type;
  /** 页签位置，可选值有 top right bottom left */
  tabPosition: TabPosition;
  /** tab bar 的样式对象 */
  tabBarStyle: object;
  /** tabs 之间的间隙 */
  tabBarGutter: number | null;
  /** 标签居中展示 */
  centered: boolean;
  /** 被隐藏时是否销毁 DOM 结构 */
  destroyInactiveTabPane: boolean;
  /** card 的尺寸 */
  size: ElementSizeEnum | null;
}
