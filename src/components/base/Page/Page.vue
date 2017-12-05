<template>
  <div>
    <a href="javascript:void(0);" v-for="(pageItem,index) in totalPage"
       @click="pageChange(pageItem)" :class="{'active':pageItem===page}">{{ pageItem }}</a>
    <slot>
      <span>总共{{ total }}条数据</span>
    </slot>
  </div>
</template>

<script>
  export default {
    props: {
      page: {
        type: Number,
        default: 1
      },
      page_size: {
        type: Number,
        default: 5
      },
      total: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {}
    },
    computed: {
      totalPage () {
        return Math.ceil(this.total / this.page_size)
      }
    },
    methods: {
      pageChange (page) {
//        alert(page)
        this.$emit('tabPage', page)
      }
    },
    components: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .active {
    color: red;
  }
</style>
