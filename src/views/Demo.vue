<template>
  <div class="hello">
    <!--<upload></upload>-->
    <my-upload></my-upload>
    <captcha></captcha>
    <form action="">
      <input ref="input" type="text" @invalid="fn" oninvalid="setCustomValidity('sdyuas')" pattern="^(0|86|17951)?1[0-9]{10}"/>
    </form>
  </div>
</template>

<script>
import Upload from '@/components/base/Upload/Upload'
import MyUpload from '@/components/base/MyUpload/MyUpload'
import Captcha from '@/components/base/Captcha/Captcha'
import ToList from '@/views/todoList/todoList'

export default {
  name: 'HelloWorld',
  data () {
    return {
      value1: 0
    }
  },
  mounted () {
    this.$http.post('/common/user', {
      name: 'zh'
    }).then(json => {
      const res = json.data
      if (res.code === 0) {

      }
    })
  },
  methods: {
    fn () {
      this.$refs.input.setCustomValidity('xxxxx')
    }
  },
  components: {
    Upload,
    MyUpload,
    Captcha,
    ToList
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
