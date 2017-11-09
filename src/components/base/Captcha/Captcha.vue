<template>
  <div class="">
    <img class="captcha" :src="src" @click="switchCaptcha">
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      src: `/common/captcha?_=${new Date().getTime()}`
    }
  },
  created () {
    this.switchCaptcha()
  },
  methods: {
    switchCaptcha () {
      this.$http.get(`/common/captcha?_=${new Date().getTime()}`).then(json => {
        console.log(json)
        this.src = `data:image/png;base64,${json.data.response.base64String}`
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
