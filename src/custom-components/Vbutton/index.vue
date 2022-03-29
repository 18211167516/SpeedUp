<!-- eslint-disable vue/no-v-html -->
<template  >
    <!-- tabindex >= 0 使得双击时聚集该元素 -->
  <!--   <van-button type="default">
        {{element.propValue}}
    </van-button> -->

    <button type="button">{{element.propValue}}</button>

</template>

<script>
import { mapState } from 'pinia'
import component from '@/store/preview/component'

export default {
    name:"VButton",
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
        }
    },
    computed: {
        ...mapState(component,['userinfo']),
    },
    methods: {
    },
}
</script>

<style lang="scss" scoped>
</style>
