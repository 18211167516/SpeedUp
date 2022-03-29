<template>
        <div v-if="!isShowPreview" id="editor" >
            <Shape
                
                v-for="(item, index) in componentData.components"
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
        <div v-else>

        <ComponentWrapper
                    v-for="item in componentData.components"
                    :key="item.id"
                    :config="item"
                />
        </div>
</template>

<script>
    import {mapState} from 'pinia'
    import component from '@/store/component'
    import { getStyle } from '@/utils/style'
    import Shape from '@/components/Editor/Shape.vue'
    import ComponentWrapper from '@/components/Preview/ComponentWrapper'
    export default {
        name:"Editor",
        components:{Shape,ComponentWrapper},
        mounted() {
            const store = component()
            store.editor = this.$("#editor")
        },
        computed:{
            ...mapState(component,["componentData","curComponent","editor","isShowPreview"])
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
                return getStyle(style)
            }
        },
    }
</script>

<style>

</style>