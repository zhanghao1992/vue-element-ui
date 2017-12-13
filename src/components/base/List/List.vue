<template>
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
      <tr v-for="(item, index) in listData" :key="index">
        <td>{{ index + 1 }}</td>
        <td>{{ item.name }}</td>
      </tr>
      </tbody>
    </slot>
  </table>
</template>

<script>
  export default {
    props: {
      listData: {
        type: Array,
        default: []
      }
    },
    data () {
      return {}
    },
    methods: {},
    components: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
