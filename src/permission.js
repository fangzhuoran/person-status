// !权限拦截，导航守卫，路由守卫
import router from '@/router' // !引入路由
import store from '@/store'
import Nprogress from 'nprogress' // 引入进度条
import 'nprogress/nprogress.css' // 引入进度条样式
const whiteList = ['/login', '/404'] // 定义白名单  所有不受权限控制的页面
// 前置守卫
router.beforeEach(async (to, from, next) => {
  Nprogress.start() // 开启进度条
  // 首先判断有没有token
  if (store.getters.token) {
    //! 只有有token的情况下才去获取用户资料
    // 如果有token继续判断是不是去登录页
    if (to.path === '/login') {
      next('/')
    } else {
      if (!store.getters.userId) {
        // !这里要强制将异步任务变成同步任务，否则就会出现还有获取完资料就放行的状态
        const { roles } = await store.dispatch('user/getUserInfo')
        //!这里做动态路由处理,需要传参数（参数为当前id下已经有的权限）
        const routes = await store.dispatch(
          'permission/filterRoutes',
          roles.menus
        )
        router.addRoutes([
          ...routes,
          { path: '*', redirect: '/404', hidden: true }
        ]) // !次方法为动态添加路由，该方法有一个缺陷，下面必须使用next(to.path)
        next(to.path) //! 使用next(to.path)，会中止上面的跳转，再次执行路由导航（再次执行beforeEach和afterEach），那么不写这个，跳转是没有地址的
        // next()
      } else {
        next()
      }
    }
  } else {
    // 如果没有token
    if (whiteList.indexOf(to.path) > -1) {
      // !在白名单放行
      next()
    } else {
      // !不在白名单就跳转登陆页面
      next('/login')
    }
  }
  Nprogress.done() // !手动关闭进度条,为了解决 手动切换地址时  进度条的不关闭的问题
})
// 后置守卫
router.afterEach(() => {
  Nprogress.done() // 关闭进度条
})
