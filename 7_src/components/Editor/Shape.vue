<template>
    <div class="shape" :class="{ active }" @mousedown.stop="selectCurComponent">
        <slot></slot>
    </div>
</template>

<script>
import { mapState,mapActions} from 'pinia'
import component from '@/store/component'
import snapshot from '@/store/snapshot'
export default {
    props: {
        active: {
            type: Boolean,
            default: false,
        },
        element: {
            require: true,
            type: Object,
            default: () => {},
        },
        defaultStyle: {
            require: true,
            type: Object,
            default: () => {},
        },
        index: {
            require: true,
            type: [Number, String],
            default: 0,
        },
    },
    data() {
        return {
        }
    },
    computed: {
        ...mapState(component,[
            'curComponent',
            'setShapeStyle',
            'editor',
        ])
    },
    methods: {
        ...mapActions(component,["setCurComponent","showContextMenu"]),
        ...mapActions(snapshot,["recordSnapshot"]),
        //鼠标按下选中这个组件
        selectCurComponent(e) {
            e.stopPropagation()
            e.preventDefault()
            this.setCurComponent({ component: this.element, index: this.index })
            if (e.button == 2){
                //this.handleContextMenu(e)
            }else{
                const pos = { ...this.defaultStyle }
                
                if (pos.top != undefined) {
                    const startY = e.clientY
                    const startX = e.clientX
                    // 如果直接修改属性，值的类型会变为字符串，所以要转为数值型
                    const startTop = Number(pos.top)
                    const startLeft = Number(pos.left)
        
                    // 如果元素没有移动，则不保存快照
                    let hasMove = false
                    const move = (moveEvent) => {
                        hasMove = true
                        console.log("移动",moveEvent);
                        const curX = moveEvent.clientX
                        const curY = moveEvent.clientY
                        pos.top = curY - startY + startTop
                        pos.left = curX - startX + startLeft
                        // 修改当前组件样式
                        this.setShapeStyle(pos)
                    }
        
                    const up = () => {
                        //添加快照
                        hasMove && this.recordSnapshot()
                        document.removeEventListener('mousemove', move)
                        document.removeEventListener('mouseup', up)
                    }
        
                    document.addEventListener('mousemove', move)
                    document.addEventListener('mouseup', up)
                }
            }


        },
    },
}
</script>

<style lang="scss" scoped>
.shape {
    position: absolute;

    &:hover {
        cursor: move;
    }
}

.active {
    outline: 1px solid #70c0ff;
    user-select: none;
}

.shape-point {
    position: absolute;
    background: #fff;
    border: 1px solid #59c7f9;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    z-index: 1;
}

.icon-xiangyouxuanzhuan {
    position: absolute;
    top: -34px;
    left: 50%;
    transform: translateX(-50%);
    cursor: grab;
    color: #59c7f9;
    font-size: 20px;
    font-weight: 600;

    &:active {
        cursor: grabbing;
    }
}

.icon-suo {
    position: absolute;
    top: 0;
    right: 0;
}
</style>
