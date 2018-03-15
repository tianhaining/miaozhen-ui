<template>
  <transition name="mz-zoom-in-top" @after-leave="doDestroy">
    <div
      v-show="showPopper"
      class="mz-autocomplete-suggestion mz-popper"
      :class="{ 'is-loading': parent.loading }"
      :style="{ width: dropdownWidth }"
      role="region"
    >
      <el-scrollbar
        tag="ul"
        wrap-class="mz-autocomplete-suggestion__wrap"
        view-class="mz-autocomplete-suggestion__list"
      >
        <li v-if="parent.loading"><i class="mz-icon-loading"></i></li>
        <slot v-else>
        </slot>
      </el-scrollbar>
    </div>
  </transition>
</template>
<script>
  import Popper from '@/utils/vue-popper';
  import Emitter from '@/mixins/emitter';
  import MzScrollbar from '@components/scrollbar';

  export default {
    components: { ElScrollbar },
    mixins: [Popper, Emitter],

    componentName: 'MzAutocompleteSuggestions',

    data() {
      return {
        parent: this.$parent,
        dropdownWidth: ''
      };
    },

    props: {
      options: {
        default() {
          return {
            gpuAcceleration: false
          };
        }
      },
      id: String
    },

    methods: {
      select(item) {
        this.dispatch('MzAutocomplete', 'item-click', item);
      }
    },

    updated() {
      this.$nextTick(_ => {
        this.updatePopper();
      });
    },

    mounted() {
      this.$parent.popperElm = this.popperElm = this.$el;
      this.referenceElm = this.$parent.$refs.input.$refs.input;
      this.referenceList = this.$el.querySelector('.mz-autocomplete-suggestion__list');
      this.referenceList.setAttribute('role', 'listbox');
      this.referenceList.setAttribute('id', this.id);
    },

    created() {
      this.$on('visible', (val, inputWidth) => {
        this.dropdownWidth = inputWidth + 'px';
        this.showPopper = val;
      });
    }
  };
</script>
