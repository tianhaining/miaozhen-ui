<template lang="html">
  <section class="messagePage">
    <h2>Message消息提示</h2>
    <p>常用于主动操作后的反馈提示。与Notification的区别是后者更多用于系统级通知的被动提醒</p>
    <h3>基础用法</h3>
    <p>从顶部出现，3秒后自动消失</p>
    <div class="messagePage-demo">
      <div class="messagePage-demo-example">
        <mz-button :plain="true" @click="open">打开消息提示</mz-button>
        <mz-button :plain="true" @click="openVn">VNode</mz-button>
      </div>
      <div class="messagePage-demo-control">
        <mz-collapse accordion>
          <mz-collapse-item>
            <template slot="title"><i class="header-icon mz-icon-caret-bottom"></i><span>展示代码</span></template>
            <div>
              <pre>
                <code class="hljs language-html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
                  <span class="hljs-tag">&lt;<span class="hljs-name">mz-button</span> <span class="hljs-attr">:plain</span>=<span class="hljs-string">"true"</span> <span class="hljs-attr">@click</span>=<span class="hljs-string">"open"</span>&gt;</span>打开消息提示<span class="hljs-tag">&lt;/<span class="hljs-name">mz-button</span>&gt;</span>
                  <span class="hljs-tag">&lt;<span class="hljs-name">mz-button</span> <span class="hljs-attr">:plain</span>=<span class="hljs-string">"true"</span> <span class="hljs-attr">@click</span>=<span class="hljs-string">"openVn"</span>&gt;</span>VNode<span class="hljs-tag">&lt;/<span class="hljs-name">mz-button</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

                <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
                  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
                    <span class="hljs-attr">methods</span>: {
                      open() {
                        <span class="hljs-keyword">this</span>.$message(<span class="hljs-string">'这是一条消息提示'</span>);
                      },

                      openVn() {
                        <span class="hljs-keyword">const</span> h = <span class="hljs-keyword">this</span>.$createElement;
                        <span class="hljs-keyword">this</span>.$message({
                          <span class="hljs-attr">message</span>: h(<span class="hljs-string">'p'</span>, <span class="hljs-literal">null</span>, [
                            h(<span class="hljs-string">'span'</span>, <span class="hljs-literal">null</span>, <span class="hljs-string">'内容可以是 '</span>),
                            h(<span class="hljs-string">'i'</span>, { <span class="hljs-attr">style</span>: <span class="hljs-string">'color: teal'</span> }, <span class="hljs-string">'VNode'</span>)
                          ])
                        });
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
  methods: {
    open() {
      this.$message('这是一条消息提示');
    },

    openVn() {
      const h = this.$createElement;
      this.$message({
        message: h('p', null, [
          h('span', null, '内容可以是 '),
          h('i', { style: 'color: teal' }, 'VNode')
        ])
      });
    }
  }
}
</script>

<style lang="less">
.messagePage {
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
}
</style>
