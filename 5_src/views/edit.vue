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
            <section class="center" >
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
  import snapshot from '@/store/snapshot'


  export default {
    name: 'App',
    components: {
        ComponentList,Toolbar,Editor,RightConfig
    },
    computed:{
        ...mapState(component,["isShowPreview",'componentData'])
    },
    methods: {
         ...mapActions(component,["addComponent","getEditor"]),
         ...mapActions(snapshot,["recordSnapshot"]),
         //拖拽到编辑区s释放
         handleDrop(e) {
            e.preventDefault()
            e.stopPropagation()
            if (this.isShowPreview){
                alert("处于预览模式不能拖拽") 
            }else{
                const index = e.dataTransfer.getData('index')
                if (index) {
                    const component = deepCopy(this.$componentList[index])
                    component.style.top = e.offsetY
                    component.style.left = e.offsetX
                    component.id = generateID()
                    //添加组件
                    this.addComponent({component})
                    //添加快照
                    this.recordSnapshot()
                }
            }

        },
        //
        handleDragOver(e) {
            e.preventDefault()
            e.dataTransfer.dropEffect = 'copy'
        }
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

            .content {
                border: 5px solid #fff;
                box-shadow:darkgrey 10px 10px 30px 5px;
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
