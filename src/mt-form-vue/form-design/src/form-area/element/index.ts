const comps = {};

const modules = import.meta.globEager('./**/*.vue');

for (const path in modules) {
  const cname = modules[path].default.name;
  comps[cname] = modules[path].default;
}

export default comps;
