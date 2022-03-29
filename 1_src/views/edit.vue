<template>
     <div class="home">
        <Toolbar />
        <main>
            <!-- 左侧组件列表 -->
            <section class="left">
                <ComponentList />
            </section>
            <!-- 中间画布 -->
            <section class="center">
                <Editor />
            </section>
            <!-- 右侧属性列表 -->
            <section class="right">
                <RightConfig />
            </section>
        </main>
    </div>
</template>

<script>
  import ComponentList from '@/components/ComponentList.vue'
  import Toolbar from '@/components/Toolbar.vue'
  import Editor from '@/components/Editor.vue'
  import RightConfig from '@/components/RightConfig.vue'
  export default {
    name: 'edit',
    components: {
      ComponentList,Toolbar,Editor,RightConfig
    }
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  margin-top: 60px;
}


</style>

<style lang="scss">
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
            margin-left: 200px;
            margin-right: 262px;
            background: #f5f5f5;
            height: 100%;
            overflow: auto;
            padding: 20px;

            .content {
                width: 100%;
                height: 100%;
                overflow: auto;
            }
        }
    }

    .placeholder {
        text-align: center;
        color: #333;
    }
}
</style>
