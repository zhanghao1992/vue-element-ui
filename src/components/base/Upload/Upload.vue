<template>
  <div class="uplaod">
    <el-upload
      class="upload-demo"
      action="/node_common/upload"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      list-type="picture"
      :success="handleSuccess">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        fileList: [
          {
            name: 'food.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          }
        ]
      }
    },
    methods: {
      handleRemove (file, fileList) {
        console.log(file, fileList)
      },
      handlePreview (file) {
        console.log(file)
      },
      handleSuccess (response, file, fileList) {
        console.log(response)
        console.log(file)
        console.log(fileList)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .image {
  }
</style>
