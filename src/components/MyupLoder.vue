<template>
    <el-upload class="avatar-uploader" :action='upload' :show-file-list="false" :on-success="handleAvatarSuccess"
        name='file'>
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon">
            <Plus />
        </el-icon>
    </el-upload>
</template>
  
<script lang="ts" setup>
import { ref, watch } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { upload } from '../views/utils/tools'
import type { UploadProps } from 'element-plus'
import { baseurl } from '../views/utils/tools'


const emits = defineEmits()
const props = defineProps(['ci'])
const imageUrl = ref(props.ci)
const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
    imageUrl.value = URL.createObjectURL(uploadFile.raw!)
    console.log(response);
    emits('uploadEnd', baseurl + response.data) // 上传成功后利用事件派发将文件派发出去

}
watch(props, () => {
    imageUrl.value = props.ci
});

</script>
  
<style scoped>
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
  
<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>