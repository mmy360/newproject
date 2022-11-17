<script lang="ts" setup>
import { reactive, ref } from 'vue'
import {User, Lock} from '@element-plus/icons-vue'
import request from '@/utils/request.js'
import {useRouter} from "vue-router";
import {ElMessage} from "element-plus";
import type { FormInstance, FormRules } from 'element-plus'

const router = useRouter()

const form = ref({
    username: null,
    password: null,
    confirm: null,
})


// const validatePass = (rule: any, value: any, callback: any) => {
//     if (value === '') {
//         callback(new Error('Please input the password'))
//     } else {
//         if (form.value.confirm !== '') {
//             if (!form.value) return
//         }
//         callback()
//     }
// }
// const validatePass2 = (rule: any, value: any, callback: any) => {
//     if (value === '') {
//         callback(new Error('Please input the password again'))
//     } else if (value !== form.value.password) {
//         callback(new Error("Two inputs don't match!"))
//     } else {
//         callback()
//     }
// }
//
//
//
// const rules = reactive({
//     password: [{ validator: validatePass, trigger: 'blur' }],
//     confirm: [{ validator: validatePass2, trigger: 'blur' }],
// })


function register(){
    if(form.value.password !== form.value.confirm){
        ElMessage({
            showClose: true,
            message: '两次密码不一致',
            type: 'error',
        })
        return
    }
    request.post("/user/register", form.value).then(res => {
        if(res.code === '0'){
            ElMessage({
                showClose: true,
                message: '注册成功',
                type: 'success',
            })
            router.push('/login')
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
            <div style="color: gold; font-size: 30px; text-align: center; padding: 30px">欢迎注册</div>
            <div>
                <el-form
                    ref="ruleFormRef"
                    :model="ruleForm"
                    status-icon
                    :rules="rules"
                    class="demo-ruleForm"
                >
                    <el-form-item prop="pass">
                        <el-input v-model="form.username"
                                  :prefix-icon="User"
                                  autocomplete="off"
                                  placeholder="请输入账号" />
                    </el-form-item>
                    <el-form-item  prop="age">
                        <el-input v-model.number="form.password"
                                  :prefix-icon="Lock"
                                  show-password
                                  placeholder="请输入密码" />
                    </el-form-item>
                    <el-form-item  prop="age">
                        <el-input v-model.number="form.confirm"
                                  :prefix-icon="Lock"
                                  show-password
                                  placeholder="请确认密码" />
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary"
                                   @click="register"
                                   style="width: 100% ">注册</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>


<style scoped>

</style>