<template>
  <div class="">
    <img class="captcha" :src="src" @click="switchCaptcha">
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      src: `/node_common/captcha?_=${new Date().getTime()}`
    }
  },
  created () {
    this.switchCaptcha()
  },
  methods: {
    switchCaptcha () {
//      this.$http.get(`/connect_service/apply/createCaptcha?_=${new Date().getTime()}`).then(json => {
      this.$http.get('/node_common/captcha').then(json => {
        const res = json.data
        if (res.code === 0) {
          this.src = `data:img/png;base64,${res.response.base64String}`
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.captcha {
  width: 200px;
  height: 60px;
}
</style>
