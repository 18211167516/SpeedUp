<template>
   <el-tabs value="attr">
            <el-tab-pane label="属性" name="attr">
                <AttrList v-if="curComponent" />
                <p v-else class="placeholder">请选择组件</p>
            </el-tab-pane>
    </el-tabs>
</template>

<script>
    import AttrList from '@/components/RightConfig/AttrList'
    import {mapState } from 'pinia'
    import component from '@/store/component'
    export default {
        name:"RightConfig",
        data() {
            return {
                activeName:"attr"
            }
        },
        components: {AttrList},
        computed:{
            ...mapState(component,["curComponent"])
        },
    }
</script>

<style>
    .placeholder {
        text-align: center;
        color: #333;
    }
</style>