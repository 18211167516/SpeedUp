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
import { mapState } from 'pinia'
import component from '@/store/preview/component'

export default {
    mixins: [mixins],
    props: {
        config: {
            type: Object,
            require: true,
            default: () => {},
        },
    },
     computed: {
        ...mapState(component,['userinfo']),
    },
    methods: {
        getStyle,
        handleClick() {
            console.log(this.config.isNeedLogin,this.userinfo);
            if (this.config.isNeedLogin && !this.userinfo.username){
                this.$bus.$emit("showLoginForm")
            }
            const events = this.config.events 
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