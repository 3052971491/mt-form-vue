import { App } from "vue";

// 引入表单设计器，渲染器
import FormDesign from "./form-design/src/form-design.vue";
import FormRender from "./form-render/src/form-render.vue";

// 注册容器组件
import ContainerElementsDesign from "./form-design/src/form-area/container";
import ContainerElementsRender from "./form-render/src/container/index";

// 多语言
import { installI18n } from "/@/utils/i18n";

const components = [FormDesign, FormRender];

/**
 * 单个注册
 * @param app 
 */

FormDesign.install = function (app: App) {
  installI18n(app);
  ContainerElementsDesign.install(app);
  app.component('mt-' + FormDesign?.__name ?? '');
};

FormRender.install = function (app: App) {
  installI18n(app);
  ContainerElementsRender.install(app);
  app.component('mt-' + FormDesign?.__name ?? '');
};

/**
 * 
 * @param app 批量注册
 */
const install = (app: App): void => {
  installI18n(app);
  ContainerElementsDesign.install(app);
  ContainerElementsRender.install(app);
  components.forEach((component: any) => {
    app.component(`mt-${component.__name}`, component);
  });
};

export * from "/@/implements/service-proxies";
export { install, FormDesign, FormRender };

export default {
  install,
  FormDesign, 
  FormRender
};
