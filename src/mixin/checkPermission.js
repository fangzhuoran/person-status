import store from '@/store'
export default {
  methods: {
    // 次方法为全局注册的mixin方法
    checkPermission(key) {
      // !获取user里的points（标识权限）里的数组和传过来的Key做比较，找到了说明有这权限，没有找到则返回false
      const { userInfo } = store.state.user
      if (userInfo.roles.points && userInfo.roles.points.length) {
        return userInfo.roles.points.some(item => item === key)
      }
      return false
    }
  }
}
