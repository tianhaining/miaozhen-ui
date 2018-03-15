<template>
  <li
    class="mz-dropdown-menu__item"
    :class="{
      'is-disabled': disabled,
      'mz-dropdown-menu__item--divided': divided
    }"
    @click="handleClick"
    :aria-disabled="disabled"
    :tabindex="disabled ? null : -1"
  >
    <slot></slot>
  </li>
</template>
<script>
  import Emitter from '@/mixins/emitter';

  export default {
    name: 'MzDropdownItem',

    mixins: [Emitter],

    props: {
      command: {},
      disabled: Boolean,
      divided: Boolean
    },

    methods: {
      handleClick(e) {
        this.dispatch('MzDropdown', 'menu-item-click', [this.command, this]);
      }
    }
  };
</script>
