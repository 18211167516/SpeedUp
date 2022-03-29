import { defineStore } from 'pinia'


export default defineStore("editorData",{
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