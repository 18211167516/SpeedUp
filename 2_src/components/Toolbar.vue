<template>
    <div class="toolbar">
        <el-button @click="undo">撤消</el-button>
        <el-button @click="redo">重做</el-button>
        <el-button @click="preview">预览</el-button>
        <el-button @click="save">保存</el-button>
        <el-button @click="clearCanvas">清空画布</el-button>
    </div>
</template>

<script>
    export default {
        name:"Toolbar",
        methods: {
            //撤销上一次操作
            undo(){

            },
            //重做
            redo(){

            },
            //预览
            preview(){

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