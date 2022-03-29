<template>
    <div>
        <component
            :is="config.component"
            class="component"
            :style="getStyle(config.style)"
            :prop-value="config.propValue"
            :element="config"
        />
    </div>
</template>

<script>
import { getStyle } from '@/utils/style'
import { mixins } from '@/utils/events'

export default {
    mixins: [mixins],
    props: {
        config: {
            type: Object,
            require: true,
            default: () => {},
        },
    },
    methods: {
        getStyle,
    },
}
</script>

<style lang="scss" scoped>
.component {
    position: absolute;
}
</style>