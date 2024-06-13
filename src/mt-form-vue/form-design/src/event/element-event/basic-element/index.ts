/*
 * @Author: yuanjunjie
 * @Date: 2022-06-13 18:30:23
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2022-08-29 15:06:05
 */
import { FormDesignElementTyping } from '/@/types/form-design/index-typing'
import { textareaTyping } from "/@/types/form-design/basic-element/textarea";
import { switchTyping } from "/@/types/form-design/basic-element/switch";
import { inputNumberTyping } from "/@/types/form-design/basic-element/input-number";
import { radioTyping } from "/@/types/form-design/basic-element/radio";
import { checkboxTyping } from "/@/types/form-design/basic-element/checkbox";
import { selectTyping } from "/@/types/form-design/basic-element/select";
import { dividerTyping } from "/@/types/form-design/basic-element/divider";
import { dateTyping } from "/@/types/form-design/basic-element/date";
import { rateTyping } from "/@/types/form-design/basic-element/rate";
import { colorPickerTyping } from "/@/types/form-design/basic-element/color-picker";
import { StaticTextTyping } from "/@/types/form-design/basic-element/static-text";
import { HtmlTextTyping } from "/@/types/form-design/basic-element/html-text";
import { ImageTyping } from '/@/types/form-design/basic-element/image';
import { OptionType, ButtonStyle } from '/@/enums/form-design/radio-enum';
import { Orientation, ModeOrientation } from '/@/enums/form-design/element-enum';
import { PixelUnitEnum } from "/@/enums/form-design/element-enum";
export const basic: Array<FormDesignElementTyping> = [
  {
    elementId: "",
    type: "input",
    category: "element",
    name: "单行文本",
    iconType: "custom",
    icon: "",
    formItemFlag: true,
    options: {
      __tableName__: null,
      __fieldName__: null,

      label: "单行文本",
      hiddenLabel: false,
      allowClear: false,
      bordered: true,
      disabled: false,
      hidden: false,
      size: null,
      placeholder: "请输入",
      defaultValue: null,
      rules: [],
      customStyles: [],

      maxlength: null,
      showCount: false,

      onCreated: "",
      onMounted: "",
      onChange: "",
    } as any,
  },
  {
    elementId: "",
    type: "textarea",
    category: "element",
    name: "多行文本",
    iconType: "custom",
    icon: "",
    formItemFlag: true,
    options: {
      __tableName__: null,
      __fieldName__: null,

      label: "多行文本",
      hiddenLabel: false,
      allowClear: false,
      bordered: true,
      disabled: false,
      hidden: false,
      size: null,
      placeholder: "请输入",
      defaultValue: null,
      rules: [],
      customStyles: [],

      maxlength: null,
      showCount: false,

      autoSize: false,
      rows: 4,
      onCreated: "",
      onMounted: "",
      onChange: "",
    } as any,
  },
  {
    elementId: "",
    type: "input-number",
    category: "element",
    name: "数字输入框",
    iconType: "custom",
    icon: "",
    formItemFlag: true,
    options: {
      __tableName__: null,
      __fieldName__: null,

      label: "数字输入框",
      hiddenLabel: false,
      bordered: true,
      disabled: false,
      hidden: false,
      size: null,
      placeholder: "请输入",
      defaultValue: null,
      rules: [],
      customStyles: [],

      addonAfter: null,
      addonBefore: null,
      controls: true,
      decimalSeparator: null,
      keyboard: true,
      max: null,
      min: null,
      precision: 0,
      step: 1,
      stringMode: false,

      onCreated: "",
      onMounted: "",
      onChange: "",
    } as any,
  },
  {
    elementId: "",
    type: "switch",
    category: "element",
    name: "开关",
    iconType: "custom",
    icon: "",
    formItemFlag: true,
    options: {
      __tableName__: null,
      __fieldName__: null,

      label: "开关",
      hiddenLabel: false,
      allowClear: false,
      bordered: false,
      disabled: false,
      hidden: false,
      size: null,
      placeholder: "请输入",
      defaultValue: null,
      rules: [],
      customStyles: [],
      checkedChildren: "",
      checkedValue: true,
      unCheckedChildren: "",
      unCheckedValue: false,

      onCreated: "",
      onMounted: "",
      onChange: "",
    } as any,
  },
  {
    elementId: "",
    type: "radio",
    category: "element",
    name: "单选框",
    iconType: "custom",
    icon: "",
    formItemFlag: true,
    options: {
      __tableName__: null,
      __fieldName__: null,

      label: "单选框",
      hiddenLabel: false,
      disabled: false,
      hidden: false,
      size: null,
      defaultValue: null,
      rules: [],
      customStyles: [],

      alias: {
        label: "label",
        value: "value",
        disabled: "disabled"
      },
      buttonStyle: ButtonStyle.OUTLINE,
      optionType: OptionType.DEFAULT,
      dataSourceConfig: {
        type: "default",
        api: null,
        options: [
          {
            label: "选项一",
            value: "1",
            disabled: false,
          },
          {
            label: "选项二",
            value: "2",
            disabled: false,
          },
        ],
      },

      onCreated: "",
      onMounted: "",
      onChange: "",
    } as any,
  },
  {
    elementId: "",
    type: "checkbox",
    category: "element",
    name: "多选框",
    iconType: "custom",
    icon: "",
    formItemFlag: true,
    options: {
      __tableName__: null,
      __fieldName__: null,

      label: "多选框",
      hiddenLabel: false,
      disabled: false,
      hidden: false,
      size: null,
      defaultValue: null,
      rules: [],
      customStyles: [],

      alias: {
        label: "label",
        value: "value",
        disabled: "disabled"
      },
      dataSourceConfig: {
        type: "default",
        api: null,
        options: [
          {
            label: "选项一",
            value: "1",
            disabled: false,
          },
          {
            label: "选项二",
            value: "2",
            disabled: false,
          },
        ],
      },

      onCreated: "",
      onMounted: "",
      onChange: "",
    } as any,
  },
  {
    elementId: "",
    type: "select",
    category: "element",
    name: "下拉框",
    iconType: "custom",
    icon: "",
    formItemFlag: true,
    options: {
      __tableName__: null,
      __fieldName__: null,

      label: "下拉框",
      hiddenLabel: false,
      allowClear: false,
      bordered: true,
      disabled: false,
      hidden: false,
      size: null,
      placeholder: "请选择",
      defaultValue: null,
      rules: [],
      customStyles: [],

      alias: {
        label: "label",
        value: "value",
        disabled: "disabled"
      },
      dataSourceConfig: {
        type: "default",
        api: null,
        options: [
          {
            label: "选项一",
            value: "1",
            disabled: false,
          },
          {
            label: "选项二",
            value: "2",
            disabled: false,
          },
        ],
      },
      maxTagCount: null,
      maxTagTextLength: null,
      mode: 'default',
      showSearch: false,

      onCreated: "",
      onMounted: "",
      onChange: "",
    } as any,
  },
  {
    elementId: "",
    type: "divider",
    category: "element",
    name: "分割线",
    iconType: "custom",
    icon: "",
    formItemFlag: false,
    options: {
      customStyles: [],
      dashed: false,
      orientation: Orientation.CENTER,
      text: "",
      orientationMargin: "",
      plain: false,
      type: ModeOrientation.HORIZONTAL,
      onCreated: "",
      onMounted: "",
      onChange: "",
    } as dividerTyping,
  },
  {
    elementId: "",
    type: "date",
    category: "element",
    name: "时间选择",
    iconType: "custom",
    icon: "",
    formItemFlag: true,
    options: {
      __tableName__: null,
      __fieldName__: null,

      label: "时间选择",
      hiddenLabel: false,
      allowClear: false,
      bordered: true,
      disabled: false,
      hidden: false,
      size: null,
      placeholder: "请选择",
      defaultValue: null,
      rules: [],
      customStyles: [],

      dateConfig: {
        type: 'time-picker'
      },
      dateFormat: 'HH:mm:ss',
      dateValueFormat: 'HH:mm:ss',
      showNow: false,

      onCreated: "",
      onMounted: "",
      onChange: "",
    } as dateTyping,
  },
  {
    elementId: "",
    type: "date",
    category: "element",
    name: "时间范围选择",
    iconType: "custom",
    icon: "",
    formItemFlag: true,
    options: {
      __tableName__: null,
      __fieldName__: null,

      label: "时间范围选择",
      hiddenLabel: false,
      allowClear: false,
      bordered: true,
      disabled: false,
      hidden: false,
      size: null,
      startPlaceholder: "开始时间",
      endPlaceholder: "结束时间",
      defaultValue: null,
      rules: [],
      customStyles: [],

      dateConfig: {
        type: 'time-range-picker'
      },
      dateFormat: 'HH:mm:ss',
      dateValueFormat: 'HH:mm:ss',
      showNow: false,

      onCreated: "",
      onMounted: "",
      onChange: "",
    } as dateTyping,
  },
  {
    elementId: "",
    type: "date",
    category: "element",
    name: "日期选择",
    iconType: "custom",
    icon: "",
    formItemFlag: true,
    options: {
      __tableName__: null,
      __fieldName__: null,

      label: "日期选择",
      hiddenLabel: false,
      allowClear: false,
      bordered: true,
      disabled: false,
      hidden: false,
      size: null,
      placeholder: "请选择",
      defaultValue: null,
      rules: [],
      customStyles: [],

      dateConfig: {
        type: 'date-picker'
      },
      dateFormat: 'YYYY-MM-DD HH:mm:ss',
      dateValueFormat: 'YYYY-MM-DD HH:mm:ss',
      showNow: false,
      showTime: false,

      onCreated: "",
      onMounted: "",
      onChange: "",
    } as dateTyping,
  },
  {
    elementId: "",
    type: "date",
    category: "element",
    name: "时间范围选择",
    iconType: "custom",
    icon: "",
    formItemFlag: true,
    options: {
      __tableName__: null,
      __fieldName__: null,

      label: "时间范围选择",
      hiddenLabel: false,
      allowClear: false,
      bordered: true,
      disabled: false,
      hidden: false,
      size: null,
      startPlaceholder: "开始时间",
      endPlaceholder: "结束时间",
      defaultValue: null,
      rules: [],
      customStyles: [],

      dateConfig: {
        type: 'range-picker'
      },
      dateFormat: 'YYYY-MM-DD HH:mm:ss',
      dateValueFormat: 'YYYY-MM-DD HH:mm:ss',
      showNow: false,
      showTime: false,

      onCreated: "",
      onMounted: "",
      onChange: "",
    } as any,
  },
  {
    elementId: "",
    type: "rate",
    category: "element",
    name: "评分",
    iconType: "custom",
    icon: "",
    formItemFlag: true,
    options: {
      __tableName__: null,
      __fieldName__: null,

      label: "评分",
      hiddenLabel: false,
      allowClear: false,
      disabled: false,
      hidden: false,
      defaultValue: null,
      rules: [],
      customStyles: [],

      allowHalf: false,
      count: 5,
      tooltips: [],

      onCreated: "",
      onMounted: "",
      onChange: "",
    } as any,
  },
  {
    elementId: "",
    type: "color-picker",
    category: "element",
    name: "颜色",
    iconType: "custom",
    icon: "",
    formItemFlag: true,
    options: {
      __tableName__: null,
      __fieldName__: null,

      label: "颜色",
      hiddenLabel: false,
      disabled: false,
      hidden: false,
      defaultValue: "#000000",
      rules: [],
      customStyles: [],

      onCreated: "",
      onMounted: "",
      onChange: "",
    } as colorPickerTyping,
  },
  {
    elementId: "",
    type: "static-text",
    category: "element",
    name: "静态文本",
    iconType: "custom",
    icon: "",
    formItemFlag: false,
    options: {
      hidden: false,
      customStyles: [],
      content: '这是一段文本',

      onCreated: "",
      onMounted: "",
    } as any,
  },
  {
    elementId: "",
    type: "html-text",
    category: "element",
    name: "Html文本",
    iconType: "custom",
    icon: "",
    formItemFlag: true,
    options: {
      __tableName__: null,
      __fieldName__: null,
      
      hidden: false,
      customStyles: [],
      defaultValue: "<span>这是一段Html文本</span>",

      onCreated: "",
      onMounted: "",
    } as HtmlTextTyping,
  },
  {
    elementId: "",
    type: "image",
    category: "element",
    name: "图片",
    iconType: "custom",
    icon: "",
    formItemFlag: true,
    options: {
      __tableName__: null,
      __fieldName__: null,

      label: "图片",
      hiddenLabel: false,
      hidden: false,
      defaultValue: null,
      customStyles: [],

      width: '200',
      widthUnit: PixelUnitEnum.PIXEL,
      height: '200',
      heightUnit: PixelUnitEnum.PIXEL,
      fallback: null,
      alt: null,

      onCreated: "",
      onMounted: "",
    } as ImageTyping,
  },
];
