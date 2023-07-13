<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-06-30 21:47:07
 * @LastEditors: Johannjensen johannajensen1@gmail.com
 * @LastEditTime: 2023-07-13 22:01:09
 * @FilePath: \manage\src\views\Goods_product.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup>
import { onMounted, ref } from "vue";
import { dataproduct } from './serves/GoodsProduct.js'

const productlist = ref([])

onMounted(() => {
    getdataproduct();
})

// 获取商品分类
const getdataproduct = () => {
    dataproduct().then(res => {
        // console.log(res);
        productlist.value.push(...res.data.data)
    })
}

const handleClick = () => {
    console.log('click')
}

</script>


<template>
    <el-table :data="productlist" style="width: 100%" :highlight-current-row=true aline="center">
        <el-table-column header-align="center" aline="center" fixed prop="name" label="商品分类名称" width="250" />
        <el-table-column header-align="center" aline="center" prop="id" label="商品分类ID" width="250" />
        <el-table-column header-align="center" aline="center" prop="address" label="主图" width="600">
            <!-- 插槽，存放主图 -->
            <template #default="scope">
                <div style="display: flex; align-items: center; text-align: center;justify-content: center;">
                    <img :src="scope.row.coverImage" style="border-radius: 10px; height: 100px" />
                </div>
            </template>

        </el-table-column>

        <el-table-column fixed="right" label="Operations" width="120">
            <template #default>
                <el-button link type="primary" size="small" @click="handleClick">删除</el-button>
                <el-button link type="primary" size="small">编辑</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>
  

  