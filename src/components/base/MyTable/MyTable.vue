<template>
  <div class="list">
    <table>
      <slot name="t-head">
        <thead>
        <tr>
          <th>姓名</th>
          <th>年龄</th>
        </tr>
        </thead>
      </slot>
      <tbody>
      <tr v-for="(item, index) in tableData" :key="index">
        <slot :row="item" :$index="index">
          <td>{{item.name}}</td>
          <td>{{item.age}}</td>
        </slot>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import Page from '@/components/base/Page/Page'

  export default {
    props: {
      tableData: {
        type: Array,
        default: []
      }
    },
    data () {
      return {}
    },
    methods: {
      Page
    },
    components: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
