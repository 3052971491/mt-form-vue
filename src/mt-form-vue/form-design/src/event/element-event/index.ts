/*
 * @Author: yuanjunjie
 * @Date: 2022-06-13 18:30:17
 * @Last Modified by:   yuanjunjie
 * @Last Modified time: 2022-06-13 18:30:17
 */
import { basic } from './basic-element/index';
import { business } from './business-element/index';
import { container } from './container-element/index';
import { others } from './other-element/index';
import { defaultFormConfig } from './form';
/**
 * 基础组件
 */
export const basicElement = basic;
/**
 * 基础组件长度
 */
export const basicElementLength = basicElement.length;

/**
 * 业务组件
 */
export const businessElement = business;
/**
 * 业务组件长度
 */
export const businessElementLength = businessElement.length;

/**
 * 容器组件
 */
export const containerElement = container;
/**
 * 容器组件长度
 */
export const containerElementLength = containerElement.length;

/**
 * 其他组件
 */
 export const otherElement = others;
 /**
  * 其他组件长度
  */
 export const otherElementLength = otherElement.length;

/**
 * 表单配置
 */
export const formConfig = defaultFormConfig;
