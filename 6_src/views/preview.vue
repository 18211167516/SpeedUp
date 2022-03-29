<template>
     <div class="home" :style="containerStyle">
           <ComponentWrapper
                    v-for="item in components"
                    :key="item.id"
                    :config="item"
                />
            <Login />
    </div>
</template>

<script>
  import ComponentWrapper from '@/components/Preview/ComponentWrapper'
  import Login from '@/components/Preview/Login'
  import {mapState} from 'pinia'
  import component from '@/store/preview/component'
  export default {
    name: 'preview',
    components:{ComponentWrapper,Login},
    computed:{
        ...mapState(component,["components","containerStyle","userinfo"])
    },
  }
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
}

.home {
    height: 100vh;
    background: #fff;

    main {
        height: calc(100% - 64px);
        position: relative;

        .left {
            position: absolute;
            height: 100%;
            width: 200px;
            left: 0;
            top: 0;
            padding-top: 10px;
        }

        .right {
            position: absolute;
            height: 100%;
            width: 262px;
            right: 0;
            top: 0;
        }

        .center {
            position: absolute!important;
            overflow: auto;
            height: 100%;
            top: 0;
            bottom: 0;
            left: 300px;
            right: 310px;
             background: #f5f5f5;
            /* position:absolute;
            margin-left: 200px;
            margin-right: 262px;
            background: #f5f5f5;
            height: 100%;
            overflow: auto;
            padding: 20px; */

            .content {
                border: 1px solid red;
                /* width: 300px;
                height: 600px;
                background-color: #fff;
                border: 1px solid red;
                margin: auto; */
                position: absolute;
                min-width: 375px;
                height: 600px;
                top: 20px;
                left: 50%;
                margin-left: -157px;
                background: #fff;
            }
        }
    }

    .placeholder {
        text-align: center;
        color: #333;
    }
}
</style>
