import { Orientation, ModeOrientation } from '/@/enums/form-design/element-enum';
/** 分割线配置 */
export interface dividerTyping {
  /** 自定义样式 */
  customStyles: Array<string>,
  /** 是否虚线 */
  dashed: boolean;
  /** 分割线文本内容 */
  text: string | null;
  /** 分割线标题的位置 left right center */
  orientation: Orientation;
  /**
   * 标题和最近 left/right 
   * 边框之间的距离，去除了分割线，
   * 同时 orientation 必须为 left 或 right
   */
  orientationMargin: string | null;
  /** 文字是否显示为普通正文样式 */
  plain: boolean;
  /** 水平还是垂直类型 horizontal vertical */
  type: ModeOrientation;
  /** 创建时 */
  onCreated: string | null;
  /** 挂载时 */
  onMounted: string | null;
  /** 修改时 */
  onChange: string | null;
}
