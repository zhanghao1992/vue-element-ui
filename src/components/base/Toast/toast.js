const Toast = {}
const showToast = false

Toast.install = (Vue, options) => {
  Vue.prototype.$toast = (options) => {
    const opt = {
      type: 'success',
      tip: '',
      duration: 2000
    }
    for (const option in options) {
      opt[option] = options[option]
    }
    if (showToast) {
      return
    }
    let ToastTpl = Vue.extend({
      data () {
        return {
          show: showToast,
          type: opt.type,
          tip: opt.tip
        }
      },
      template: `<div class="vue-toast"><p :class="this.type">{{this.tip}}</p></div>`
    })
    const toastVM = new ToastTpl()
    let tpl = toastVM.$mount().$el
    document.body.appendChild(tpl)
    // setTimeout(() => {
    //   document.body.removeChild(tpl)
    // }, opt.duration)
  }
}
module.exports = Toast
