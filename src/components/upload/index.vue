<script>
import UploadList from './upload-list';
import Upload from './upload';
import IframeUpload from './iframe-upload';
import MzProgress from '@/components/progress/mz-progress';
import Migrating from '@/mixins/migrating';

function noop() {}

export default {
  name: 'MzUpload',

  mixins: [Migrating],

  components: {
    MzProgress,
    UploadList,
    Upload,
    IframeUpload
  },

  provide: {
    uploader: this
  },

  props: {
    action: {
      type: String,
      required: true
    },
    headers: {
      type: Object,
      default() {
        return {};
      }
    },
    data: Object,
    multiple: Boolean,
    name: {
      type: String,
      default: 'file'
    },
    drag: Boolean,
    dragger: Boolean,
    withCredentials: Boolean,
    showFileList: {
      type: Boolean,
      default: true
    },
    accept: String,
    type: {
      type: String,
      default: 'select'
    },
    beforeUpload: Function,
    beforeRemove: Function,
    onRemove: {
      type: Function,
      default: noop
    },
    onChange: {
      type: Function,
      default: noop
    },
    onPreview: {
      type: Function
    },
    onSuccess: {
      type: Function,
      default: noop
    },
    onProgress: {
      type: Function,
      default: noop
    },
    onError: {
      type: Function,
      default: noop
    },
    fileList: {
      type: Array,
      default() {
        return [];
      }
    },
    autoUpload: {
      type: Boolean,
      default: true
    },
    listType: {
      type: String,
      default: 'text'   // text,picture,picture-card
    },
    httpRequest: Function,
    disabled: Boolean,
    limit: Number,
    onExceed: {
      type: Function,
      default: noop
    }
  },

  data() {
    return {
      uploadFiles: [],
      dragOver: false,
      draging: false,
      tempIndex: 1
    };
  },

  watch: {
    fileList: {
      immediate: true,
      handler(fileList) {
        this.uploadFiles = fileList.map(item => {
          item.uid = item.uid || (Date.now() + this.tempIndex++);
          item.status = 'success';
          return item;
        });
      }
    }
  },

  methods: {
    handleStart(rawFile) {
      rawFile.uid = Date.now() + this.tempIndex++;
      let file = {
        status: 'ready',
        name: rawFile.name,
        size: rawFile.size,
        percentage: 0,
        uid: rawFile.uid,
        raw: rawFile
      };

      try {
        file.url = URL.createObjectURL(rawFile);
      } catch (err) {
        console.error(err);
        return;
      }

      this.uploadFiles.push(file);
      this.onChange(file, this.uploadFiles);
    },
    handleProgress(ev, rawFile) {
      const file = this.getFile(rawFile);
      this.onProgress(ev, file, this.uploadFiles);
      file.status = 'uploading';
      file.percentage = ev.percent || 0;
    },
    handleSuccess(res, rawFile) {
      const file = this.getFile(rawFile);

      if (file) {
        file.status = 'success';
        file.response = res;

        this.onSuccess(res, file, this.uploadFiles);
        this.onChange(file, this.uploadFiles);
      }
    },
    handleError(err, rawFile) {
      const file = this.getFile(rawFile);
      const fileList = this.uploadFiles;

      file.status = 'fail';

      fileList.splice(fileList.indexOf(file), 1);

      this.onError(err, file, this.uploadFiles);
      this.onChange(file, this.uploadFiles);
    },
    handleRemove(file, raw) {
      if (raw) {
        file = this.getFile(raw);
      }
      let doRemove = () => {
        this.abort(file);
        let fileList = this.uploadFiles;
        fileList.splice(fileList.indexOf(file), 1);
        this.onRemove(file, fileList);
      };

      if (!this.beforeRemove) {
        doRemove();
      } else if (typeof this.beforeRemove === 'function') {
        const before = this.beforeRemove(file, this.uploadFiles);
        if (before && before.then) {
          before.then(() => {
            doRemove();
          }, noop);
        } else if (before !== false) {
          doRemove();
        }
      }
    },
    getFile(rawFile) {
      let fileList = this.uploadFiles;
      let target;
      fileList.every(item => {
        target = rawFile.uid === item.uid ? item : null;
        return !target;
      });
      return target;
    },
    abort(file) {
      this.$refs['upload-inner'].abort(file);
    },
    clearFiles() {
      this.uploadFiles = [];
    },
    submit() {
      this.uploadFiles
        .filter(file => file.status === 'ready')
        .forEach(file => {
          this.$refs['upload-inner'].upload(file.raw);
        });
    },
    getMigratingConfig() {
      return {
        props: {
          'default-file-list': 'default-file-list is renamed to file-list.',
          'show-upload-list': 'show-upload-list is renamed to show-file-list.',
          'thumbnail-mode': 'thumbnail-mode has been deprecated, you can implement the same effect according to this case: http://element.eleme.io/#/zh-CN/component/upload#yong-hu-tou-xiang-shang-chuan'
        }
      };
    }
  },

  render(h) {
    let uploadList;

    if (this.showFileList) {
      uploadList = (
        <UploadList
          disabled={this.disabled}
          listType={this.listType}
          files={this.uploadFiles}
          on-remove={this.handleRemove}
          handlePreview={this.onPreview}>
        </UploadList>
      );
    }

    const uploadData = {
      props: {
        type: this.type,
        drag: this.drag,
        action: this.action,
        multiple: this.multiple,
        'before-upload': this.beforeUpload,
        'with-credentials': this.withCredentials,
        headers: this.headers,
        name: this.name,
        data: this.data,
        accept: this.accept,
        fileList: this.uploadFiles,
        autoUpload: this.autoUpload,
        listType: this.listType,
        disabled: this.disabled,
        limit: this.limit,
        'on-exceed': this.onExceed,
        'on-start': this.handleStart,
        'on-progress': this.handleProgress,
        'on-success': this.handleSuccess,
        'on-error': this.handleError,
        'on-preview': this.onPreview,
        'on-remove': this.handleRemove,
        'http-request': this.httpRequest
      },
      ref: 'upload-inner'
    };

    const trigger = this.$slots.trigger || this.$slots.default;
    const uploadComponent = (typeof FormData !== 'undefined' || this.$isServer)
        ? <upload {...uploadData}>{trigger}</upload>
        : <iframeUpload {...uploadData}>{trigger}</iframeUpload>;

    return (
      <div>
        { this.listType === 'picture-card' ? uploadList : ''}
        {
          this.$slots.trigger
          ? [uploadComponent, this.$slots.default]
          : uploadComponent
        }
        {this.$slots.tip}
        { this.listType !== 'picture-card' ? uploadList : ''}
      </div>
    );
  }
};
</script>
<style lang="less">
@charset "UTF-8";
.mz-upload {
  display: inline-block;
  text-align: center;
  cursor: pointer;
  outline: none;
  /* 照片墙模式 */ }
  .mz-upload__input {
    display: none; }
  .mz-upload__tip {
    font-size: 12px;
    color: #606266;
    margin-top: 7px; }
  .mz-upload iframe {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    opacity: 0;
    filter: alpha(opacity=0); }
  .mz-upload--picture-card {
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    box-sizing: border-box;
    width: 148px;
    height: 148px;
    cursor: pointer;
    line-height: 146px;
    vertical-align: top; }
    .mz-upload--picture-card i {
      font-size: 28px;
      color: #8c939d; }
    .mz-upload--picture-card:hover {
      border-color: #ff4e4e;
      color: #ff4e4e; }
  .mz-upload:focus {
    border-color: #ff4e4e;
    color: #ff4e4e; }
    .mz-upload:focus .mz-upload-dragger {
      border-color: #ff4e4e; }

.mz-upload-dragger {
  background-color: #fff;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  box-sizing: border-box;
  width: 360px;
  height: 180px;
  text-align: center;
  cursor: pointer;
  position: relative;
  overflow: hidden; }
  .mz-upload-dragger .mz-icon-upload {
    font-size: 67px;
    color: #c0c4cc;
    margin: 40px 0 16px;
    line-height: 50px; }
  .mz-upload-dragger + .mz-upload__tip {
    text-align: center; }
  .mz-upload-dragger ~ .mz-upload__files {
    border-top: 1px solid #dcdfe6;
    margin-top: 7px;
    padding-top: 5px; }
  .mz-upload-dragger .mz-upload__text {
    color: #606266;
    font-size: 14px;
    text-align: center; }
    .mz-upload-dragger .mz-upload__text em {
      color: #ff4e4e;
      font-style: normal; }
  .mz-upload-dragger:hover {
    border-color: #ff4e4e; }
  .mz-upload-dragger.is-dragover {
    background-color: rgba(32, 159, 255, 0.06);
    border: 2px dashed #ff4e4e; }

.mz-upload-list {
  margin: 0;
  padding: 0;
  list-style: none; }
  .mz-upload-list__item {
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
    font-size: 14px;
    color: #606266;
    line-height: 1.8;
    margin-top: 5px;
    position: relative;
    box-sizing: border-box;
    border-radius: 4px;
    width: 100%; }
    .mz-upload-list__item .mz-progress {
      position: absolute;
      top: 20px;
      width: 100%; }
    .mz-upload-list__item .mz-progress__text {
      position: absolute;
      right: 0;
      top: -13px; }
    .mz-upload-list__item .mz-progress-bar {
      margin-right: 0;
      padding-right: 0; }
    .mz-upload-list__item:first-child {
      margin-top: 10px; }
    .mz-upload-list__item .mz-icon-upload-success {
      color: #67c23a; }
    .mz-upload-list__item .mz-icon-close {
      display: none;
      position: absolute;
      top: 5px;
      right: 5px;
      cursor: pointer;
      opacity: .75;
      color: #606266; }
      .mz-upload-list__item .mz-icon-close:hover {
        opacity: 1; }
    .mz-upload-list__item .mz-icon-close-tip {
      display: none;
      position: absolute;
      top: 5px;
      right: 5px;
      font-size: 12px;
      cursor: pointer;
      opacity: 1;
      color: #ff4e4e; }
    .mz-upload-list__item:hover {
      background-color: #f5f7fa; }
      .mz-upload-list__item:hover .mz-icon-close {
        display: inline-block; }
      .mz-upload-list__item:hover .mz-progress__text {
        display: none; }
    .mz-upload-list__item.is-success .mz-upload-list__item-status-label {
      display: block; }
    .mz-upload-list__item.is-success .mz-upload-list__item-name:hover, .mz-upload-list__item.is-success .mz-upload-list__item-name:focus {
      color: #ff4e4e;
      cursor: pointer; }
    .mz-upload-list__item.is-success:focus:not(:hover) {
      /* 键盘focus */ }
      .mz-upload-list__item.is-success:focus:not(:hover) .mz-icon-close-tip {
        display: inline-block; }
    .mz-upload-list__item.is-success:not(.focusing):focus, .mz-upload-list__item.is-success:active {
      /* click时 */
      outline-width: 0; }
      .mz-upload-list__item.is-success:not(.focusing):focus .mz-icon-close-tip, .mz-upload-list__item.is-success:active .mz-icon-close-tip {
        display: none; }
    .mz-upload-list__item.is-success:hover .mz-upload-list__item-status-label, .mz-upload-list__item.is-success:focus .mz-upload-list__item-status-label {
      display: none; }
  .mz-upload-list.is-disabled .mz-upload-list__item:hover .mz-upload-list__item-status-label {
    display: block; }
  .mz-upload-list__item-name {
    color: #606266;
    display: block;
    margin-right: 40px;
    overflow: hidden;
    padding-left: 4px;
    text-overflow: ellipsis;
    transition: color .3s;
    white-space: nowrap; }
    .mz-upload-list__item-name [class^="el-icon"] {
      height: 100%;
      margin-right: 7px;
      color: #909399;
      line-height: inherit; }
  .mz-upload-list__item-status-label {
    position: absolute;
    right: 5px;
    top: 0;
    line-height: inherit;
    display: none; }
  .mz-upload-list__item-delete {
    position: absolute;
    right: 10px;
    top: 0;
    font-size: 12px;
    color: #606266;
    display: none; }
    .mz-upload-list__item-delete:hover {
      color: #ff4e4e; }
  .mz-upload-list--picture-card {
    margin: 0;
    display: inline;
    vertical-align: top; }
    .mz-upload-list--picture-card .mz-upload-list__item {
      overflow: hidden;
      background-color: #fff;
      border: 1px solid #c0ccda;
      border-radius: 6px;
      box-sizing: border-box;
      width: 148px;
      height: 148px;
      margin: 0 8px 8px 0;
      display: inline-block; }
      .mz-upload-list--picture-card .mz-upload-list__item .mz-icon-check,
      .mz-upload-list--picture-card .mz-upload-list__item .mz-icon-circle-check {
        color: #fff; }
      .mz-upload-list--picture-card .mz-upload-list__item .mz-icon-close {
        display: none; }
      .mz-upload-list--picture-card .mz-upload-list__item:hover .mz-upload-list__item-status-label {
        display: none; }
      .mz-upload-list--picture-card .mz-upload-list__item:hover .mz-progress__text {
        display: block; }
    .mz-upload-list--picture-card .mz-upload-list__item-name {
      display: none; }
    .mz-upload-list--picture-card .mz-upload-list__item-thumbnail {
      width: 100%;
      height: 100%; }
    .mz-upload-list--picture-card .mz-upload-list__item-status-label {
      position: absolute;
      right: -15px;
      top: -6px;
      width: 40px;
      height: 24px;
      background: #13ce66;
      text-align: center;
      transform: rotate(45deg);
      box-shadow: 0 0 1pc 1px rgba(0, 0, 0, 0.2); }
      .mz-upload-list--picture-card .mz-upload-list__item-status-label i {
        font-size: 12px;
        margin-top: 11px;
        transform: rotate(-45deg); }
    .mz-upload-list--picture-card .mz-upload-list__item-actions {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      cursor: default;
      text-align: center;
      color: #fff;
      opacity: 0;
      font-size: 20px;
      background-color: rgba(0, 0, 0, 0.5);
      transition: opacity .3s; }
      .mz-upload-list--picture-card .mz-upload-list__item-actions::after {
        display: inline-block;
        content: "";
        height: 100%;
        vertical-align: middle; }
      .mz-upload-list--picture-card .mz-upload-list__item-actions span {
        display: none;
        cursor: pointer; }
      .mz-upload-list--picture-card .mz-upload-list__item-actions span + span {
        margin-left: 15px; }
      .mz-upload-list--picture-card .mz-upload-list__item-actions .mz-upload-list__item-delete {
        position: static;
        font-size: inherit;
        color: inherit; }
      .mz-upload-list--picture-card .mz-upload-list__item-actions:hover {
        opacity: 1; }
        .mz-upload-list--picture-card .mz-upload-list__item-actions:hover span {
          display: inline-block; }
    .mz-upload-list--picture-card .mz-progress {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      bottom: auto;
      width: 126px; }
      .mz-upload-list--picture-card .mz-progress .mz-progress__text {
        top: 50%; }
  .mz-upload-list--picture .mz-upload-list__item {
    overflow: hidden;
    background-color: #fff;
    border: 1px solid #c0ccda;
    border-radius: 6px;
    box-sizing: border-box;
    margin-top: 10px;
    padding: 10px 10px 10px 90px;
    height: 92px; }
    .mz-upload-list--picture .mz-upload-list__item .mz-icon-check,
    .mz-upload-list--picture .mz-upload-list__item .mz-icon-circle-check {
      color: #fff; }
    .mz-upload-list--picture .mz-upload-list__item:hover .mz-upload-list__item-status-label {
      background: transparent;
      box-shadow: none;
      top: -2px;
      right: -12px; }
    .mz-upload-list--picture .mz-upload-list__item:hover .mz-progress__text {
      display: block; }
    .mz-upload-list--picture .mz-upload-list__item.is-success .mz-upload-list__item-name {
      line-height: 70px;
      margin-top: 0; }
      .mz-upload-list--picture .mz-upload-list__item.is-success .mz-upload-list__item-name i {
        display: none; }
  .mz-upload-list--picture .mz-upload-list__item-thumbnail {
    vertical-align: middle;
    display: inline-block;
    width: 70px;
    height: 70px;
    float: left;
    position: relative;
    z-index: 1;
    margin-left: -80px; }
  .mz-upload-list--picture .mz-upload-list__item-name {
    display: block;
    margin-top: 20px; }
    .mz-upload-list--picture .mz-upload-list__item-name i {
      font-size: 70px;
      line-height: 1;
      position: absolute;
      left: 9px;
      top: 10px; }
  .mz-upload-list--picture .mz-upload-list__item-status-label {
    position: absolute;
    right: -17px;
    top: -7px;
    width: 46px;
    height: 26px;
    background: #13ce66;
    text-align: center;
    transform: rotate(45deg);
    box-shadow: 0 1px 1px #ccc; }
    .mz-upload-list--picture .mz-upload-list__item-status-label i {
      font-size: 12px;
      margin-top: 12px;
      transform: rotate(-45deg); }
  .mz-upload-list--picture .mz-progress {
    position: relative;
    top: -7px; }

.mz-upload-cover {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 10;
  cursor: default; }
  .mz-upload-cover::after {
    display: inline-block;
    content: "";
    height: 100%;
    vertical-align: middle; }
  .mz-upload-cover img {
    display: block;
    width: 100%;
    height: 100%; }
  .mz-upload-cover__label {
    position: absolute;
    right: -15px;
    top: -6px;
    width: 40px;
    height: 24px;
    background: #13ce66;
    text-align: center;
    transform: rotate(45deg);
    box-shadow: 0 0 1pc 1px rgba(0, 0, 0, 0.2); }
    .mz-upload-cover__label i {
      font-size: 12px;
      margin-top: 11px;
      transform: rotate(-45deg);
      color: #fff; }
  .mz-upload-cover__progress {
    display: inline-block;
    vertical-align: middle;
    position: static;
    width: 243px; }
    .mz-upload-cover__progress + .mz-upload__inner {
      opacity: 0; }
  .mz-upload-cover__content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%; }
  .mz-upload-cover__interact {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.72);
    text-align: center; }
    .mz-upload-cover__interact .btn {
      display: inline-block;
      color: #fff;
      font-size: 14px;
      cursor: pointer;
      vertical-align: middle;
      transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1) 100ms, opacity 300ms cubic-bezier(0.23, 1, 0.32, 1) 100ms;
      margin-top: 60px; }
      .mz-upload-cover__interact .btn i {
        margin-top: 0; }
      .mz-upload-cover__interact .btn span {
        opacity: 0;
        transition: opacity .15s linear; }
      .mz-upload-cover__interact .btn:not(:first-child) {
        margin-left: 35px; }
      .mz-upload-cover__interact .btn:hover {
        transform: translateY(-13px); }
        .mz-upload-cover__interact .btn:hover span {
          opacity: 1; }
      .mz-upload-cover__interact .btn i {
        color: #fff;
        display: block;
        font-size: 24px;
        line-height: inherit;
        margin: 0 auto 5px; }
  .mz-upload-cover__title {
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: #fff;
    height: 36px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: normal;
    text-align: left;
    padding: 0 10px;
    margin: 0;
    line-height: 36px;
    font-size: 14px;
    color: #303133; }
  .mz-upload-cover + .mz-upload__inner {
    opacity: 0;
    position: relative;
    z-index: 1; }
</style>
