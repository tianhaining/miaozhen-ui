<template lang="html">
  <section class="installPage">
    <h2>安装</h2>
    <p></p>
    <h3>npm 安装</h3>
    <p>推荐使用npm的方式安装，它能更好地和webpack打包工具配合使用</p>
    <div class="installPage-demo">
      <div class="installPage-demo-example">
        <p>npm install miaozhen-ued --save</p>
      </div>
    </div>
    <h3>CDN</h3>
    <p>可以通过https://www.jsdelivr.com/package/npm/miaozhen-ued获取到最新版本的资源，在页面上引入js和css文件即可</p>
    <div class="installPage-demo">
      <div class="installPage-demo-example">
        <pre>
          <code class="hljs language-html">
<span class="hljs-comment">&lt;!-- 引入样式 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://cdn.jsdelivr.net/npm/miaozhen-ued@1.0.39/dist/static/css/app.css"</span>&gt;</span>
<span class="hljs-comment">&lt;!-- 引入组件库 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.jsdelivr.net/npm/miaozhen-ued@1.0.39/dist/static/js/app.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
          </code>
        </pre>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data(){
    return {

    }
  },
  methods: {
    handleChange(val) {
      console.log(val);
    }
  }
}
</script>

<style lang="less">
.installPage {
  color: #5e6d82;
  &-demo {
    border: 1px solid #ebebeb;
    border-radius: 3px;
    &-example {
      padding: 2rem;
      i {
        font-size: 1.5rem;
        margin: 0 1rem;
      }
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
