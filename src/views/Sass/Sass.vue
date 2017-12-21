<template>
  <div class="test">sass</div>
</template>

<script>
  export default {
    data () {
      return {}
    },
    methods: {},
    components: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "../../assets/scss/common";

  $color: (light:#fff, dark:#000);
  $bg: red;
  @function color($key) {
    @return map_get($color, $key);
  }

  .test {
    background-color: $bg;
    color: color(dark);
  }
</style>
