<!-- eslint-disable vue/no-v-html -->
<template  >
    <!-- tabindex >= 0 使得双击时聚集该元素 -->
    <div v-if="!$router.isPreview"
        class="v-text"
        :contenteditable="canEdit"
        :class="{ canEdit }"
        :tabindex="element.id"
        v-html="element.propValue"
    >
    </div>
    <div v-else class="v-text preview" @click.self="login"
        v-show="isshow"
        v-html="userinfo.username || element.propValue"
    >
    </div>
</template>

<script>
import { mapState } from 'pinia'
import component from '@/store/preview/component'

export default {
    name:"VUser",
    props: {
        propValue: {
            type: String,
            require: true,
            default: '',
        },
        element: {
            type: Object,
            default: () => {},
        }
    },
    data() {
        return {
            canEdit: false,
            isshow:true,
        }
    },
    computed: {
        ...mapState(component,['userinfo']),
    },
    methods: {
        login(){
            /* if (!this.userinfo.username){
                this.$bus.$emit("showLoginForm")
            } */

            //this.isshow = false
            //this.userinfo.username = '123123'
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
