import { createApp } from "vue";
import App from "./App.vue";
// 打包库引入
// import "../lib/style.css";
// 组件引入
// import MtFormVue from "mt-form-vue";
// import MtFormVue from "../lib/mt-form-vue.es.js";
import MtFormVue from "/@/mt-form-vue/index";
// Ant Design of Vue
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

import { installI18n } from "/@/utils/i18n";
async function bootstrap() {
  const app = createApp(App);
  app.use(MtFormVue);
  app.use(Antd);
  installI18n(App);
  app.mount("#app");
}
bootstrap();
