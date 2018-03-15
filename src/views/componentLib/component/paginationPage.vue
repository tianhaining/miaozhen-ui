<template lang="html">
  <section class="paginationPage">
    <h2>Pagination分页</h2>
    <p>当数据量过多时，使用分页分解数据</p>
    <h3>基础用法</h3>
    <p></p>
    <div class="paginationPage-demo">
      <div class="paginationPage-demo-example">
        <div class="block">
          <span class="demonstration">页数较少时的效果</span>
          <mz-pagination
            layout="prev, pager, next"
            :total="50">
          </mz-pagination>
        </div>
        <div class="block">
          <span class="demonstration">大于 7 页时的效果</span>
          <mz-pagination
            layout="prev, pager, next"
            :total="1000">
          </mz-pagination>
        </div>
      </div>
      <div class="paginationPage-demo-control">
        <mz-collapse accordion>
          <mz-collapse-item>
            <template slot="title"><i class="header-icon mz-icon-caret-bottom"></i><span>展示代码</span></template>
            <div>
              <pre>
                <code class="hljs language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"block"</span>&gt;</span>
                  <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"demonstration"</span>&gt;</span>页数较少时的效果<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                  <span class="hljs-tag">&lt;<span class="hljs-name">mz-pagination</span>
                    <span class="hljs-attr">layout</span>=<span class="hljs-string">"prev, pager, next"</span>
                    <span class="hljs-attr">:total</span>=<span class="hljs-string">"50"</span>&gt;</span>
                  <span class="hljs-tag">&lt;/<span class="hljs-name">mz-pagination</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"block"</span>&gt;</span>
                  <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"demonstration"</span>&gt;</span>大于 7 页时的效果<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                  <span class="hljs-tag">&lt;<span class="hljs-name">mz-pagination</span>
                    <span class="hljs-attr">layout</span>=<span class="hljs-string">"prev, pager, next"</span>
                    <span class="hljs-attr">:total</span>=<span class="hljs-string">"1000"</span>&gt;</span>
                  <span class="hljs-tag">&lt;/<span class="hljs-name">mz-pagination</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
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

    };
  }
}
</script>

<style lang="less">
.paginationPage {
  color: #5e6d82;
  &-demo {
    border: 1px solid #ebebeb;
    border-radius: 3px;
    &-example {
      padding: 2rem;
      display: flex;
      .block {
        flex: 1;
        text-align: center;
      }
      .demonstration {
        display: block;
        margin-bottom: 1rem;
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
