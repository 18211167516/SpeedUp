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
                this.componentData.splice(index, 0, component)
            } else {
                this.componentData.push(component)
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
        //获取本地持久化的组件
        getLocaComponent(){
            var obj = JSON.parse(localStorage.getItem("componentData")) || [];
            return obj
        },
        //保存组件
        saveComponent(){
            if (this.componentData.length){
                localStorage.setItem("componentData",JSON.stringify(this.componentData));
                Message({
                    message: '保存成功',
                    type: 'success'
                });
            }else{
                Message({
                    message: '保存成功',
                    type: 'warning'
                });
            }
        },
        setComponentData(componentData){
            this.componentData = componentData || []
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
        //设置编辑区模式
        setEditMode(mode){
            this.editMode = mode
        },
        //设置组件样式对象
        setShapeStyle({ top, left, width, height, rotate }) {
            if (top) this.curComponent.style.top = top
            if (left) this.curComponent.style.left = left
            if (width) this.curComponent.style.width = width
            if (height) this.curComponent.style.height = height
            if (rotate) this.curComponent.style.rotate = rotate
        },

    },
    state:()=>{
        return {
            curComponent: null,
            curComponentIndex:null,
            editor: null,
            editMode:"edit",
            componentData:[],
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
        }
    }
})

export default useStore