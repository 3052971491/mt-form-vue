/*
 * @Author: yuanjunjie
 * @Date: 2022-06-14 16:41:40
 * @Last Modified by: yuanjunjie
 * @Last Modified time: 2022-06-14 17:22:26
 */

import { attributesTyping } from '/@/types/attributes-typing';

/**
 * 公共组件属性
 */
export const COMMON_ATTRIBUTES: attributesTyping[] = [
  { name: 'formId', editor: 'form-id-editor' },
  { name: 'name', editor: 'name-editor' },
  { name: 'size', editor: 'size-editor' },
  { name: 'hideRequiredMark', editor: 'hide-required-mark-editor' },
  { name: 'labelAlign', editor: 'label-align-editor' },
  { name: 'labelWidth', editor: 'label-width-editor' },
  { name: 'layout', editor: 'layout-editor' },
  { name: 'customStyles', editor: 'custom-styles-editor' },
];
/**
 * 组件专有属性
 */
export const SELF_ATTRIBUTES: attributesTyping[] = [];
/**
 * 钩子属性
 */
export const FUNCTIONS_ATTRIBUTES: attributesTyping[] = [];
