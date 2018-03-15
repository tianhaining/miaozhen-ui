<template>
  <div
    class="mz-row"
    :style="style"
    :class="[
      justify !== 'start' ? 'is-justify-' + justify : '',
      align !== 'top' ? 'is-align-' + align : '',
      {
        'mz-row--flex': type === 'flex'
      }
    ]"
  >
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'MzRow',

    props: {
      gutter: Number,
      type: String,
      justify: {
        type: String,
        default: 'start'
      },
      align: {
        type: String,
        default: 'top'
      }
    },

    computed: {
      style() {
        var ret = {};

        if (this.gutter) {
          ret.marginLeft = `-${this.gutter / 2}px`;
          ret.marginRight = ret.marginLeft;
        }

        return ret;
      }
    }
  };
</script>
<style lang="less">
/*行*/
.mz {
  &-row {
    position: relative;
    box-sizing: border-box;

    &--flex {
      display: flex;
      &:before,
      &:after {
        display: none;
      }
      &.is-justify-center {
        justify-content: center;
      }
      &.is-justify-end {
        justify-content: flex-end;
      }
      &.is-justify-space-between {
        justify-content: space-between;
      }
      &.is-justify-space-around {
        justify-content: space-around;
      }

      &.is-align-middle {
        align-items: center;
      }
      &.is-align-bottom {
        align-items: flex-end;
      }
    }
  }
}

.mz-row:after {/*用于清除浮动*/
     content: ".";
     display:block;
     height: 0;
     clear: both;
     visibility: hidden;
}
/*每一个栅格*/
.mz-col-1, .mz-col-2, .mz-col-3, .mz-col-4, .mz-col-5, .mz-col-6, .mz-col-7, .mz-col-8, .mz-col-9, .mz-col-10, .mz-col-11, .mz-col-12, .mz-col-13, .mz-col-14, .mz-col-15, .mz-col-16, .mz-col-17, .mz-col-18, .mz-col-19, .mz-col-20, .mz-col-21, .mz-col-22, .mz-col-23, .mz-col-24 {
  float: left;
  box-sizing: border-box;
}
.colStyle1(@counter) when (@counter < 25 ) {
  .mz-col-@{counter} {
    width: calc(~"1 / 24 * @{counter} * 100%");
  }
  .mz-col-offset-@{counter} {
    margin-left: calc(~"1 / 24 * @{counter} * 100%");
  }
  .mz-col-pull-@{counter} {
    position: relative;
    right: calc(~"1 / 24 * @{counter} * 100%");
  }
  .mz-col-push-@{counter} {
    position: relative;
    left: calc(~"1 / 24 * @{counter} * 100%");
  }
  .colStyle1(( @counter + 1 ));// 递归调用自身
}
.colStyle1(1);

.colStyle(@sizeNum, @counter) when (@counter < 24 ) {
  .mz-col-@{sizeNum}-@{counter} {
    width: calc(~"1 / 24 * @{counter} * 100%");
  }
  .mz-col-offset-@{sizeNum}-@{counter} {
    margin-left: calc(~"1 / 24 * @{counter} * 100%");
  }
  .mz-col-pull-@{sizeNum}-@{counter} {
    position: relative;
    right: calc(~"1 / 24 * @{counter} * 100%");
  }
  .mz-col-push-@{sizeNum}-@{counter} {
    position: relative;
    left: calc(~"1 / 24 * @{counter} * 100%");
  }
  .colStyle(@sizeNum, ( @counter + 1 ));// 递归调用自身
}
@media (max-width: 768px) {
  .colStyle(xs, 1);
}
@media (min-width: 768px) {
  .colStyle(sm, 1);
}
@media (min-width: 992px) {
  .colStyle(md, 1);
}
@media (min-width: 1200px) {
  .colStyle(lg, 1);
}
</style>
