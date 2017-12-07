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
      <slot name="t-body">
        <tbody>
        <tr v-for="(item, index) in tableData" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ item.name }}</td>
        </tr>
        </tbody>
      </slot>
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
