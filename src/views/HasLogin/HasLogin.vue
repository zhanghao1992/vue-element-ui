<template>
  <div class="">
    欢迎 <strong>{{name}}</strong> 登录！您的登录密码是<strong>{{user.password}}</strong>
    <div>
      <a href="javascript:void(0);" @click="loginOut">退出登录</a>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapGetters, mapMutations } from 'vuex'

  export default {
    data () {
      return {
        name: ''
      }
    },
    mounted () {
      this.name = this.$session.get('name')
//    console.log(this.$router)
    },
    computed: {
      ...mapGetters(['user'])
    },
    methods: {
      loginOut () {
        const WL = window.localStorage
        WL.removeItem('userInfo')
        this.$router.push('/login')
      },
      ...mapMutations(['EXIT'])
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
