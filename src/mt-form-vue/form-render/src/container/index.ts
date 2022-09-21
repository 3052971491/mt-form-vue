const modules = import.meta.globEager('./**/*.vue');

const install = (app) => {
  for (const path in modules) {
    const cname = modules[path].default.name;
    app.component(cname, modules[path].default);
  }
}
export default {
  install,
};
