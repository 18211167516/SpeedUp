<template>
    <div class="attr-list">
        <el-form>
            <el-form-item v-for="(obj, index) in styleKeys" :key="index" :label="obj.label">
                <template v-if="obj.component=='el-select'">
                    <el-select  v-model="curComponent.style[obj.key]">
                        <el-option
                            :key="item.value"
                             v-for="item in obj.option"
                           :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </template>
                <template v-else-if="obj.key == 'propValue'">
                    <component
                        v-model="curComponent.propValue"
                        :is="obj.component"
                        :type="obj.type"
                    />
                </template>
                <template v-else>
                    <component
                        v-model="curComponent.style[obj.key]"
                        :is="obj.component"
                        :type="obj.type"
                    />
                </template>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { styleData } from '@/utils/style'

import {mapState,mapActions } from 'pinia'
import component from '@/store/component'
import snapshot from '@/store/snapshot'
export default {
    data() {
        return {
            styleData,
        }
    },
    created() {
        this.styleKeys
    },
    methods: {
        ...mapActions(snapshot,["recordSnapshot"]),
    },
    computed: {
        ...mapState(component,['curComponent']),
        styleKeys() {
            if (this.curComponent) {
                const curComponentStyleKeys = Object.keys(this.curComponent.style)

                const styledata = this.styleData.filter(item => curComponentStyleKeys.includes(item.key))
                styledata.push(...this.curComponent.attach_config)
                return styledata
              /*   console.log(styledata);
                return this.styleData.filter(item => curComponentStyleKeys.includes(item.key)).push(this.curComponent.attach_config) */
            }
            return []
        }
    },
    watch:{
       curComponent:{
            handler () {
                this.recordSnapshot()
            },
            deep: true 
       }
    }
}
</script>

<style lang="scss" scoped>
.attr-list {
    overflow: auto;
    padding: 20px;
    padding-top: 0;
    height: 100%;
}
</style>
