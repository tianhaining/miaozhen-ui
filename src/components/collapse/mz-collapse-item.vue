<template>
  <div class="mz-collapse-item" :class="{'is-active': isActive}">
    <div
      role="tab"
      :aria-expanded="isActive"
      :aria-controls="`mz-collapse-content-${id}`"
      :aria-describedby ="`mz-collapse-content-${id}`"
    >
      <div
        class="mz-collapse-item__header"
        @click="handleHeaderClick"
        role="button"
        :id="`mz-collapse-head-${id}`"
        tabindex="0"
        @keyup.space.enter.stop="handleEnterClick"
        :class="{'focusing': focusing}"
        @focus="handleFocus"
        @blur="focusing = false"
      >
        <i class="mz-collapse-item__arrow mz-icon-arrow-right"></i>
        <slot name="title">{{title}}</slot>
      </div>
    </div>
    <mz-collapse-transition>
      <div
        class="mz-collapse-item__wrap"
        v-show="isActive"
        role="tabpanel"
        :aria-hidden="!isActive"
        :aria-labelledby="`mz-collapse-head-${id}`"
        :id="`mz-collapse-content-${id}`"
      >
        <div class="mz-collapse-item__content">
          <slot></slot>
        </div>
      </div>
    </mz-collapse-transition>
  </div>
</template>
<script>
  import MzCollapseTransition from '@/transitions/collapse-transition';
  import Emitter from '@/mixins/emitter';
  import { generateId } from '@/utils/util';

  export default {
    name: 'MzCollapseItem',

    componentName: 'MzCollapseItem',

    mixins: [Emitter],

    components: { MzCollapseTransition },

    data() {
      return {
        contentWrapStyle: {
          height: 'auto',
          display: 'block'
        },
        contentHeight: 0,
        focusing: false,
        isClick: false
      };
    },

    inject: ['collapse'],

    props: {
      title: String,
      name: {
        type: [String, Number],
        default() {
          return this._uid;
        }
      }
    },

    computed: {
      isActive() {
        return this.collapse.activeNames.indexOf(this.name) > -1;
      },
      id() {
        return generateId();
      }
    },

    methods: {
      handleFocus() {
        setTimeout(() => {
          if (!this.isClick) {
            this.focusing = true;
          } else {
            this.isClick = false;
          }
        }, 50);
      },
      handleHeaderClick() {
        this.dispatch('MzCollapse', 'item-click', this);
        this.focusing = false;
        this.isClick = true;
      },
      handleEnterClick() {
        this.dispatch('MzCollapse', 'item-click', this);
      }
    }
  };
</script>
