import Vue from 'vue'

// 注册所有物料属性参数与初始值
registerComponentsSchema()

// 获取所有自定义组件schema
function registerComponentsSchema () {
  const files = require.context('@/custom-components', true, /component.json$/)

  let initializing = {}

  files.keys().forEach(key => {
    let config = { ...files(key) }
    let newconfig = initDefaulValue(config)
    initializing[config.component] = newconfig
  })
  Vue.prototype.$componentList = initializing
}

// 初始化组件初始数据
function initDefaulValue (config) {
 /*  let { component, label, icon, fields } = config
  let temp = { component, label, icon }
  setDefaultValue(fields, temp) */
  return config
}

// 递归设置各层级初始数据
/* function setDefaultValue (fields, initializing) {
  for (let key in fields) {
    let { type, value, child } = fields[key]
    if (type == 'object') {
      initializing[key] = {}
      child && setDefaultValue(fields[key].child, initializing[key])
    } else {
      initializing[key] = value
    }
  }
  return initializing
} */