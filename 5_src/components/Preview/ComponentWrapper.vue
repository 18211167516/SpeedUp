<template>
    <div @click="handleClick">
        <component
            :is="config.component"
            :id="config.id"
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
        handleClick() {
            const events = this.config.events 
            console.log(this.config);
            Object.keys(events).forEach(event => {
                console.log(events[event].key_id);
                this[event](events[event].key_id,events[event].param)
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.component {
    position: absolute;
}
</style>