<template>
  <div class="hello">
    <!--<upload></upload>-->
    <my-upload></my-upload>

    <!--<table>-->
    <!--<slot name="t-head">-->
    <!--<thead>-->
    <!--<tr>-->
    <!--<th>姓名</th>-->
    <!--<th>年龄</th>-->
    <!--</tr>-->
    <!--</thead>-->
    <!--</slot>-->
    <!--<slot name="t-body">-->
    <!--<tbody>-->
    <!--<tr v-for="(item, index) in listData.list" :key="index">-->
    <!--<td>{{ index + 1 }}</td>-->
    <!--<td>{{ item.name }}</td>-->
    <!--</tr>-->
    <!--</tbody>-->
    <!--</slot>-->
    <!--</table>-->
    <my-table :tableData="listData.list">
      <slot slot="t-head">
        <thead>
        <tr>
          <th>姓名0</th>
          <th>年龄0</th>
        </tr>
        </thead>
      </slot>
      <template scope="scope">
        <td>数据：{{scope}}</td>
        <td>索引：{{scope.$index}}</td>
        <td>姓名：{{scope.row.name}}</td>
        <td>性别：{{scope.row.age}}</td>
      </template>
    </my-table>
    <page :page="listData.page" :page_size="listData.page_size" :total="listData.total" @tabPage="pageClick"></page>
    <captcha style="height: 60px"></captcha>
  </div>
</template>

<script>
  import Upload from '@/components/base/Upload/Upload'
  import MyUpload from '@/components/base/MyUpload/MyUpload'
  import MyTable from '@/components/base/MyTable/MyTable'
  import Page from '@/components/base/Page/Page'
  import Captcha from '@/components/base/Captcha/Captcha'
  import ToList from '@/views/todoList/todoList'

  export default {
    name: '',
    data () {
      return {
        name: 'zh',
        listData: {
          page: 1,
          page_size: 3,
          total: 30,
          list: [
            {
              name: 'zh',
              age: 20
            },
            {
              name: 'zh',
              age: 20
            },
            {
              name: 'zh',
              age: 20
            }
          ]
        }
      }
    },
    mounted () {
      this.$http.post('/node/user', {
        name: 'zh'
      }).then(json => {
        const res = json.data
        if (res.code === 0) {

        }
      })
    },
    methods: {
      fn () {
        this.$refs.input.setCustomValidity('请填入正确的手机号码！')
      },
      pageClick (page) {
        console.log(page)
        this.listData = {
          page: page,
          page_size: 3,
          total: 30,
          list: [
            {
              name: `第${page}页`,
              age: 20
            },
            {
              name: 'zh0',
              age: 20
            },
            {
              name: 'zh0',
              age: 20
            }
          ]
        }
      }
    },
    components: {
      Upload,
      MyUpload,
      MyTable,
      Page,
      Captcha,
      ToList
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import "../assets/css/table.less";
</style>
