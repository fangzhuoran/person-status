const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token, // !这里给外面的想要访问token的地方一个快捷访问的方式
  name: state => state.user.userInfo.username, // !建立一个对用户名的快捷访问
  userId: state => state.user.userInfo.userId, // !建立一个ID 的快捷访问
  staffPhoto: state => state.user.userInfo.staffPhoto, // !建立一个头像的快捷访问
  companyId: state => state.user.userInfo.companyId, // 建立对于user模块的companyId的快捷访问
  routes: state => state.permission.routes // 导出当前的路由
}
export default getters
