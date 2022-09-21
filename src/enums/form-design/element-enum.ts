/** 枚举-组件数据源类型 */
export enum DataSourceType {
  /** 默认 */
  DEFAULT = 'default',
  /** 自定义 */
  CUSTOM = 'custom',
}

/** 枚举-方向 */
export enum ModeOrientation {
  /** 水平 */
  HORIZONTAL = 'horizontal',
  /** 垂直 */
  VERTICAL = 'vertical',
}

/** 枚举-文本方向 */
export enum Orientation {
  /** 左 */
  LEFT = 'left',
  /** 中 */
  CENTER = 'center',
  /** 右 */
  RIGHT = 'right',
}
/** 枚举-图标位置-左右 */
export enum Position {
  /** 左 */
  LEFT = 'left',
  /** 右 */
  RIGHT = 'right',
}

/** 枚举-图标位置-左中右 */
export enum Position2 {
  /** 左 */
  LEFT = 'left',
  /** 中 */
  CENTER = 'center',
  /** 右 */
  RIGHT = 'right',
}

/** 自定义按钮-事件-类型 */
export enum ButtonCustomEventType {
  CLICK = 'click'
}

/** 自定义按钮-事件-方式 */
export enum ButtonCustomEventMode {
  /** 系统 */
  SYSTEM = 'system',
  /** 自定义 */
  CUSTOM = 'custom',
}

/** 像素单位 */
export enum PixelUnitEnum {
  /** 像素 px */
  PIXEL = 'px',
  /** 百分比 % */
  PERCENTAGE = '%',
}