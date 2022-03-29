<template>
  <div id="app">
     <div class="home">
        <Toolbar />
        <main>
            <!-- 左侧组件列表 -->
            <section class="left">
                <ComponentList />
            </section>
            <!-- 中间画布 -->
            <section class="center">
                <div class="content" @drop="handleDrop" @dragover="handleDragOver">
                    <Editor />
                </div>
            </section>
            <!-- 右侧属性列表 -->
            <section class="right">
                <RightConfig />
            </section>
        </main>
    </div>
  </div>
</template>

<script>
  import ComponentList from '@/components/ComponentList.vue'
  import Toolbar from '@/components/Toolbar.vue'
  import Editor from '@/components/Editor.vue'
  import RightConfig from '@/components/RightConfig.vue'
  import { deepCopy,generateID } from '@/utils/utils'
  import {mapState, mapActions} from 'pinia'
  import component from '@/store/component'
  export default {
    name: 'App',
    components: {
      ComponentList,Toolbar,Editor,RightConfig
    },
    computed:{
        ...mapState(component,["isShowPreview","editor"])
    },
    methods: {
        ...mapActions(component,["addComponent"]),
        // 当被拖动元素在释放区里放下时触发
         handleDrop(e) {
            console.log("拖拽到编辑区了");
            e.preventDefault()
            e.stopPropagation()
            const index = e.dataTransfer.getData('index')
            const rectInfo = this.editor.getBoundingClientRect()
            if (index) {
                const component = deepCopy(this.$componentList[index])
                component.style.top = e.clientY - rectInfo.y
                component.style.left = e.clientX - rectInfo.x
                component.id = generateID()
                this.addComponent({component })
            }
        },
        //当被拖动元素在释放区内移动时触发
        handleDragOver(e) {
            e.preventDefault()
            e.dataTransfer.dropEffect = 'copy'
        },
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
