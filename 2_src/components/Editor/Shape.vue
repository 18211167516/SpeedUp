<template>
    <div class="shape" :class="{ active }" @mousedown="selectCurComponent">
        <slot></slot>
    </div>
</template>

<script>
import { mapState,mapActions} from 'pinia'
import component from '@/store/component'
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
            'editor',
        ])
    },
    methods: {
        ...mapActions(component,["setCurComponent","setShapeStyle"]),
        //鼠标按下选中这个组件
        selectCurComponent(e) {
            this.setCurComponent({ component: this.element, index: this.index })
            e.stopPropagation()
            e.preventDefault()

            const pos = { ...this.defaultStyle }
            const startY = e.clientY
            const startX = e.clientX
            // 如果直接修改属性，值的类型会变为字符串，所以要转为数值型
            const startTop = Number(pos.top)
            const startLeft = Number(pos.left)

            console.log("元素",e)

            // 如果元素没有移动，则不保存快照
            const move = (moveEvent) => {
                console.log("移动",moveEvent);
                const curX = moveEvent.clientX
                const curY = moveEvent.clientY
                pos.top = curY - startY + startTop
                pos.left = curX - startX + startLeft
                // 修改当前组件样式
                this.setShapeStyle(pos)
            }

            const up = () => {
                document.removeEventListener('mousemove', move)
                document.removeEventListener('mouseup', up)
            }

            document.addEventListener('mousemove', move)
            document.addEventListener('mouseup', up)
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
