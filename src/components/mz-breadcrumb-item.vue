<template>
  <span class="mz-breadcrumb__item">
    <span class="mz-breadcrumb__item__inner" ref="link">
      <i :class="'mz-icon-' + icon" v-if="icon"></i>
      <slot></slot>
    </span>
    <span class="mz-breadcrumb__separator">{{separator}}</span>
  </span>
</template>
<script>
// import '../theme-default/icon.css'
  export default {
    name: 'MzBreadcrumbItem',
    props: {
      to: {},
      replace: Boolean,
      icon: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        separator: ''
      };
    },
    mounted() {
      this.separator = this.$parent.separator;
      var self = this;
      if (this.to) {
        let link = this.$refs.link;
        link.addEventListener('click', _ => {
          let to = this.to;
          self.replace ? self.$router.replace(to)
                       : self.$router.push(to);
        });
      }
    }
  };
</script>
<style lang="less">

</style>
