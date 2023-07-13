<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-06-30 21:47:07
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-07-12 20:40:53
 * @FilePath: \manage\src\views\Login\login.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup>
import { ref } from 'vue';
import { post } from '../utils/request'
import { ElMessage } from 'element-plus';
import { settoken } from '../utils/tools'
import { useRouter } from 'vue-router'

const input_username = ref()
const input_password = ref()
const { push } = useRouter()



const open2 = () => {
  if (input_username.value == '' || input_password == '') return ElMessage.warning('请输入有效内容')
  post(`/api/v1/auth/manager_login`, {
    userName: input_username.value,
    password: input_password.value
  }).then(res => {
    if (res.data.code == 1) {
      ElMessage({
        message: '登录成功',
        type: 'success',
      })
      settoken(res.data.data)
      push({ path: '/manger/border' })
    } else {
      ElMessage.error(res.data.data)
    }
  })
}
</script>
<template>
  <div class="login">
    <ul style="display: flex;flex-direction: column;">
      <li>用户名：<el-input v-model="input_username" placeholder="请输入用户名" /></li>
      <li> 密码：<el-input v-model="input_password" type="password" placeholder="请输入密码" show-password /></li>
      <li><el-button :plain="true" @click="open2">登录</el-button></li>
    </ul>
  </div>
</template> 
<style scoped>
.login {
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 500px;
  height: 400px;
  background-color: firebrick;
  margin-top: 80px;
}

ul,
li {
  margin: 10px;
}
</style>