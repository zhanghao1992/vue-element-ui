<template>
  <div class="uplaod">
    <el-button type="primary" @click="addPlupload" ref="addPlupload" id="addPlupload">上传照片</el-button>
    <el-row :gutter="20">
      <el-col :span="4" v-for="(item, index) in fileArr" :key="index">
        <el-card :body-style="{ padding: '0px' }">
          <img :src="item.fileSrc" class="image">
          <div style="padding: 14px;">
            <span>{{item.fileName}}</span>
            <div class="bottom clearfix">
              <!--<time class="time">{{ currentDate }}</time>-->
              <el-button type="text" class="button">操作按钮</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<!--<script src="plupload.min.js"></script>-->
<script type="text/ecmascript-6">

export default {
  name: '',
  data () {
    return {
      fileArr: [
        {
          fileName: 'xx',
          fileSrc: require('./demo.jpg')
        },
        {
          fileName: 'xx',
          fileSrc: require('./demo.jpg')
        },
        {
          fileName: 'xx',
          fileSrc: require('./demo.jpg')
        }
      ]
    }
  },
  mounted () {},
  methods: {
    addPlupload () {
    }
//    _upload () {
//      this.$jsonp('', {
//        name: 'MyName'
//      }).then(json => {
//        // Success.
//      }).catch(err => {
//        // Failed.
//      })
//    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.image {
  height: 200px;
}
</style>
