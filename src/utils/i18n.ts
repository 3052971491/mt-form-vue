import { createI18n } from "./languages/index";
// antd 语言资源
import enUSAntd from "ant-design-vue/es/locale/en_US";
import zhCNAntd from "ant-design-vue/es/locale/zh_CN";
// 公共 语言资源
import enLocale from "../locales/lang/en_US";
import zhLocale from "../locales/lang/zh_CN";

import en_US_element_area from "../locales/lang/en_US_element_area";
import zh_CN_element_area from "../locales/lang/zh_CN_element_area";

import en_US_form_area from "../locales/lang/en_US_form_area";
import zh_CN_form_area from "../locales/lang/zh_CN_form_area";

import en_US_setting_area from "../locales/lang/en_US_setting_area";
import zh_CN_setting_area from "../locales/lang/zh_CN_setting_area";

import en_US_toolbar_area from "../locales/lang/en_US_toolbar_area";
import zh_CN_toolbar_area from "../locales/lang/zh_CN_toolbar_area";

// 语言资源
const langResources = {
  "en-US": {
    ...enUSAntd,
    ...enLocale,
    ...en_US_element_area,
    ...en_US_form_area,
    ...en_US_setting_area,
    ...en_US_toolbar_area,
  },

  "zh-CN": {
    ...zhCNAntd,
    ...zhLocale,
    ...zh_CN_element_area,
    ...zh_CN_form_area,
    ...zh_CN_setting_area,
    ...zh_CN_toolbar_area,
  },
};

// 初始化
const i18n = createI18n({
  locale: localStorage.getItem("mt_form_vue_locale") || "zh-CN",
  messages: langResources,
});

// 获取语言环境
export const getLocale = function () {
  return localStorage.getItem("mt_form_vue_locale") || "zh-CN";
};

// 手动更换语言
export const manualChangeLocale = function (langName: string) {
  i18n.setLang(langName);
  localStorage.setItem("mt_form_vue_locale", langName);
};

// 自动更换语言
export const automaticChangeLocale = function () {
  const lang = getLocale() == "zh-CN" ? "en-US" : "zh-CN";
  manualChangeLocale(lang);
};

export const t = function (key: string) {
  return i18n.$_t(key);
};

// 注册
export const installI18n = (app) => {};
