import Vue from 'vue'
import App from './App.vue'
//使用element ui
import {Button,Tabs,TabPane,Form,FormItem,Upload,ColorPicker,Input,Select,Option,Tag} from 'element-ui';
Vue.use(Button).use(Tabs).use(TabPane).use(Form).use(FormItem).use(Upload).use(ColorPicker).use(Input).use(Select).use(Option).use(Tag);
import 'element-ui/lib/theme-chalk/index.css';

//引入vant的组件

import { ActionSheet,Form as vFrom,Field, CellGroup,Button as vButton,Toast,Overlay} from 'vant';
Vue.use(ActionSheet).use(vFrom).use(Field).use(CellGroup).use(vButton).use(Toast).use(Overlay)

// 全局组件注册
import '@/utils/globalRegister.js'
// 物料属性注册
import '@/utils/registerSchema.js'
// 全局方法注册
import '@/utils/globalRegisterFunc.js'

import '@/assets/iconfont/iconfont.css'

Vue.config.productionTip = false

import {router,pinia} from '@/router/index'

new Vue({
  router,
  render: h => h(App),
  pinia,
  beforeCreate(){
    Vue.prototype.$bus=this
  }
}).$mount('#app')

