import request from '@/utils/request'
// 获取组织架构的接口
export function getDepartments() {
  return request({
    url: '/company/department'
  })
}
// 获取删除组织架构的接口
export function delDepartments(id) {
  return request({
    url: `/company/department/${id}`
  })
}
// 新增部门的接口
export function addDepartments(data) {
  return request({
    url: '/company/department',
    method: 'POST',
    data
  })
}
// 获取部门详情的接口
export function editDepartDetail(id) {
  return request({
    url: `/company/department/${id}`
  })
}
// 编辑部门的接口
export function updateDepartments(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'PUT',
    data
  })
}
