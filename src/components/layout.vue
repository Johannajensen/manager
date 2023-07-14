<script setup>

import { ref } from 'vue'
import { Menu as Setting } from '@element-plus/icons-vue'
import { admin } from '../views/serves/GoodsApi'
import { useRouter } from 'vue-router'

const usernickame = ref();
admin().then(res => {
  usernickame.value = res.data.nickName
})

const { push } = useRouter()
const logoOut = () => {
  localStorage.clear('token');
  push({ name: 'Login' })
}

</script>

<template>
  <el-container class="layout-container-demo" style="height: 100vh;width: 100vw;">

    <el-container>
      <el-header
        style="text-align: right; font-size: 12px;display: flex;flex-direction: row;justify-content: space-between; background-color: white;">
        <div class="logo" style="width: 500px;height: 100%;display: flex;flex-direction: row;align-items: center;">
          <img
            src="https://tse4-mm.cn.bing.net/th/id/OIF-C.fEIwvkVZCZBv7eJm4GIH4g?w=173&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
            alt="" style="width: 50px;
            height: 80%;">
          <h1 style="margin-left: 10px;font-weight: 900;font-size: 25px;">泽辉后台系统简陋版</h1>
        </div>
        <div class="toolbar">

          <el-dropdown>
            <el-icon style="margin-right: 8px; margin-top: 1px">
              <setting />
            </el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="logoOut">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span>{{ usernickame }}</span>
        </div>
      </el-header>

      <main>
        <el-aside width="200px">
          <el-scrollbar>
            <el-menu :default-openeds="['1', '4']" router>
              <el-sub-menu index="1" style="background-color: rgba(0, 0, 0, 0.307); ">
                <template #title>
                  <el-icon>
                    <DataBoard />
                  </el-icon>
                  <h1>看板</h1>
                </template>

                <el-menu-item index="1-1" :route="{ name: 'border' }">看板视图</el-menu-item>

              </el-sub-menu>
              <el-sub-menu index="2">
                <template #title>
                  <el-icon>
                    <DocumentCopy />
                  </el-icon>商品管理
                </template>
                <el-menu-item index="2-1" :route="{ name: 'Goods' }">商品信息</el-menu-item>
                <el-menu-item index="2-2" :route="{ name: 'product' }">商品分类</el-menu-item>
              </el-sub-menu>
              <el-sub-menu index="3">
                <template #title>
                  <el-icon>
                    <Platform />
                  </el-icon>轮播图管理
                </template>
                <el-menu-item index="3-1" :route="{ name: 'banner' }">轮播图分类</el-menu-item>
                <el-menu-item index="3-2" :route="{ name: 'banneritem' }">轮播图列表</el-menu-item>
              </el-sub-menu>

              <el-menu-item index="4-1" :route="{ name: 'banner' }"> <el-icon>
                  <User />
                </el-icon>用户中心</el-menu-item>

            </el-menu>
          </el-scrollbar>
        </el-aside>

        <el-main style="background-color: rgba(170, 167, 167, 0.849);width: 100vw;height: 100vh; padding: 20px;">

          <el-scrollbar style="width: 100vw; overflow: hidden;">
            <router-view></router-view>
          </el-scrollbar>
        </el-main>
      </main>
    </el-container>
  </el-container>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: row;
  overflow: hidden;
}

.layout-container-demo .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}

.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}

.layout-container-demo .el-menu {
  flex: 1;
  border-right: none;
}

.layout-container-demo .el-main {
  padding: 0;
}

.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style>
