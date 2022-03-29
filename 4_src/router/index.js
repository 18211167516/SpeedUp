import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter)

const router = new VueRouter({
    routes:[
        {
            path:"/",
            redirect:"/edit"
        },
        {
            path:"/edit",
            component: ()=>import("@/views/edit")
        },
        {
            path:"/preview",
            component: ()=>import("@/views/preview"),
        }
    ]

})

export default router