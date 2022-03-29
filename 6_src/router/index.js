import VueRouter from 'vue-router'
import Vue from 'vue'

//引入pinia
import { createPinia, PiniaVuePlugin } from 'pinia'
import component from '@/store/preview/component'
Vue.use(PiniaVuePlugin)
Vue.use(VueRouter)

const pinia = createPinia()

const router = new VueRouter({
    mode: 'history',
    routes:[
        {
            path:"/",
            redirect:"/edit"
        },
        {
            path:"/edit",
            name:"editor",
            component: ()=>import("@/views/edit"),
            meta: { mode: "editor" }
        },
        {
            path:"/preview",
            name:"preview",
            component: ()=>import("@/views/preview"),
            meta: { mode: "preview" },
            children: [
                {
                  path: 'profile',
                  component:  ()=>import("@/views/preview"),
                }
              ],
        }
    ]

})

router.beforeEach((to, from,next) => {

    if (to.matched.some(record => record.meta.mode == 'preview')) {
        Vue.set(router,"isPreview",true)
        var cmp = component()
        cmp.getLocaComponent()
    }else{
        Vue.set(router,"isPreview",false)
    }

    next()
  })

export  {router,pinia}