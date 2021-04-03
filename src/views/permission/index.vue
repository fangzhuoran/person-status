<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <page-tools>
          <template v-slot:after>
            <el-button
              type="primary"
              size="small"
              @click="addPermission('0', 1)"
            >
              添加权限
              <!-- 这里添加的是根节点，所以pid写0，type为1 -->
            </el-button>
          </template>
        </page-tools>
        <!-- 树形表格  里面的子节点，需要用children装起来,必须拥有row-key-->
        <el-table
          :data="tableData"
          style="width: 100%;margin-bottom: 20px;"
          row-key="id"
          border
          default-expand-all
        >
          <el-table-column
            prop="name"
            label="菜单名称"
            width="180"
            align="left"
          >
          </el-table-column>
          <el-table-column
            prop="code"
            label="标识权限"
            width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="description" label="描述" align="center">
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="{ row }">
              <el-button
                v-if="row.type === 1"
                type="text"
                @click="addPermission(row.id, 2)"
                >添加</el-button
              >
              <el-button type="text" @click="editPermission(row.id)"
                >编辑</el-button
              >
              <el-button type="text" @click="delPermission(row.id)">
                删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <!-- 放置一个弹层 用来编辑新增节点 -->
      <el-dialog
        :title="`${showText}权限点`"
        :visible.sync="showDialog"
        @close="btnCancel"
      >
        <!-- 表单 -->
        <el-form
          ref="perForm"
          :model="formData"
          :rules="rules"
          label-width="120px"
        >
          <el-form-item label="权限名称" prop="name">
            <el-input v-model="formData.name" style="width:90%" />
          </el-form-item>
          <el-form-item label="权限标识" prop="code">
            <el-input v-model="formData.code" style="width:90%" />
          </el-form-item>
          <el-form-item label="权限描述">
            <el-input v-model="formData.description" style="width:90%" />
          </el-form-item>
          <el-form-item label="开启">
            <el-switch
              v-model="formData.enVisible"
              active-value="1"
              inactive-value="0"
            />
          </el-form-item>
        </el-form>
        <el-row slot="footer" type="flex" justify="center">
          <el-col :span="6">
            <el-button size="small" type="primary" @click="btnOK">
              确定
            </el-button>
            <el-button size="small" @click="btnCancel">取消</el-button>
          </el-col>
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  updatePermission,
  addPermission,
  getPermissionDetail,
  delPermission,
  getPermissionList
} from '@/api/permisson'
import { tranListToTree } from '@/utils'
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      TreeProps: { children: 'children', lable: 'name' },
      tableData: [], //这里需要是数组，不然会报错
      formData: {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0' // 开启
      },
      rules: {
        name: [
          { required: true, message: '权限名称不能为空', trigger: 'blur' }
        ],
        code: [{ required: true, message: '权限标识不能为空', trigger: 'blur' }]
      },
      showDialog: false
    }
  },
  computed: {
    showText() {
      return this.formData.id ? '编辑' : '新增'
    }
  },
  watch: {},
  created() {
    this.getPermissionList()
  },
  mounted() {},
  methods: {
    async getPermissionList() {
      this.tableData = tranListToTree(await getPermissionList(), '0')
      // console.log(this.tableData)
    },
    // 添加
    addPermission(pid, type) {
      this.formData.type = type
      this.formData.pid = pid
      this.showDialog = true
    },
    // 修改
    async editPermission(id) {
      this.formData = await getPermissionDetail(id)
      this.showDialog = true
    },
    // 删除
    async delPermission(id) {
      try {
        await this.$confirm('确定要删除该数据吗')
        await delPermission(id)
        this.getPermissionList()
        this.$message.success('删除成功')
      } catch (err) {
        console.log(err)
      }
    },
    // 取消按钮
    btnCancel() {
      this.formData = {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0' // 开启
      }
      this.$refs.perForm.resetFields()
      this.showDialog = false
    },
    // 确定按钮
    btnOK() {
      this.$refs.perForm
        .validate()
        .then(() => {
          if (this.formData.id) {
            return updatePermission(this.formData)
          }
          console.log(this.formData)
          return addPermission(this.formData)
        })
        .then(() => {
          this.$message.success('添加成功')
          this.getPermissionList()
          this.showDialog = false
        })
    }
  }
}
</script>

<style scoped lang="less"></style>
