<template>
    <div class="toolbar">
        <h2>我是工具栏</h2>
        <el-button >撤消</el-button>
        <el-button >重做</el-button>
        <el-button >预览</el-button>
        <el-button >保存</el-button>
        <el-button >清空画布</el-button>
    </div>
</template>

<script>
    export default {
        name:"Toolbar",
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