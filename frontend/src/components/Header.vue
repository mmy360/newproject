<script setup>
import { ArrowDown } from '@element-plus/icons-vue'
import {useRouter} from "vue-router";
const router = useRouter()
</script>



<template>
    <div style="height: 50px; line-height: 50px; border-bottom:1px solid #ccc;display: flex; background-color: #545c64">
        <div style="width: 200px; padding-left: 30px; font-weight: bold; color: dodgerblue">后台管理</div>
        <div style="flex:1"></div>
        <div style="width: 100px; padding-top: 15px">
            <el-dropdown>
                <span class="el-dropdown-link">
                    张三
                    <el-icon class="el-icon--right">
                        <arrow-down/>
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="router.push('/person')">个人信息</el-dropdown-item>
                        <el-dropdown-item @click="router.push('/login')">退出系统</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>


<style scoped>
.el-dropdown-link {
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-content: center;
}
</style>