<template>
<div>
  <van-action-sheet v-model="show" title="登录报名">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="userinfo.username"
          name="username"
          label="用户名"
          placeholder="用户名"
        />
        <van-field
          v-model="userinfo.phone"
          type="tel"
          name="phone"
          label="手机号"
          placeholder="手机号"
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
  </van-action-sheet>

  
</div>
</template>

<script>
import { Dialog } from 'vant';
import {mapActions, mapState} from 'pinia'
import component from '@/store/preview/component'
export default {
    name:"login",
    data(){
      return {
        show:false,
      }
    },
    computed:{
      ...mapState(component,["userinfo"])
    },
    methods: {
        ...mapActions(component,["setUserInfo"]),
        onSubmit(){
            Dialog({ message: '登录成功' });
            this.userinfo.draw_num = 3
            this.setUserInfo(this.userinfo)
            this.closeLoginForm()
        },
        showLoginForm(){
            this.show = true
        },
        closeLoginForm(){
            this.show = false
        }
    },
    mounted() {
      //全局事件注册
      this.$bus.$on("showLoginForm",this.showLoginForm)
      this.$bus.$on("closeLoginForm",this.closeLoginForm)
    },
}
</script>

<style>

</style>