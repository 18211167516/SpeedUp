<template>
    <div v-show="menuShow" class="contextmenu" :style="{ top: menuTop + 'px', left: menuLeft + 'px' }">
        <ul v-if="curComponent">
            <li @click="copy">复制</li>
            <li @click="delComponent">删除</li>
        </ul>
    </div>
</template>

<script>
import { mapState,mapActions} from 'pinia'
import component from '@/store/component'
import snapshot from '@/store/snapshot'
import { deepCopy,generateID } from '@/utils/utils'
export default {
    name:"ContextMenu",
    data() {
        return {
            copyData: null,
        }
    },
    computed: mapState(component,[
        'menuTop',
        'menuLeft',
        'menuShow',
        'curComponent',
        'curComponentIndex'
    ]),
    methods: {
        ...mapActions(component,["deleteComponent","addComponent",'hideContextMenu']),
        ...mapActions(snapshot,["recordSnapshot"]),
        copy() {
            if (!this.curComponent){
                this.$toast.fail('请选择组件');
                return
            }

            const component = deepCopy(this.$componentList[this.curComponent.component])
            component.id = generateID()
            component.style.top = Math.round(Math.random()*100);
            component.style.left = Math.round(Math.random()*100);
            this.addComponent({component})
            this.hideContextMenu()
        },
        delComponent() {
            this.deleteComponent()
            this.recordSnapshot()
            this.hideContextMenu()
        },
    },
}
</script>

<style lang="scss" scoped>
.contextmenu {
    position: absolute;
    z-index: 1000;

    ul {
        border: 1px solid #e4e7ed;
        border-radius: 4px;
        background-color: #fff;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
        box-sizing: border-box;
        margin: 5px 0;
        padding: 6px 0;

        li {
            font-size: 14px;
            padding: 0 20px;
            position: relative;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            color: #606266;
            height: 34px;
            line-height: 34px;
            box-sizing: border-box;
            cursor: pointer;

            &:hover {
                background-color: #f5f7fa;
            }
        }
    }
}
</style>