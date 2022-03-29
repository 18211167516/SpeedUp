import { defineStore } from 'pinia'

 const useStore = defineStore({
    id:"ac",
    actions:{
        //获取本地持久化的组件
        getLocaComponent(){
            //实际上这块应该是接口返回的
            this.componentData = JSON.parse(localStorage.getItem("componentData")) ;
        },
        //保存组件
        saveComponent(){
            localStorage.setItem("componentData",JSON.stringify(this.componentData));
        },
        setUserInfo(userInfo){
            this.componentData.userinfo = userInfo
            this.saveComponent()
        }
    },
    state:()=>{
        return {
            componentData:{
                userinfo:{
                    username:null,
                    phone:null,
                    draw_num:0
                },

                containerStyle:{
                    url:"",
                    backgroundImage:"",
                    backgroundRepeat: "no-repeat",
                    backgroundColor:"#fffeee",
                },
                components:[]
            }
        }
    },
    getters:{
        userinfo(state){
            return state.componentData.userinfo
        },
        components(state){
            return state.componentData.components
        },
        containerStyle(state){
            return state.componentData.containerStyle
        }
    }
})

export default useStore