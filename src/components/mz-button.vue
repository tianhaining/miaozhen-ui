<template lang="html">
  <button :disabled="disabled" class="mz-button"
    @click="handleClick"
    :autofocus="autofocus"
    :type="nativeType"
    :class="[
      type ? 'mz-button--' + type : '',
      size ? 'mz-button--' + size : '',
      {
        'is-disabled': disabled,
        'is-loading': loading,
        'is-plain': plain
      }
    ]"
  >
    <i class="mz-icon-loading" v-if="loading"></i>
    <i :class="'mz-icon-' + icon" v-if="icon && !loading"></i>
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>

<script>
export default {
  name: 'MzButton',
  data () {
    return {

    }
  },
  props: {
    type: {
      type: String,
      default: 'default'
    },
    size: String,
    icon: {
      type: String,
      default: ''
    },
    nativeType: {
      type: String,
      default: 'button'
    },
    loading: Boolean,
    disabled: Boolean,
    plain: Boolean,
    autofocus: Boolean
  },
  methods: {
    handleClick(evt) {
      this.$emit('click', evt);
    }
  }
}
</script>

<style lang="less">
@color: #eb3332;
@hoverColor: #ff4e4e;
@activeColor: #d61918;
.button-style (@background, @fontColor, @border){
  background-color: @background;
  color: @fontColor;
  border: @border;
  outline: none;
}
.mz-button {
  padding: .5rem 1rem;
  cursor: pointer;
  &--primary {
    .button-style(@color, white, 1px solid @color)
  }
  &--primary:hover {
    .button-style(@hoverColor, white, 1px solid @hoverColor)
  }
  &--primary:active {
    .button-style(@activeColor, white, 1px solid @activeColor)
  }
}
</style>
