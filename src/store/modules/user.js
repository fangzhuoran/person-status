import {
  getToken,
  setToken,
  removeToken,
  setTimeStamp /* 存入时间戳*/
} from '@/utils/auth'
import { login, getUserInfo, getUserDetailById } from '@/api/user'
import { resetRouter } from '@/router'
export default {
  namespaced: true,
  state: {
    token: getToken(), // !初始状态就先从本地里面取到token
    userInfo: {}
  },
  mutations: {
    setToken(state, token) {
      state.token = token // !这里只是state设置token
      setToken(token)
    },
    removeToken(state) {
      state.token = null // !先删除vuex里面的token
      removeToken() // !在删除token同步到缓存
    },
    // 设置用户信息
    setUserInfo(state, result) {
      state.userInfo = result
      // state.userInfo = { ...result } // 用 浅拷贝的方式去赋值对象 因为这样数据更新之后，才会触发组件的更新
    },
    // 删除用户信息
    reomveUserInfo(state) {
      state.userInfo = {}
    }
  },
  actions: {
    async login(context, data) {
      // !调用接口，发起请求
      const result = await login(data)
      // !只有登录状态成功才改变state的token并存在本地
      context.commit('setToken', result)
      setTimeStamp() // !在用户登录以后存入一个时间戳
    },
    async getUserInfo(context) {
      const result = await getUserInfo()
      const baseInfo = await getUserDetailById(result.userId)
      context.commit('setUserInfo', { ...result, ...baseInfo })
      return result // 这里为什么要返回 为后面埋下伏笔
    },
    // 登出功能
    logout(context) {
      context.commit('removeToken')
      context.commit('reomveUserInfo')
      resetRouter()
      // 还有一步  vuex中的数据是不是还在
      // 要清空permission模块下的state数据
      // vuex中 user子模块  permission子模块
      // 子模块调用子模块的action  默认情况下 子模块的context是子模块的
      // 父模块 调用 子模块的action
      context.commit('permission/setRoutes', [], { root: true })
      // !子模块调用子模块的action 可以 将 commit的第三个参数 设置成  { root: true } 就表示当前的context不是子模块了 而是父模块
    }
  }
}
