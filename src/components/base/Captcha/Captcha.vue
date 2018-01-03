<template>
  <div class="">
    <img class="captcha" :src="src" @click="switchCaptcha">
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        src: '',
        publicKey: ''
      }
    },
    created () {
      this.switchCaptcha()
    },
    methods: {
      switchCaptcha () {
//      this.$http.get(`/connect_service/apply/createCaptcha?_=${new Date().getTime()}`).then(json => {
        this.$http.get(`/node_common/captcha?_=${new Date().getTime()}`, {
//          params: {
//            name: 'zh'
//          }
        }).then(json => {
          const res = json.data
          if (res.code === 0) {
            this.src = `data:img/png;base64,${res.response.base64String}`
            this.publicKey = res.response.publicKey
            this.$emit('setPublicKey', res.response.publicKey)
          }
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .captcha {
    width: 160px;
    height: 100%;
  }
</style>
