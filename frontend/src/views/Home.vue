<script lang="ts" setup>
import {ref, onMounted} from "vue";
import {ElMessage} from 'element-plus'
import request from "@/utils/request.js"

const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const search = ref('')
const dialogVisible = ref(false)
const form = ref({
    id: null,
    username: null,
    nickName: null,
    age: null,
    sex: null,
    address: null
})

const handleClick = () => {
    console.log('click')
}

const tableData = ref([
])

onMounted(() => {
    load()
})

function load(){
    request.get("/user", {
        params:{
            pageNum: currentPage.value,
            pageSize: pageSize.value,
            search: search.value,
    }}).then(res => {
        console.log(res)
        tableData.value = res.data.records
        total.value = res.data.total
    })
}

function handleEdit(row){
    form.value = JSON.parse(JSON.stringify(row))
    dialogVisible.value = true
}
const handleSizeChange = (val: number) => {
    pageSize.value = val
    console.log(`${val} items per page`)
    load()
}
const handleCurrentChange = (val: number) => {
    currentPage.value = val
    console.log(`current page: ${val}`)
    load()
}
function add(){
    dialogVisible.value = true
    form.value = ref(null)
    load()
}
function save(){
    if(form.value.id != null){
        request.put("/user", form.value).then(res => {
            console.log(res)
        })}
    else{
        request.post("/user", form.value).then(res => {
            console.log(res)
        })}
    load()
    dialogVisible.value = false
}

function handleDelete(id){
    console.log(id)
    request.delete("/user/" + id).then(res=>{
        if(res.code === '0'){
            ElMessage({
                showClose: true,
                message: 'Congrats, this is a success message.',
                type: 'success',
            })
        }
        else{
            ElMessage({
                showClose: true,
                message: 'Oops, this is a error message.',
                type: 'error',
            })
        }
    })
    load()
}
</script>


<template>
    <div style="padding: 10px">
        <!--    ????????????-->
        <div style="margin: 10px 0">
            <el-button type="primary" @click="add">??????</el-button>
            <el-upload
                action="http://localhost:9090/user/import"
                :on-success="handleUploadSuccess"
                :show-file-list=false
                :limit="1"
                accept='.xlsx'
                style="display: inline-block; margin: 0 10px"
            >
                <el-button type="primary">??????</el-button>
            </el-upload>
            <el-button type="primary" @click="exportUser">??????</el-button>
        </div>

        <!--    ????????????-->
        <div style="margin: 10px 0">
            <el-input v-model="search" placeholder="??????????????????" style="width: 20%" clearable></el-input>
            <el-button type="primary" style="margin-left: 5px" @click="load" clearable>??????</el-button>
        </div>
        <el-table
            v-loading="loading"
            :data="tableData"
            border
            stripe
            style="width: 100%">
            <el-table-column
                prop="id"
                label="ID"
                sortable
            >
            </el-table-column>
            <el-table-column
                prop="username"
                label="?????????"
                sortable>
            </el-table-column>
            <el-table-column
                prop="nickName"
                label="??????"
                sortable>
            </el-table-column>
            <el-table-column
                prop="age"
                label="??????"
                sortable>
            </el-table-column>
            <el-table-column
                prop="sex"
                label="??????"
                sortable>
            </el-table-column>
            <el-table-column
                prop="address"
                label="??????"
                sortable>
            </el-table-column>
            <el-table-column label="????????????" width="300">
                <template #default="scope">
                    <el-select v-model="scope.row.roles" multiple placeholder="?????????" style="width: 80%">
                        <el-option v-for="item in roles" :key="item.id" :label="item.comment" :value="item.id"></el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column label="??????" width="500">
                <template #default="scope">
                    <el-button size="small" type="primary" @click="handleChange(scope.row)">??????????????????</el-button>
                    <el-button size="small" type="success" plain @click="showBooks(scope.row.bookList)">??????????????????</el-button>
                    <el-button size="small" type="primary" plain @click="handleEdit(scope.row)">??????</el-button>
                    <el-popconfirm title="??????????????????" @confirm="handleDelete(scope.row.id)">
                        <template #reference>
                            <el-button size="small" type="danger">??????</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>

        <div style="margin: 10px 0">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[5, 10, 20]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>


        <el-dialog title="???????????????????????????" v-model="bookVis" width="30%">
            <el-table :data="bookList" stripe border>
                <el-table-column prop="id" label="ID"></el-table-column>
                <el-table-column prop="name" label="??????"></el-table-column>
                <el-table-column prop="price" label="??????"></el-table-column>
            </el-table>
        </el-dialog>

        <el-dialog title="??????" v-model="dialogVisible" width="30%">
            <el-form :model="form" label-width="120px">
                <el-form-item label="?????????">
                    <el-input v-model="form.username" style="width: 80%"></el-input>
                </el-form-item>
                <el-form-item label="??????">
                    <el-input v-model="form.nickName" style="width: 80%"></el-input>
                </el-form-item>
                <el-form-item label="??????">
                    <el-input v-model="form.age" style="width: 80%"></el-input>
                </el-form-item>
                <el-form-item label="??????">
                    <el-radio v-model="form.sex" label="???">???</el-radio>
                    <el-radio v-model="form.sex" label="???">???</el-radio>
                    <el-radio v-model="form.sex" label="??????">??????</el-radio>
                </el-form-item>
                <el-form-item label="??????">
                    <el-input type="textarea" v-model="form.address" style="width: 80%"></el-input>
                </el-form-item>
<!--                <el-form-item label="????????????">-->
<!--                    <el-input v-model="form.account" style="width: 80%"></el-input>-->
<!--                </el-form-item>-->
            </el-form>
            <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">??? ???</el-button>
            <el-button type="primary" @click="save">??? ???</el-button>
          </span>
            </template>
        </el-dialog>
    </div>
</template>

<style scoped>

</style>
