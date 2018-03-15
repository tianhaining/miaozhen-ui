<template lang="html">
  <div class="login">
    <mz-button type="primary" @click="enter">进入</mz-button>
  </div>
</template>

<script>
export default {
  name: 'login',
  data(){
    return {

    }
  },
  methods: {
    enter(){
      this.$router.push('/home/componentHome/installPage')
    }
  },
  components: {

  }
}
</script>

<style lang="less">
.login {
  margin: 0 auto;
  text-align: center;
  position: relative;
  top: 50%;
  // margin-top: -13.5px;方法1
  transform: translateY(-50%);//方法二css3
}
</style>
