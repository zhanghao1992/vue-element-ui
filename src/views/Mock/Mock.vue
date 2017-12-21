<template>
  <div>
    <img v-for="(item,index) in list" :src="item.thumbnail_pic_s" alt="">
  </div>
</template>

<script>
//  import '../../mock'

  export default {
    data () {
      return {
        list: []
      }
    },
    mounted () {
      this.$http.post('/node/user', {
//        name: 'zh'
      }).then(json => {
        const res = json.data
        if (res.code === 0) {

        }
      })

//      this.$http.post('/mock_api/list', {}).then(json => {
//        console.log(json.data)
//        this.list = json.data.response.list
//      })
    },
    methods: {},
    components: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
