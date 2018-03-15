<template>
  <transition-group
    tag="ul"
    :class="[
      'mz-upload-list',
      'mz-upload-list--' + listType,
      { 'is-disabled': disabled }
    ]"
    name="mz-list"
  >
    <li
      v-for="(file, index) in files"
      :class="['mz-upload-list__item', 'is-' + file.status, focusing ? 'focusing' : '']"
      :key="index"
      tabindex="0"
      @keydown.delete="!disabled && $emit('remove', file)"
      @focus="focusing = true"
      @blur="focusing = false"
      @click="focusing = false"
    >
      <img
        class="mz-upload-list__item-thumbnail"
        v-if="file.status !== 'uploading' && ['picture-card', 'picture'].indexOf(listType) > -1"
        :src="file.url" alt=""
      >
      <a class="mz-upload-list__item-name" @click="handleClick(file)">
        <i class="mz-icon-document"></i>{{file.name}}
      </a>
      <label class="mz-upload-list__item-status-label">
        <i :class="{
          'mz-icon-upload-success': true,
          'mz-icon-circle-check': listType === 'text',
          'mz-icon-check': ['picture-card', 'picture'].indexOf(listType) > -1
        }"></i>
      </label>
      <i class="mz-icon-close" v-if="!disabled" @click="$emit('remove', file)"></i>
      <i class="mz-icon-close-tip" v-if="!disabled">{{ t('mz.upload.deleteTip') }}</i> <!--因为close按钮只在li:focus的时候 display, li blur后就不存在了，所以键盘导航时永远无法 focus到 close按钮上-->
      <mz-progress
        v-if="file.status === 'uploading'"
        :type="listType === 'picture-card' ? 'circle' : 'line'"
        :stroke-width="listType === 'picture-card' ? 6 : 2"
        :percentage="parsePercentage(file.percentage)">
      </mz-progress>
      <span class="mz-upload-list__item-actions" v-if="listType === 'picture-card'">
        <span
          class="mz-upload-list__item-preview"
          v-if="handlePreview && listType === 'picture-card'"
          @click="handlePreview(file)"
        >
          <i class="mz-icon-zoom-in"></i>
        </span>
        <span
          v-if="!disabled"
          class="mz-upload-list__item-delete"
          @click="$emit('remove', file)"
        >
          <i class="mz-icon-delete"></i>
        </span>
      </span>
    </li>
  </transition-group>
</template>
<script>
  import Locale from '@/mixins/locale';
  import MzProgress from '@/components/progress/mz-progress';

  export default {
    mixins: [Locale],

    data() {
      return {
        focusing: false
      };
    },
    components: { MzProgress },

    props: {
      files: {
        type: Array,
        default() {
          return [];
        }
      },
      disabled: {
        type: Boolean,
        default: false
      },
      handlePreview: Function,
      listType: String
    },
    methods: {
      parsePercentage(val) {
        return parseInt(val, 10);
      },
      handleClick(file) {
        this.handlePreview && this.handlePreview(file);
      }
    }
  };
</script>
