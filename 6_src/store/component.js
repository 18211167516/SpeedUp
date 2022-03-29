import { defineStore } from 'pinia'
import {  Message } from 'element-ui'

 const useStore = defineStore({
    id:"editorData",
    actions:{
        //获取编辑区元素
        getEditor(){
            return this.editor
        },
        //设置当前组件
        setCurComponent({component, index}) {
            this.curComponent = component
            this.curComponentIndex = index
        },
        //添加组件
        addComponent({component, index} ) {
            if (index !== undefined) {
                this.componentData.components.splice(index, 0, component)
            } else {
                this.componentData.components.push(component)
            }
        },
        addEvents(event, {key_id,param} ){
            if (this.curComponent) {
                this.curComponent.events = {}
                this.curComponent.events[event] = {key_id,param}
            }
        },
        removeEvents(){
            if (this.curComponent) {
                this.curComponent.events = {}
            }
        },
        //保存组件
        saveComponent(){
            localStorage.setItem("componentData",JSON.stringify(this.componentData));
            Message({
                message: '保存成功',
                type: 'success'
            });
        },
        setComponentData(componentData){
            this.componentData = componentData 
        },
        //清空画布
        clearCanvas(){
            this.setCurComponent({component:null,index:null})
            this.componentData = []
            Message({
                message: '清空成功',
                type: 'success'
            });
        },
        //设置组件样式对象
        setShapeStyle({ top, left, width, height, rotate }) {
            if (top) this.curComponent.style.top = top
            if (left) this.curComponent.style.left = left
            if (width) this.curComponent.style.width = width
            if (height) this.curComponent.style.height = height
            if (rotate) this.curComponent.style.rotate = rotate
        },
        setBackgroundimageUrl(url){
            this.componentData.containerStyle.url = url
            this.componentData.containerStyle.backgroundImage = "url("+url+")"
        },
    },
    state:()=>{
        return {
            curComponent: null,
            curComponentIndex:null,
            editor: null,
            componentData:{
                userinfo:{
                    username:"",
                    phone:"",
                    draw_num:0
                },

                containerStyle:{
                    url:"",
                    backgroundImage:"",
                    backgroundRepeat: "no-repeat",
                    backgroundColor:"#fffeee",
                },
                components:[]
            },
            snapshotData: [], // 编辑器快照数据
            snapshotIndex: -1, // 快照索引
            
        }
    },
    getters:{
        isShowPreview(state){
            if (state.editMode == 'preview'){
                return true
            }
            return false
        },
        containerStyle(state){
            return state.componentData.containerStyle
        },

    }
})

export default useStore