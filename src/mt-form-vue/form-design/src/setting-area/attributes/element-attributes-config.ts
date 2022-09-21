/*
 * @Author: yuanjunjie
 * @Date: 2022-06-14 16:41:40
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2022-08-29 14:31:43
 */

import { attributesTyping } from '/@/types/attributes-typing';

/**
 * 公共组件属性
 */
export const COMMON_ATTRIBUTES: attributesTyping[] = [
  { name: "elementId", editor: "element-id-editor" },
  { name: "__tableName__", editor: "table-name-editor" },
  { name: "__fieldName__", editor: "field-name-editor" },
  { name: "__fieldType__", editor: "field-type-editor" },

  { name: "label", editor: "label-editor" },
  { name: "hiddenLabel", editor: "hidden-label-editor" },
  { name: "allowClear", editor: "allow-clear-editor" },
  // 放表单配置
  { name: "bordered", editor: "bordered-editor" },
  { name: "disabled", editor: "disabled-editor" },
  { name: "hidden", editor: "hidden-editor" },
  { name: "placeholder", editor: "placeholder-editor" },
  { name: "defaultValue", editor: "default-value-editor" },
  { name: "size", editor: "size-editor" },
  { name: "rules", editor: "rules-editor" },
  { name: "alias", editor: "alias-editor" },
  { name: "dataSourceConfig", editor: "data-source-config-editor" },
  { name: "options", editor: "options-editor" },
  { name: 'customStyles', editor: 'custom-styles-editor' },
];
/**
 * 组件专有属性
 * 类型-属性-editor
 */
export const SELF_ATTRIBUTES: attributesTyping[] = [
  // 单行文本
  { type: "input", name: "maxlength", editor: "input-maxlength-editor" },
  { type: "input", name: "showCount", editor: "input-show-count-editor" },
  // 多行文本
  { type: "textarea", name: "maxlength", editor: "input-maxlength-editor" },
  { type: "textarea", name: "showCount", editor: "input-show-count-editor" },
  { type: "textarea", name: "rows", editor: "textarea-rows-editor" },
  // 数字输入框
  {
    type: "input-number",
    name: "addonBefore",
    editor: "input-number-addon-before-editor",
  },
  {
    type: "input-number",
    name: "addonAfter",
    editor: "input-number-addon-after-editor",
  },
  {
    type: "input-number",
    name: "controls",
    editor: "input-number-controls-editor",
  },
  {
    type: "input-number",
    name: "decimalSeparator",
    editor: "input-number-decimal-separator-editor",
  },
  {
    type: "input-number",
    name: "keyboard",
    editor: "input-number-keyboard-editor",
  },
  {
    type: "input-number",
    name: "min",
    editor: "input-number-min-editor",
  },
  {
    type: "input-number",
    name: "max",
    editor: "input-number-max-editor",
  },
  {
    type: "input-number",
    name: "precision",
    editor: "input-number-precision-editor",
  },
  {
    type: "input-number",
    name: "step",
    editor: "input-number-step-editor",
  },
  {
    type: "input-number",
    name: "stringMode",
    editor: "input-number-string-mode-editor",
  },

  // 开关
  {
    type: "switch",
    name: "checkedChildren",
    editor: "switch-checked-children-editor",
  },
  {
    type: "switch",
    name: "checkedValue",
    editor: "switch-checked-value-editor",
  },
  {
    type: "switch",
    name: "unCheckedChildren",
    editor: "switch-un-checked-children-editor",
  },
  {
    type: "switch",
    name: "unCheckedValue",
    editor: "switch-un-checked-value-editor",
  },
  // 单选框
  { type: "radio", name: "optionType", editor: "radio-option-type-editor" },
  { type: "radio", name: "buttonStyle", editor: "radio-button-style-editor" },

  // 多选框

  // 下拉框
  {
    type: "select",
    name: "maxTagCount",
    editor: "select-max-tag-count-editor",
  },
  {
    type: "select",
    name: "maxTagTextLength",
    editor: "select-max-tag-text-length-editor",
  },
  { type: "select", name: "mode", editor: "select-mode-editor" },
  { type: "select", name: "showSearch", editor: "select-show-search-editor" },

  // 时间控件
  { type: "date", name: "startPlaceholder", editor: "date-start-placeholder-editor" },
  { type: "date", name: "endPlaceholder", editor: "date-end-placeholder-editor" },
  { type: "date", name: "dateFormat", editor: "date-date-format-editor" },
  { type: "date", name: "dateValueFormat", editor: "date-date-value-format-editor" },
  { type: "date", name: "showTime", editor: "date-show-time-editor" },
  { type: "date", name: "showNow", editor: "date-show-now-editor" },
  { type: "date", name: "showToday", editor: "date-show-today-editor" },

  // 分割线
  {
    type: "divider",
    name: "text",
    editor: 'divider-text-editor'
  },
  {
    type: "divider",
    name: "dashed",
    editor: 'divider-dashed-editor'
  },
  {
    type: "divider",
    name: "type",
    editor: 'divider-type-editor'
  },
  {
    type: "divider",
    name: "orientation",
    editor: 'divider-orientation-editor'
  },
  {
    type: "divider",
    name: "plain",
    editor: 'divider-plain-editor'
  },
  { type: "divider", name: "orientationMargin", editor: 'divider-orientation-margin-editor' },
  // 评分
  { type: "rate", name: "allowHalf", editor: 'rate-allow-half-editor' },
  { type: "rate", name: "count", editor: 'rate-count-editor' },
  // 静态文本
  { type: "static-text", name: "content", editor: 'static-text-content-editor' },
  // 图片
  { type: "image", name: "width", editor: 'width-editor' },
  { type: "image", name: "height", editor: 'height-editor' },
  { type: "image", name: "fallback", editor: 'image-fallback-editor' },
  { type: "image", name: "alt", editor: 'image-alt-editor' },

  // 栅格行
  { type: "row", name: "children", editor: "row-children-editor" },
  { type: "row", name: "align", editor: "row-align-editor" },
  { type: "row", name: "gutter", editor: "row-gutter-editor" },
  { type: "row", name: "justify", editor: "row-justify-editor" },
  { type: "row", name: "wrap", editor: "row-wrap-editor" },
  // 栅格列
  { type: "col", name: "flex", editor: "col-flex-editor" },
  { type: "col", name: "offset", editor: "col-offset-editor" },
  { type: "col", name: "order", editor: "col-order-editor" },
  { type: "col", name: "pull", editor: "col-pull-editor" },
  { type: "col", name: "push", editor: "col-push-editor" },
  { type: "col", name: "span", editor: "col-span-editor" },
  // 卡片
  { type: "card", name: "hoverable", editor: "card-hoverable-editor" },
  // 标签页
  { type: "tabs", name: "children", editor: "tabs-children-editor" },
  { type: "tabs", name: "type", editor: "tabs-type-editor" },
  { type: "tabs", name: "tabPosition", editor: "tabs-tab-position-editor" },
  { type: "tabs", name: "tabBarGutter", editor: "tabs-tab-bar-gutter-editor" },
  { type: "tabs", name: "centered", editor: "tabs-centered-editor" },
  {
    type: "tabs",
    name: "destroyInactiveTabPane",
    editor: "tabs-destroy-inactive-tab-pane-editor",
  },
  // 折叠面板
  { type: "collapse", name: "children", editor: "collapse-children-editor" },
  { type: "collapse", name: "accordion", editor: "collapse-accordion-editor" },
  {
    type: "collapse",
    name: "destroyInactivePanel",
    editor: "collapse-destroy-inactive-panel-editor",
  },
  {
    type: "collapse",
    name: "expandIconPosition",
    editor: "collapse-expand-icon-position-editor",
  },
  { type: "collapse", name: "ghost", editor: "collapse-ghost-editor" },

  // 其他组件

  // 自定义按钮-容器
  { type: "custom-button", name: 'children', editor: 'custom-button-children-editor' },
  { type: "custom-button", name: 'position', editor: 'custom-button-position-editor' },
  // 自定义按钮-按钮
  { type: "template-button", name: 'block', editor: 'template-button-block-editor' },
  { type: "template-button", name: 'danger', editor: 'template-button-danger-editor' },
  { type: "template-button", name: 'ghost', editor: 'template-button-ghost-editor' },
  { type: "template-button", name: 'icon', editor: 'template-button-icon-editor' },
  { type: "template-button", name: 'loading', editor: 'template-button-loading-editor' },
  { type: "template-button", name: 'shape', editor: 'template-button-shape-editor' },
  { type: "template-button", name: 'buttonType', editor: 'template-button-type-editor' },
  { type: "template-button", name: 'eventConfig', editor: 'template-button-event-config-editor' },
];
