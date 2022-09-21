/*
 * @Author: yuanjunjie
 * @Date: 2022-06-14 17:01:24
 * @Last Modified by: yuanjunjie
 * @Last Modified time: 2022-06-14 17:11:43
 */

/**
 * 表单属性编辑器
 */
const fromEditors = {};
const fromModules = import.meta.globEager('./form-attributes/*.vue');
for (const path in fromModules) {
  const name = fromModules[path].default.name;
  fromEditors[name] = fromModules[path].default;
}

/**
 * 组件属性编辑器
 */
const elementEditors = {};
const elementModules = import.meta.globEager('./element-attributes/**/*.vue');
for (const path in elementModules) {
  const name = elementModules[path].default.name;
  elementEditors[name] = elementModules[path].default;
}

/**
 * 函数属性编辑器
 */
const eventEditors = {};
const eventModules = import.meta.globEager('./event-handler/*.vue');
for (const path in eventModules) {
  const name = eventModules[path].default.name;
  eventEditors[name] = eventModules[path].default;
}

export { fromEditors, elementEditors, eventEditors };
