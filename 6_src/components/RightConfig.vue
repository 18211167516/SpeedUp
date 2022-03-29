<template>
   <el-tabs value="attr">
            <template v-if="curComponent">
                <el-tab-pane label="属性" name="attr">
                    <AttrList  />
                </el-tab-pane>
                <el-tab-pane label="事件" name="events">
                    <EventList/>
                </el-tab-pane>
            </template>
            <template v-else>
                <el-tab-pane label="页面" name="attr">
                    <el-form>
                        <el-form-item label="背景图片">
                            <el-upload
                                class="avatar-uploader"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload"
                                >
                                <img v-if="containerStyle.url" :src="containerStyle.url" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="背景颜色">
                            <el-color-picker v-model="containerStyle.backgroundColor"></el-color-picker>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </template>
            
    </el-tabs>
</template>

<script>
    import AttrList from '@/components/RightConfig/AttrList'
    import EventList from '@/components/RightConfig/EventList'
    import {mapActions, mapState } from 'pinia'
    import component from '@/store/component'
    export default {
        name:"RightConfig",
        data() {
            return {
                activeName:"attr",
            }
        },
        components: {AttrList,EventList},
        computed:{
            ...mapState(component,["curComponent","containerStyle"])
        },
        methods: {
            ...mapActions(component,["setBackgroundimageUrl"]),
            handleAvatarSuccess(res, file) {
                this.setBackgroundimageUrl(URL.createObjectURL(file.raw));
            },
            beforeAvatarUpload(file){
                
                this.setBackgroundimageUrl(URL.createObjectURL(file))
                var reader  = new FileReader();
                reader.addEventListener("load", function () {
                }, false);
                reader.readAsDataURL(file);

            }

        },
    }
</script>

<style>
    .placeholder {
        text-align: center;
        color: #333;
    }

      .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 200;
    height: 360px;
    display: block;
  }
</style>