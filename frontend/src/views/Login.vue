<script lang="ts" setup>
import { reactive, ref } from 'vue'
import {User, Lock} from '@element-plus/icons-vue'
import request from '@/utils/request.js'
import {useRouter} from "vue-router";
import {ElMessage} from "element-plus";
import type{FormInstance} from 'element-plus'

const router = useRouter()

const form = ref({
    username: null,
    password: null
})
const ruleFormRef = ref<FormInstance>()

const rules = ref({
    username: [
        {required: true, message: '请输入用户名', trigger:'blur'},
    ],
    password:[
        {required: true, message: '清输入密码', trigger: 'blur'},
    ],
})

function login(formEl: FormInstance | undefined){
    request.post("/user/login", form.value).then(res => {
        if(res.code === '0'){
            ElMessage({
                showClose: true,
                message: 'Congrats, this is a success message.',
                type: 'success',
            })
            router.push('/')
        }
        else{
            ElMessage({
                showClose: true,
                message: 'Oops, this is a error message.',
                type: 'error',
            })
        }
    })
}


</script>


<template>
    <div style="width: 100%; height: 100vh; background-color: cadetblue; overflow: hidden">
        <div style="width: 400px; margin: 150px auto">
            <div style="color: gold; font-size: 30px; text-align: center; padding: 30px">欢迎登陆</div>
            <div>
                <el-form
                    ref="ruleFormRef"
                    :model="form"
                    status-icon
                    :rules="rules"
                    class="demo-ruleForm"
                >
                    <el-form-item prop="username">
                        <el-input v-model="form.username"
                                  :prefix-icon="User"
                                  autocomplete="off"
                                  placeholder="请输入账号" />
                    </el-form-item>
                    <el-form-item  prop="password">
                        <el-input v-model.number="form.password"
                                  :prefix-icon="Lock"
                                  show-password
                                  placeholder="请输入密码" />
                    </el-form-item>

                    <el-form-item>
                            <el-button type="primary"
                                       @click="login(ruleFormRef)"
                                       style="width: 100%">登陆</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>


<style scoped>

</style>