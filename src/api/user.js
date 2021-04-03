import request from '@/utils/request'
// !设置登录的接口
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'POST',
    data // !要注意：data是请求体参数，params是路径参数
  })
}
// !设置获取用户资料的接口
export function getUserInfo(token) {
  return request({
    url: '/sys/profile',
    method: 'POST'
  })
}
// !获取用户头像的方法
export function getUserDetailById(id) {
  return request({
    url: `/sys/user/${id}`
  })
}

export function logout() {

}
