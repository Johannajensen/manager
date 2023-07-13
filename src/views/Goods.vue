<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-06-30 21:47:07
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-07-13 17:01:06
 * @FilePath: \manage\src\views\Goods.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<script setup>
import { onMounted, ref, reactive, watch, provide } from "vue";
import { GoodsItemApi, getonlydata, plusdata, datacatlist, changdata, deldata } from "./serves/GoodsApi";
import { ElMessage } from 'element-plus';
import MyupLoder from '../components/MyupLoder.vue'
import MyEditor from "../components/MyEditor.vue";

// 模态框
const dialogTableVisible = ref(false);
const modelFrom = ref();
const tableData = ref([]);
const total = ref(0);
const currentPage = ref(1);
const valueHtml = ref(''); // 定义富文本内容
provide('valueHtml', valueHtml)

const currentID = ref(''); // 当前ID，用来区分新增还是修改
// 初始化时调用
onMounted(() => {
  GetGoodsApi();
});

// 对获取商品进行封装
const GetGoodsApi = (page = 1, keyword) => {
  GoodsItemApi(page, keyword).then((res) => {
    console.log(res);
    tableData.value.length = 0;
    tableData.value.push(...res.data.data);
    total.value = parseInt(res.data.total);

  });
};

watch(dialogTableVisible, (v) => {
  if (!v) {
    model.value.name = '',
      model.value.num = 0,
      currentID.value = '',
      model.value.coverImage = ''
    valueHtml.value = ''
  }
})
// 利用事件派发将上传图片的url存下来
const uploadEndhandel = (url) => {
  console.log(url);
  model.value.coverImage = url
}

watch(currentPage, (v) => {
  currentPage.value = v
  GetGoodsApi(v)
})
// 商品分类
// datacatlist().then(res => {
//   console.log(res);
// })

const labelPosition = ref('right')

const formLabelAlign = reactive({
  name: '',
})

// 点击加号时
const plus = async () => {
  dialogTableVisible.value = true
}

// 模态框中表单数据
const model = ref({
  name: '',
  num: 1,
  coverImage: '',

});
const rules = ref({
  name: [{
    required: true,
    message: '商品名字不能为空',
    trigger: 'blur',
  }],
  num: [{
    required: true,
    message: '商品数量不能为空',
    trigger: 'blur'
  }],
  price: [{
    required: true,
    message: '商品价格不能为空',
    trigger: 'blur'
  }],
})

const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      if (currentID.value) { // 有id就是保存
        changdata(currentID.value,
          {
            name: model.value.name,
            amount: model.value.num,
            coverImage: model.value.coverImage,
            content: valueHtml.value
          }).then(res => {
            if (res.status == 200) {
              dialogTableVisible.value = false;
              ElMessage({
                showClose: true,
                message: '修改成功',
                type: 'success',
              })
              GetGoodsApi();

            }
          })
      } else {  // 没有id就会新增
        plusdata({
          name: model.value.name,
          amount: model.value.num,
          coverImage: model.value.coverImage,
          content: valueHtml.value
        })
        dialogTableVisible.value = false
        ElMessage({
          showClose: true,
          message: '保存成功',
          type: 'success',
        })
        model.value.name = '';
        GetGoodsApi();
      }
    }
  })
}

const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}

// 点击编辑按钮
const editor = async (id) => {
  dialogTableVisible.value = true
  currentID.value = id
  await getonlydata(id).then(res => {
    console.log(res);
    model.value.name = res.data.name;
    model.value.num = res.data.amount
    model.value.coverImage = res.data.coverImage
    valueHtml.value = res.data.content
  });
}

// 点击删除按钮
const del = async (id) => {
  await deldata(id);
  GetGoodsApi();
}



// 点击搜索按钮 有BUG
const search = async () => {
  GetGoodsApi(currentPage.value, formLabelAlign.name)


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
  <div class="Goods" style="overflow-y: auto">
    <el-table :data="tableData" style="width: 100%;" :highlight-current-row=true aline="center">
      <el-table-column header-align="center" aline="center" fixed prop="name" label="商品名称" width="200" />
      <el-table-column header-align="center" aline="center" prop="id" label="商品ID" width="120" />
      <el-table-column header-align="center" aline="center" prop="amount" label="库存" width="120" />
      <el-table-column header-align="center" aline="center" prop="price" label="商品价格" width="120" />
      <el-table-column header-align="center" aline="center" prop="category.name" label="商品分类" width="120" />
      <el-table-column header-align="center" aline="center" label="主图" width="600">
        <!-- 主图 -->
        <template #default="scope">
          <div style="display: flex; align-items: center; text-align: center;justify-content: center;">
            <img :src="scope.row.coverImage" style="border-radius: 10px; height: 100px" />
          </div>
        </template>

      </el-table-column>
      <el-table-column fixed="right" label="编辑" width="120" header-align="center">
        <template #default="scope">
          <el-popconfirm title="你确认要删除吗？" @confirm="del(scope.row.id)">
            <template #reference>
              <el-button link type="primary" size="small">删除</el-button>
            </template>
          </el-popconfirm>
          <el-button link type="primary" size="small" @click="editor(scope.row.id)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>


  <!-- 分页器 -->
  <div class="page" style="height: 80px; padding-left: 30%; margin-top: 20px">
    <el-pagination background layout="prev, pager, next" :total="total" v-model:current-page="currentPage" />
  </div>


  <div class="Drawer">
    <!-- 模态框 -->
    <el-dialog v-model="dialogTableVisible" title="Shipping address" :close-on-click-modal="false">
      <el-form :label-position="labelPosition" :model="model" style="max-width: 460px" :rules="rules" ref="modelFrom">
        <!-- 模态框中内容框 -->
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="model.name" />
        </el-form-item>


        <el-form-item label="商品数量" prop="num">
          <el-input-number v-model="model.num" :min="1" :max="300" />
        </el-form-item>

        <el-form-item label="主图">
          <MyupLoder :ci="model.coverImage" @uploadEnd="uploadEndhandel"></MyupLoder>
        </el-form-item>

        <el-form-item label="详情">
          <MyEditor></MyEditor>
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
