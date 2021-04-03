<template>
  <el-dialog title="编辑部门" :visible.sync="dialogVisible">
    <el-form ref="addEmployee" :model="formData" :rules="rules">
      <el-form-item label="姓名:" label-width="120px" prop="username">
        <el-input
          v-model="formData.username"
          style="width:80%"
          placeholder="请输入姓名"
        />
      </el-form-item>
      <el-form-item label="手机:" label-width="120px" prop="mobile">
        <el-input
          v-model="formData.mobile"
          style="width:50%"
          placeholder="请输入手机号"
        />
      </el-form-item>
      <el-form-item label="入职时间:" label-width="120px" prop="timeOfEntry">
        <el-date-picker
          v-model="formData.timeOfEntry"
          style="width:60%"
          placeholder="请选择入职时间"
        />
      </el-form-item>
      <el-form-item
        label="聘用形式:"
        label-width="120px"
        prop="formOfEmployment"
      >
        <el-select
          v-model="formData.formOfEmployment"
          style="width:70%"
          placeholder="请选择"
        >
          <el-option
            v-for="item in EmployeeEnum.hireType"
            :key="item.id"
            :value="item.id"
            :label="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="工号:" label-width="120px" prop="workNumber">
        <el-input
          v-model="formData.workNumber"
          style="width:60%"
          placeholder="请输入工号"
        />
      </el-form-item>
      <el-form-item label="部门:" label-width="120px" prop="departmentName">
        <el-input
          v-model="formData.departmentName"
          style="width:70%"
          placeholder="请输入部门"
          @focus="getDepartments"
        />
        <el-tree
          v-if="showTree"
          :data="treeData"
          :props="{ label: 'name' }"
          :default-expand-all="true"
          @node-click="selectNode"
        />
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime" label-width="120px">
        <el-date-picker
          v-model="formData.correctionTime"
          style="width:50%"
          placeholder="请选择转正时间"
        />
      </el-form-item>
    </el-form>
    <!-- footer插槽 -->
    <template v-slot:footer>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" @click="btnCancel">取消</el-button>
          <el-button type="primary" size="small" @click="btnOk">确定</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
import { getDepartments } from '@/api/departments'
import { tranListToTree } from '@/utils'
import { addEmployee } from '@/api/employees'
import EmployeeEnum from '@/api/constant/employees' // 导入枚举JS文件
export default {
  components: {},
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      rules: {
        username: [
          { required: true, message: '用户姓名不能为空', trigger: 'blur' },
          {
            min: 1,
            max: 4,
            message: '用户姓名为1-6位',
            trigger: 'blur'
          }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: '手机号格式不正确',
            trigger: 'blur'
          }
        ],
        formOfEmployment: [
          { required: true, message: '聘用形式不能为空', trigger: 'blur' }
        ],
        workNumber: [
          { required: true, message: '工号不能为空', trigger: 'blur' }
        ],
        departmentName: [
          { required: true, message: '部门不能为空', trigger: 'change' }
        ],
        timeOfEntry: [{ required: true, message: '入职时间', trigger: 'blur' }]
      },
      loading: false,
      treeData: [],
      showTree: false, // 控制树形的显示或者隐藏
      EmployeeEnum
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async getDepartments() {
      this.loading = true
      this.showTree = true
      const { depts } = await getDepartments()
      // 这里用这个tranListToTree方法是将后端给我们的数组转化成树形的格式
      this.treeData = tranListToTree(depts, '')
      this.loading = false
    },
    selectNode(node) {
      this.formData.departmentName = node.name
      this.showTree = false
    },
    async btnOk() {
      try {
        this.loading = true
        await this.$refs.addEmployee.validate() // 校验整个表单
        await addEmployee(this.formData) // 发起请求
        // this.parent 是调用父级实例，这里有了父级实例以后 就可以调用它所有方法，注意这个调用实例需要，需要使用位置
        this.$parent.getEmployeesInfo && this.$parent.getEmployeesInfo()
        // this.$emit('update:dialogVisible', false)
        this.$parent.dialogVisible = false
        this.loading = false
      } catch (error) {
        console.log(error)
      }
    },
    btnCancel() {
      // 重置原来的数据
      this.formData = {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      }
      this.$refs.addEmployee.resetFields() // 重置校验结果
      this.$emit('update:dialogVisible', false)
    }
  }
}
</script>

<style scoped lang="less"></style>
