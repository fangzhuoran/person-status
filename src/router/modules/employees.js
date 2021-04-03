// 导出属于员工的路由规则
import Layout from '@/layout'
export default {
  // !每个子模块都是layout下面的二级路由模块，
  path: '/employees',
  // name: 'employees',
  meta: {
    name: 'employees'
  },
  component: Layout, // !所以这里的layout是一级路由
  children: [
    {
      path: '', // !当这里的path什么都不写的时候，默认的就是layout的二级路由
      component: () => import('@/views/employees'), // !这里用路由懒加载
      meta: {
        title: '员工管理', // !meta里面的属性的属性可以随便定义的 ，这里为什么要用title呢，主要左侧的导航栏会读取我们meta里面的属性来做为导航菜单的名称
        icon: 'people'
      },
      name: 'employees'
    },
    {
      path: 'detail/:id',
      component: () => import('@/views/employees/detail'),
      hidden: true,
      meta: {
        title: '员工详情'
      }
    },
    {
      path: 'print/:id', // 二级默认路由
      component: () => import('@/views/employees/print'), // 按需加载
      hidden: true,
      meta: {
        title: '打印', // 标记当前路由规则的中文名称 后续在做左侧菜单时 使用
        icon: 'people'
      }
    }
  ]
}
