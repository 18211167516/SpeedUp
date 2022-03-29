<template>
    <div class="toolbar">
        <el-button @click="undo">撤消</el-button>
        <el-button @click="redo">恢复</el-button>
        <el-button @click="preview">预览</el-button>
        <el-button @click="save">保存</el-button>
        <el-button @click="clearCanvas">清空画布</el-button>
    </div>
</template>

<script>
    import {mapActions} from 'pinia'
    import component from '@/store/component'
    import snapshot from '@/store/snapshot'
    export default {
        name:"Toolbar",
        methods: {
            ...mapActions(component,["saveComponent","clearCanvas"]),
            ...mapActions(snapshot,["undo","redo"]),
            //预览
            preview(){
                this.saveComponent()
                let {href} = this.$router.resolve({name: 'preview'});
                window.open(href);
                //设置全局状态编辑器模式为previe或者edit
            },
            //保存
            save(){
                this.saveComponent()
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