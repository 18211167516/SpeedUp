import Vue from 'vue'
import App from './App.vue'
//使用element ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//引入vant的组件

import { ActionSheet,Form, Field, CellGroup,Button} from 'vant';
Vue.use(ActionSheet).use(Form).use(Field).use(CellGroup).use(Button)


// 全局组件注册
import '@/utils/globalRegister.js'
// 物料属性注册
import '@/utils/registerSchema.js'
// 全局方法注册
import '@/utils/globalRegisterFunc.js'

import '@/assets/iconfont/iconfont.css'

Vue.config.productionTip = false

import {router,pinia} from './router'

Vue.directive('login', {
  bind: function (el, binding, vnode) {
    console.log("指令初始化",el,binding,vnode);
  },
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {

    console.log("插入dom",el);
  },
  updated(el,binding) {
    console.log("更新dom",el,binding);
  },
  componentUpdated(el,binding) {
    console.log("组件更新dom",el,binding);
  },
  unbind(el,binding){
    console.log("解绑的时候",el,binding);
  }
})

new Vue({
  router,
  render: h => h(App),
  pinia,
  beforeCreate(){
    Vue.prototype.$bus=this
  }
}).$mount('#app')

