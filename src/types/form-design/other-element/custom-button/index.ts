import { Position2, ButtonCustomEventType, ButtonCustomEventMode } from '/@/enums/form-design/element-enum';
import { ButtonShape, ButtonType } from '/@/enums/form-design/button-enum';
import { ElementSizeEnum } from '/@/enums/form-design/size-enum';
/** 自定义按钮-容器 */
export interface CustomButtonTyping {
  /** 自定义样式 */
  customStyles: Array<string>,
  /** 是否隐藏 */
  hidden: boolean;
  /** 对齐方式 */
  position: Position2;
}

/** 自定义按钮-按钮 */
export interface TemplateBtnTyping {
  /** 自定义样式 */
  customStyles: Array<string>,
  /** 名称 */
  label: string | null;
  /** 将按钮宽度调整为其父宽度的选项 */
  block: boolean;
  /** 设置危险按钮 */
  danger: boolean;
  /** 按钮失效状态 */
  disabled: boolean;
  /** 隐藏 */
  hidden: boolean;
  /** 幽灵属性，使按钮背景透明 */
  ghost: boolean;
  /** 设置按钮的图标类型 */
  icon: string | null;
  /** 设置按钮载入状态 */
  loading: boolean;
  /** 设置按钮形状 */
  shape: ButtonShape;
  /** 设置按钮大小 */
  size: ElementSizeEnum | null;
  /** 设置按钮类型 */
  buttonType: ButtonType;
  /** 事件配置 */
  eventConfig: ButtonCustomEventConfig;
}

/** 自定义按钮配置 */
export interface ButtonCustomEventConfig {
  /** 事件类型 */
  type: ButtonCustomEventType | null;
  /** 方式: 系统(system) 自定义(custom) */
  mode: ButtonCustomEventMode;
  /** 预留字段: 事件名称 */
  eventName: string | null;
  /** 事件 */
  event: string | null;
  systemAction: SystemAction | null;
}

/** 自定义按钮-系统行为 */
export interface SystemAction {
  /** 自定义按钮-系统行为-类型 */
  type: string | null;
  /** 自定义按钮-系统行为-名称 */
  name: string | null;
}