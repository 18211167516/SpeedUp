<template>
    <div class="toolbar">
        <el-button @click="undo">撤消</el-button>
        <el-button @click="redo">恢复</el-button>
        <el-button><router-link target="_blank" to ='/preview'>跳转页面去预览</router-link></el-button>
        <el-button @click="preview">
            <span v-if="editMode == 'preview'">编辑</span>
            <span v-else>预览</span>
        </el-button>
        <el-button @click="save">保存</el-button>
        <el-button @click="clearCanvas">清空画布</el-button>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'pinia'
    import component from '@/store/component'
    export default {
        name:"Toolbar",
        computed:{
            ...mapState(component,["editMode"])
        },
        methods: {
            ...mapActions(component,["setEditMode"]),
            //撤销上一次操作
            undo(){

            },
            //恢复
            redo(){

            },
            //预览
            preview(){
                //设置全局状态编辑器模式为previe或者edit
                if (this.editMode == 'edit'){
                    this.setEditMode("preview")
                }else{
                    this.setEditMode('edit')
                }
                //this.$router.push('/preview')
            },
            //保存
            save(){

            },
            //清除画布
            clearCanvas(){

            }
        },
    }
</script>

<style lang="scss" scoped>
.toolbar {
    padding: 15px 10px;
    white-space: nowrap;
    overflow-x: auto;
    background: #fff;
    border-bottom: 1px solid #ddd;
}
</style>