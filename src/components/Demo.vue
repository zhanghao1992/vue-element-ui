<template>
  <div class="hello">
    jhdjfh
    <upload></upload>
    <!--<my-upload></my-upload>-->
    <captcha></captcha>
  </div>
</template>

<script>
  import Upload from '@/components/Upload/Upload'
  import MyUpload from '@/components/MyUpload/MyUpload'
  import Captcha from '@/components/base/Captcha/Captcha'
  import ToList from '@/components/todoList/todoList'

  export default {
    name: 'HelloWorld',
    data () {
      return {
        value1: 0
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
