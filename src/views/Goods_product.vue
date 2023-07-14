<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-06-30 21:47:07
 * @LastEditors: Johannjensen johannajensen1@gmail.com
 * @LastEditTime: 2023-07-14 09:35:47
 * @FilePath: \manage\src\views\Goods_product.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup>
import { onMounted, ref, watch } from "vue";
import { dataproduct, deldataproduct, getonlydata, changdatamessage, plusnewdata } from './serves/GoodsProduct.js'
import { ElMessage } from "element-plus";
// import { tr } from "element-plus/es/locale";
const labelPosition = ref('right')
const productlist = ref([])
const dialogTableVisible = ref(false)
const currentID = ref()
const modelFrom = ref();
const total = ref(0)
const pagechange = ref();

onMounted(() => {
    model.value.name = ''
    model.value.coverImage = ''
    getdataproduct();
})


// 获取商品分类
const getdataproduct = async (page, name) => {
    await dataproduct(page, name).then(res => {
        // console.log(res);
        productlist.value.length = 0
        productlist.value.push(...res.data.data)
        total.value = res.data.total
    })
}

// 删除分类
const del = async (id) => {
    await deldataproduct(id).then(res => {
        console.log(res);
    })
    getdataproduct();
}
// 监听弹出框的变化
watch(dialogTableVisible, (v) => {
    if (!v) {
        model.value.name = '',
            model.value.coverImage = ''
    }
})

// 监听分页器页面的变化
watch(pagechange, (v) => { 
    pagechange.value = v
    getdataproduct(v)
})

const formLabelAlign = ref({
    name: ''
})

// 点击搜索
const search = () => {
    getdataproduct(1, formLabelAlign.value.name)
}

// 点击添加
const plus = () => {
    dialogTableVisible.value = true
}

// 模态框中表单数据
const model = ref({
    name: '',
    coverImage: '',

});
const rules = ref({
    name: [{
        required: true,
        message: '商品名字不能为空',
        trigger: 'blur',
    }],
})

// 点击编辑时
const editor = async (id) => {
    currentID.value = id
    dialogTableVisible.value = true;
    await getonlydata(id).then(res => {
        model.value.name = res.data.name
        model.value.coverImage = res.data.coverImage
    })
}

// 上传图片
const uploadEndhandel = (url) => {
    model.value.coverImage = url
}

// 点击提交时
const submitForm = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid) => {
        if (valid) {
            if (currentID.value) { // 有id就是保存
                changdatamessage(currentID.value, {
                    name: model.value.name,
                    coverImage: model.value.coverImage
                }).then(res => {
                    console.log(res);
                    if (res.status = 200) {
                        ElMessage.success('修改成功')
                        getdataproduct()
                        dialogTableVisible.value = false
                    }
                })
            } else {  // 没有id就会新增
                plusnewdata({
                    name: model.value.name,
                    coverImage: model.value.coverImage
                }).then(res => {
                    if (res.status == 200) {
                        ElMessage.success('保存成功')
                        getdataproduct();
                        dialogTableVisible.value = false
                    }
                })
            }
        }
    })
}

const resetForm = (formEl) => {
    if (!formEl) return
    formEl.resetFields()
}


</script>


<template>
    <div class="search">
        <div class="left">
            <el-form :label-position="labelPosition" :model="formLabelAlign" style="max-width: 460px;">
                <el-form-item label="关键字：" style="width: auto;">
                    <el-input v-model="formLabelAlign.name" placeholder="请输入搜索内容"></el-input>
                </el-form-item>
            </el-form>
            <el-button style="margin-left: 8px;" @click="search">搜索</el-button>
        </div>
        <el-button @click="plus">+</el-button>
    </div>

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

        <el-table-column fixed="right" label="操作" header-align="center" aline="center" width="120">
            <template #default="scope">
                <el-button link type="primary" size="small" @click="del(scope.row.id)">删除</el-button>
                <el-button link type="primary" size="small" @click="editor(scope.row.id)">编辑</el-button>
            </template>
        </el-table-column>
    </el-table>

    <div class="Drawer">
        <!-- 模态框 -->
        <el-dialog v-model="dialogTableVisible" title="Shipping address" :close-on-click-modal="false">
            <el-form :label-position="labelPosition" :model="model" style="max-width: 460px" :rules="rules" ref="modelFrom">
                <!-- 模态框中内容框 -->
                <el-form-item label="商品分类" prop="name">
                    <el-input v-model="model.name" />
                </el-form-item>

                <el-form-item label="主图">
                    <MyupLoder :ci="model.coverImage" @uploadEnd="uploadEndhandel"></MyupLoder>
                </el-form-item>


                <el-form-item>
                    <!-- 模态框按钮 -->
                    <el-button type="primary" @click="submitForm(modelFrom)">
                        提交
                    </el-button>
                    <el-button @click="resetForm(modelFrom)">清空</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>


    <div class="page" style="height: 80px;padding-left: 45%; margin-top: 20px">
        <el-pagination background layout="prev, pager, next" :total="total" v-model:current-page="pagechange" />
    </div>
</template>
  
<style scoped>
.search {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    box-sizing: border-box;
}

.left {
    display: flex;
    flex-direction: row;

}
</style>
  