import Vue from 'vue'
// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

export const routers = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath);
  if(!value.default)return modules;

  Vue.filter(moduleName, value.default);
  modules.push(value.default)



  return modules

}, [])

console.info("filters count is %s", routers.length)




