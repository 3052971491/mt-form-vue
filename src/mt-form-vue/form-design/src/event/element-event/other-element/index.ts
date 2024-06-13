import { FormDesignElementTyping } from '/@/types/form-design/index-typing'
import { CustomButtonTyping, TemplateBtnTyping } from "/@/types/form-design/other-element/custom-button";

import { Position2, ButtonCustomEventType, ButtonCustomEventMode } from '/@/enums/form-design/element-enum';
import { ButtonShape, ButtonType } from '/@/enums/form-design/button-enum';
import { ElementSizeEnum } from '/@/enums/form-design/size-enum';

export const others: Array<FormDesignElementTyping> = [
  {
    elementId: "",
    type: 'custom-button',
    name: '自定义按钮',
    iconType: 'custom',
    icon: '',
    formItemFlag: false,
    category: 'element',
    children: [],
    options: {
      customStyles: [],
      hidden: false,
      position: Position2.LEFT,
    } as any,
  },
  {
    elementId: "",
    type: 'template-button',
    name: '按钮',
    iconType: 'custom',
    icon: '',
    formItemFlag: false,
    internal: true,
    category: 'element',
    options: {
      customStyles: [],
      label: '自定义',
      block: false,
      danger: false,
      hidden: false,
      ghost: false,
      disabled: false,
      icon: null,
      loading: false,
      shape: ButtonShape.DEFAULT,
      size: ElementSizeEnum.DEFAULT,
      buttonType: ButtonType.DEFAULT,
      eventConfig: {
        type: ButtonCustomEventType.CLICK,
        mode: ButtonCustomEventMode.CUSTOM,
        eventName: null,
        event: '',
        systemAction: null,
      },
    } as any,
  }
];
