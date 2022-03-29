<template>
        <div v-if="!isShowPreview" id="editor"
        >
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
            <!-- 右击菜单 -->
            <ContextMenu />
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
    import {mapActions, mapState} from 'pinia'
    import component from '@/store/component'
    import { getStyle } from '@/utils/style'
    import Shape from '@/components/Editor/Shape.vue'
    import ContextMenu from '@/components/Editor/ContextMenu.vue'
    import ComponentWrapper from '@/components/Preview/ComponentWrapper'
    export default {
        name:"Editor",
        components:{Shape,ComponentWrapper,ContextMenu},
        mounted() {
            const store = component()
            store.editor = this.$("#editor")

        },
        computed:{
            ...mapState(component,["componentData","curComponent","editor","isShowPreview"])
        },
        methods: {
            ...mapActions(component,["showContextMenu"]),
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
        }
    }
</script>

<style>

</style>