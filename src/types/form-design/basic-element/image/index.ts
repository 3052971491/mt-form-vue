import { PixelUnitEnum } from "/@/enums/form-design/element-enum";
/** 图片配置 */
export interface ImageTyping {
  /** 表名 */
  __tableName__: string | null;
  /** 字段名 */
  __fieldName__: string | null;
  /** label名称 */
  label: string | null;
  /** 是否显示label */
  hiddenLabel: boolean;
  /** 是否隐藏 */
  hidden: boolean;
  /** 默认值 */
  defaultValue: string | null;
  /** 自定义样式 */
  customStyles: Array<string>,
  /** 图像宽度 */
  width: string | number | null;
  /** 宽度单位 */
  widthUnit: PixelUnitEnum;
  /** 图像高度 */
  height: string | number | null;
  /** 高度单位 */
  heightUnit: PixelUnitEnum;
  /** 加载失败容错地址 */
  fallback: string | null;
  /** 图像描述 */
  alt: string | null;
  /** 创建时 */
  onCreated: string | null;
  /** 挂载时 */
  onMounted: string | null;
}
