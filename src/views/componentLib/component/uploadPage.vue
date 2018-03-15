<template lang="html">
  <section class="uploadPage">
    <h2>Upload上传</h2>
    <p>通过点击或者拖拽上传文件</p>
    <h3>点击上传</h3>
    <p></p>
    <div class="uploadPage-demo">
      <div class="uploadPage-demo-example">
        <mz-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="3"
          :on-exceed="handleExceed"
          :file-list="fileList">
          <mz-button size="small" type="primary">点击上传</mz-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </mz-upload>
      </div>
      <div class="uploadPage-demo-control">
        <mz-collapse accordion>
          <mz-collapse-item>
            <template slot="title"><i class="header-icon mz-icon-caret-bottom"></i><span>展示代码</span></template>
            <div>
              <pre>
                <code class="hljs language-html"><span class="hljs-tag">&lt;<span class="hljs-name">mz-upload</span>
                  <span class="hljs-attr">class</span>=<span class="hljs-string">"upload-demo"</span>
                  <span class="hljs-attr">action</span>=<span class="hljs-string">"https://jsonplaceholder.typicode.com/posts/"</span>
                  <span class="hljs-attr">:on-preview</span>=<span class="hljs-string">"handlePreview"</span>
                  <span class="hljs-attr">:on-remove</span>=<span class="hljs-string">"handleRemove"</span>
                  <span class="hljs-attr">:before-remove</span>=<span class="hljs-string">"beforeRemove"</span>
                  <span class="hljs-attr">multiple</span>
                  <span class="hljs-attr">:limit</span>=<span class="hljs-string">"3"</span>
                  <span class="hljs-attr">:on-exceed</span>=<span class="hljs-string">"handleExceed"</span>
                  <span class="hljs-attr">:file-list</span>=<span class="hljs-string">"fileList"</span>&gt;</span>
                  <span class="hljs-tag">&lt;<span class="hljs-name">mz-button</span> <span class="hljs-attr">size</span>=<span class="hljs-string">"small"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"primary"</span>&gt;</span>点击上传<span class="hljs-tag">&lt;/<span class="hljs-name">mz-button</span>&gt;</span>
                  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"tip"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"el-upload__tip"</span>&gt;</span>只能上传jpg/png文件，且不超过500kb<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">mz-upload</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
                  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
                    data() {
                      <span class="hljs-keyword">return</span> {
                        <span class="hljs-attr">fileList</span>: [{<span class="hljs-attr">name</span>: <span class="hljs-string">'food.jpeg'</span>, <span class="hljs-attr">url</span>: <span class="hljs-string">'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'</span>}, {<span class="hljs-attr">name</span>: <span class="hljs-string">'food2.jpeg'</span>, <span class="hljs-attr">url</span>: <span class="hljs-string">'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'</span>}]
                      };
                    },
                    <span class="hljs-attr">methods</span>: {
                      handleRemove(file, fileList) {
                        <span class="hljs-built_in">console</span>.log(file, fileList);
                      },
                      handlePreview(file) {
                        <span class="hljs-built_in">console</span>.log(file);
                      },
                      handleExceed(files, fileList) {
                        <span class="hljs-keyword">this</span>.$message.warning(<span class="hljs-string">`当前限制选择 3 个文件，本次选择了 <span class="hljs-subst">${files.length}</span> 个文件，共选择了 <span class="hljs-subst">${files.length + fileList.length}</span> 个文件`</span>);
                      },
                      beforeRemove(file, fileList) {
                        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$confirm(<span class="hljs-string">`确定移除 <span class="hljs-subst">${ file.name }</span>？`</span>);
                      }
                    }
                  }
                </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
                </code>
              </pre>
            </div>
          </mz-collapse-item>
        </mz-collapse>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    }
  }
}
</script>

<style lang="less">
.uploadPage {
  color: #5e6d82;
  &-demo {
    border: 1px solid #ebebeb;
    border-radius: 3px;
    &-example {
      padding: 2rem;
    }
  }
  .mz-collapse-item__header{
    text-align: center
  }
  .mz-icon-arrow-right {
    display: none;
  }
}
</style>
