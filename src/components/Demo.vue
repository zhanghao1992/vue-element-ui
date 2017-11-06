<template>
  <div class="hello">
    <upload></upload>
    <!--<my-upload></my-upload>-->
  </div>
</template>

<script>
import Upload from '@/components/Upload/Upload'
import MyUpload from '@/components/MyUpload/MyUpload'
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
    ToList
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
