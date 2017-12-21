<template>
  <div class="">
    <!--欢迎 <strong>{{user.username}}</strong> 登录！您的登录密码是<strong>{{user.password}}</strong>-->
    <!--<div>-->
    <!--<a href="javascript:void(0);" @click="loginOut">退出登录</a>-->
    <!--</div>-->
    <my-table :tableData="productList">
      <thead slot="t-head">
      <tr>
        <th>名称</th>
        <th>出版社</th>
        <th>单价</th>
      </tr>
      </thead>
      <tr slot-scope="scope">
        <td>{{scope.row.productName}}</td>
        <td>{{scope.row.publishers}}</td>
        <td>{{scope.row.price}}</td>
      </tr>
    </my-table>
    <page :page="page" :page_size="page_size" :total="total" @tabPage="pageClick"></page>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapGetters, mapMutations } from 'vuex'
  import MyTable from '@/components/base/MyTable/MyTable'
  import Page from '@/components/base/Page/Page'

  export default {
    data () {
      return {
        productList: [],
        page: 0,
        page_size: 0,
        total: 0
      }
    },
    mounted () {
      this._getProductList()
    },
    computed: {
      ...mapGetters(['user'])
    },
    methods: {
      _getProductList () {
        this.$http.get(`node/product/getProductList?_=${new Date().getTime()}`, {
          params: {
            page: 1,
            page_size: 10
          }
        }).then(json => {
          const res = json.data
          if (res.code === 0) {
            this.productList = res.response.list
            this.page = res.response.page
            this.page_size = res.response.page_size
            this.total = res.response.total
            console.log(this.productList)
          }
        })
      },
      loginOut () {
        this.$http.post('/node/exit').then((json) => {
          if (json.data.code === 0) {
            this.EXIT()
            this.$router.push('/login')
          }
        })
      },
      ...mapMutations(['EXIT'])
    },
    components: {
      MyTable,
      Page
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
