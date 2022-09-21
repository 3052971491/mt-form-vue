import { ElementSizeEnum } from "/@/enums/form-design/size-enum";
/** 卡片配置 */
export interface cardTyping {
  /** 自定义样式 */
  customStyles: Array<string>,
  /** 卡片标题 */
  label: string;
  /** 自定义标题区域样式 */
  headStyle: object;
  /** 内容区域自定义样式 */
  bodyStyle: object;
  /** 是否有边框 */
  bordered: boolean;
  /** 鼠标移过时可浮起 */
  hoverable: boolean;
  /** card 的尺寸 */
  size: ElementSizeEnum | null;
}
