<template>
  <div class="mz-breadcrumb">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'MzBreadcrumb',

    props: {
      separator: {
        type: String,
        default: '/'
      }
    }
  };
</script>
<style lang="less">
.mz-breadcrumb {
  font-size: 14px;
  font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
  font-weight: 400;
  color: #b0b2b8;
  &__item {
    cursor: pointer;
  }
  &__item:last-child {
    color: #606266;
    .mz-breadcrumb__separator {
      display: none;
    }
  }
}
</style>
