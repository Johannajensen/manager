<script setup>

import { ref } from 'vue'
import { Menu as Setting } from '@element-plus/icons-vue'
import { admin } from '../views/serves/GoodsApi'
import { useRouter } from 'vue-router'

const usernickame = ref();
admin().then(res => {
  // console.log(res);
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
      <el-header style="text-align: right; font-size: 12px">
        <div class="toolbar">
          <el-dropdown>
            <el-icon style="margin-right: 8px; margin-top: 1px">
              <setting />
            </el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>View</el-dropdown-item>
                <el-dropdown-item>Add</el-dropdown-item>
                <el-dropdown-item @click="logoOut">Delete</el-dropdown-item>
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
              <el-sub-menu index="1">
                <template #title>
                  <el-icon>
                    <DataBoard />
                  </el-icon>看板
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

        <el-main style="background-color: azure;width: 100vw;height: 100vh; padding: 20px;">

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
