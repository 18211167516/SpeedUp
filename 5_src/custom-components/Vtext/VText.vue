<!-- eslint-disable vue/no-v-html -->
<template  >
    <!-- tabindex >= 0 使得双击时聚集该元素 -->
    <div v-if="editMode == 'edit'"
        ref="text"
        class="v-text"
        :contenteditable="canEdit"
        :class="{ canEdit }"
        :tabindex="element.id"
        :style="{ verticalAlign: element.style.verticalAlign }"
        @dblclick="setEdit"
        @blur="handleBlur"
        v-html="element.propValue"
    >
    </div>
    <div v-else class="v-text preview" 
        :style="{ verticalAlign: element.style.verticalAlign }" 
        v-html="element.propValue"
    >
    </div>
</template>

<script>
import { mapState } from 'pinia'
import component from '@/store/component'

export default {
    name:"VText",
    props: {
        propValue: {
            type: String,
            require: true,
            default: '',
        },
        element: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            canEdit: false,
        }
    },
    computed: {
        ...mapState(component,['editMode']),
    },
    methods: {
        //双击编辑文本
        setEdit() {
            if (this.element.isLock) return

            this.canEdit = true
            // 全选
            this.selectText(this.$refs.text)
        },

        selectText(element) {
            const selection = window.getSelection()
            const range = document.createRange()
            range.selectNodeContents(element)
            selection.removeAllRanges()
            selection.addRange(range)
        }, 
        //得到焦点的时候处理
        handleBlur(e) {
            console.log("我文字组件得到焦点了");
            this.element.propValue = e.target.innerHTML || '&nbsp;'
            const html = e.target.innerHTML
            if (html !== '') {
                this.element.propValue = e.target.innerHTML
            } else {
                this.element.propValue = ''
                this.$nextTick(() => {
                    this.element.propValue = '&nbsp;'
                })
            }
            this.canEdit = false
        }
    },
}
</script>

<style lang="scss" scoped>
.v-text {
    width: 100%;
    height: 100%;
    display: table;

    div {
        display: table-cell;
        width: 100%;
        height: 100%;
        outline: none;
    }

    .canEdit {
        cursor: text;
        height: 100%;
    }
}

.preview {
    user-select: none;
}
</style>
