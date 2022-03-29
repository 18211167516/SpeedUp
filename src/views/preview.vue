<template>
     <div class="home" :style="containerStyle">
           <ComponentWrapper
                    v-for="item in components"
                    :key="item.id"
                    :config="item"
                />
            <Login />
                <van-overlay :show="overlay_show" @click="overlay_show = false" z-index="999">
                    <div class="wrapper">
                            <div  style="color:#fff">点击右上角分享</div>
                    </div>
                </van-overlay>
    </div>
</template>

<script>
  import 'amfe-flexible'
  import ComponentWrapper from '@/components/Preview/ComponentWrapper'
  import Login from '@/components/Preview/Login'
  import {mapState} from 'pinia'
  import component from '@/store/preview/component'
  export default {
    name: 'preview',
    components:{ComponentWrapper,Login},
    data() {
        return {
            overlay_show:false
        }
    },
    created() {
        this.$bus.$on("showShareOverlay",this.showShareOverlay)
    },
    computed:{
        ...mapState(component,["components","containerStyle","userinfo"])
    },
    methods: {
        showShareOverlay(){
            this.overlay_show = true
        }
    },
  }
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
}

 .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

.home {
    height: 100vh;
    background: #fff;
}
</style>
