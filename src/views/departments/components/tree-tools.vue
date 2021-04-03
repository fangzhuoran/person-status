<template>
  <el-row
    type="flex"
    justify="space-between"
    align="middle"
    style="height: 40px;width: 100%"
  >
    <el-col>
      <span>{{ treeNode.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <!-- 两个内容 -->
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col>
          <!-- 下拉菜单 element -->
          <el-dropdown @command="delDepartment">
            <span> 操作<i class="el-icon-arrow-down" /> </span>
            <!-- 下拉菜单 -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                command="add"
                :disabled="!checkPermission('add-depts')"
                >添加子部门</el-dropdown-item
              >
              <el-dropdown-item v-if="!isRoot" command="edit"
                >编辑子部门</el-dropdown-item
              >
              <el-dropdown-item v-if="!isRoot" command="del"
                >删除子部门</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
  <!-- 新增部门的弹出层 -->
</template>

<script>
import { delDepartments } from '@/api/departments'
export default {
  name: 'TreeTools',
  components: {},
  props: {
    treeNode: {
      type: Object,
      required: true
    },
    isRoot: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    delDepartment(type) {
      if (type === 'add') {
        // !添加的操作
        this.$emit('addDpat', this.treeNode)
      } else if (type === 'edit') {
        // !添加的操作
        this.$emit('editDept', this.treeNode)
      } else {
        this.$confirm('是否需要删除该部门?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async () => {
            return await delDepartments(this.treeNode.id)
          })
          .then(() => {
            this.$emit('delDepart')
            this.$message.success('删除成功')
          })
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
