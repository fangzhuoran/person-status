export const imagerror = {
  // 指令对象 会在当前的dom元素插入到节点之后执行
  // !这个全局filters的作用是，图片能显示的时候读取图片，图片不能读取的时候显示默认图片，dom为axios读取过来的，option为默认的图片
  // !因为是全局注册的筛选器，options的值为，传的值，v-imagerror
  inserted(dom, options) {
    // options是 指令中的变量的解释  其中有一个属性叫做 value
    // dom 表示当前指令作用的dom对象
    // 当图片有地址 但是地址没有加载成功的时候 会报错 会触发图片的一个事件 => onerror
    dom.src = dom.src || options.value
    dom.onerror = function() {
      // 当图片出现异常的时候 会将指令配置的默认图片设置为该图片的内容
      // dom可以注册error事件
      dom.src = options.value // 这里不能写死
    }
  },
  componentUpdated(dom, options) {
    dom.src = dom.src || options.value
  }
}
