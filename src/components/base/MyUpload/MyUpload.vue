<template>
  <div class="uplaod">
    <el-button type="primary" ref="addPlupload" id="addPlupload">上传照片</el-button>
    <el-row :gutter="20">
      <el-col :span="4" v-for="(item, index) in fileArr" :key="index">
        <el-card :body-style="{ padding: '0px' }">
          <img :src="item.imgUrl" class="image">
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

<script type="text/ecmascript-6">
  import plupload from 'plupload'

  export default {
    name: '',
    data () {
      return {
        fileArr: [
          {
            fileName: 'xx',
            fileMD5: 'd03ee39483656ce1ead26be1facf8056',
            imgUrl: ''
          }
        ]
      }
    },
    mounted () {
      if (this.fileArr) {
        this.fileArr.forEach(item => {
          item.imgUrl = this._getImgUrl(item.fileMD5).then(json => {
            const res = json.data
            if (res.code === 0) {
              item.imgUrl = `data:${res.response.contentType};base64,${res.response.base64String}`
            }
          })
        })
      }
      this._upladerInit()
    },
    methods: {
      _getImgUrl (fileMD5) {
        return this.$http.get('/node_common/getFile', {
          params: {
            fileMD5: fileMD5,
            _: new Date().getTime()
          }
        })
      },
      _upladerInit () {
        const uploader = new plupload.Uploader({
          runtimes: 'html5,flash',
          browse_button: 'addPlupload',
          url: '/node_common/upload',
          file_data_name: 'file',
          filters: {
            max_file_size: '20mb',
            mime_types: [
              {title: 'Image files', extensions: 'jpg,png,jpeg'},
              {title: 'Image files', extensions: 'PGN,sgf'},
              {title: 'Zip files', extensions: 'zip'},
              {title: 'Excel files', extensions: 'xls,xlsx'},
              {title: 'Word files', extensions: 'docx'},
              {title: 'Pdf files', extensions: 'pdf'},
              {title: 'Txt files', extensions: 'txt'}
            ]
          },
          resize: {
            crop: true,
            quality: 10,
            preserve_headers: false
          },
          init: {
            PostInit: () => {
              if (this.fileArr) {}
            },
            FilesAdded: (up, files) => {
              uploader.start()
            },
            FileUploaded: (up, file, res) => {
              const json = JSON.parse(res.response)
              this._getImgUrl(json.response.fileMD5).then(json2 => {
                const res = json2.data
                this.fileArr.push({
                  fileName: json.response.fileName,
                  fileMD5: `${json.response.fileMD5}`,
                  imgUrl: `data:${res.response.contentType};base64,${res.response.base64String}`
                })
              })
            },
            Error: (up, err) => {
              // alert(err.code + ": " + err.message);
              if (err.code === -600) {
                alert('请上传小于20MB的文件')
              } else {
                alert(err.message)
              }
              //                me.clear();
            }
          }
        })
        uploader.init()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .image {
    max-width: 100%;
    height: 200px;
  }
</style>
