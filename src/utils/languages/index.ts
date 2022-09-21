import { reactive } from "vue";
let locale = reactive({
  lang: localStorage.getItem("mt_form_vue_locale") || "zh-CN",
});

export function createI18n(options: { locale?: string; messages: any }) {
  return {
    messages: options.messages,
    $_t(path: string, ...args: undefined[]) {
      return this.messages[locale.lang].hasOwnProperty(path)
        ? this.messages[locale.lang][path]
        : path;
    },
    setLang(lang: string) {
      locale.lang = lang;
    },
  };
}
