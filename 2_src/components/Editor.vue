<template>
    <div id ="editor">
            <Shape
                
                v-for="(item, index) in componentData"
                :key="item.id"
                :default-style="item.style"
                :style="getShapeStyle(item.style)"
                :active="item.id === (curComponent || {}).id"
                :element="item"
                :index="index"
                :class="{ lock: item.isLock }"
            >

                <component
                    :is="item.component"
                    :id="'component' + item.id"
                    class="component"
                    :style="getComponentStyle(item.style)"
                    :prop-value="item.propValue"
                    :element="item"
                />
            </Shape>
        </div>
</template>

<script>
    import {mapState} from 'pinia'
    import component from '@/store/component'
    import { getStyle } from '@/utils/style'
    import Shape from '@/components/Editor/Shape.vue'
    export default {
        name:"Editor",
        components:{Shape},
        mounted() {
            console.log("我编辑区组件挂载了");
            const store = component()
            store.editor = this.$("#editor")
        },
        computed:{
            ...mapState(component,["componentData","curComponent"])
        },
        methods: {
            getShapeStyle(style) {
                const result = {};
                ['width', 'height', 'top', 'left', 'rotate'].forEach(attr => {
                    if (attr != 'rotate') {
                        result[attr] = style[attr] + 'px'
                    } else {
                        result.transform = 'rotate(' + style[attr] + 'deg)'
                    }
                })

                return result
            },

            getComponentStyle(style) {
                return getStyle(style, ['top', 'left', 'width', 'height', 'rotate'])
            },
        },
    }
</script>

<style>

</style>