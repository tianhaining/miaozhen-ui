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
        'is-plain': plain,
        'is-round': round
      }
    ]"
  >
    <i class="mz-icon-loading" v-if="loading"></i>
    <i :class="'mz-icon-' + icon" v-if="icon && !loading"></i>
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>

<script>
import '../theme-default/icon.css'
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
    round: Boolean,
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
  border-radius: 4px;
}
.mz-button {
  padding: 8px 16px;
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

  &--secondary {
    .button-style(white, #b0b2b8, 1px solid #e7e7e9)
  }
  &--secondary:hover {
    .button-style(white, @hoverColor, 1px solid @hoverColor)
  }
  &--secondary:active {
    .button-style(white, @activeColor, 1px solid @activeColor)
  }

  &--dashed {
    .button-style(white, #b0b2b8, 1px dashed #e7e7e9);
  }
  &--dashed:hover {
    .button-style(white, @hoverColor, 1px dashed @hoverColor)
  }
  &--dashed:active {
    .button-style(white, @activeColor, 1px dashed @activeColor)
  }

  &--text {
    .button-style(white, @color, 0px solid @color)
  }
  &--text:hover {
    .button-style(white, @hoverColor, 0px solid @hoverColor)
  }
  &--text:active {
    .button-style(white, @activeColor, 0px solid @activeColor)
  }

  &--medium {
    padding: 7px 15px;
    font-size: 12px;
  }

  &--small {
    padding: 6px 14px;
    font-size: 11px;
  }
}
.mz-button.is-round {
  border-radius: 20px;
}
.mz-button.is-disabled {
  cursor: not-allowed;
  .button-style(#e2e1e1, #b0b2b8, 1px solid #e2e1e1)
}
</style>
