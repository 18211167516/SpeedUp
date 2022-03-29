import Vue from 'vue'
import App from './App.vue'
import router from './router'
//使用element ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 全局组件注册
import '@/utils/globalRegister.js'
// 物料属性注册
import '@/utils/registerSchema.js'
// 全局方法注册
import '@/utils/globalRegisterFunc.js'
// 引入icon
import '@/assets/iconfont/iconfont.css'

//使用pinia插件
import { createPinia, PiniaVuePlugin } from 'pinia'
Vue.use(PiniaVuePlugin)
const pinia = createPinia()

Vue.config.productionTip = false

new Vue({
  router,
  pinia,
  render: h => h(App),
}).$mount('#app')