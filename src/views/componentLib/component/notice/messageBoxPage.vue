<template lang="html">
  <section class="messageBoxPage">
    <h2>MessageBox弹窗</h2>
    <p>模拟系统的消息提示框而实现的一套模态对话框组件，用于消息提示、确认消息和提交内容</p>
    <h3>消息提示</h3>
    <p>当用户进行操作时会被触发，该对话框中断用户操作，直到用户确认知晓后才可关闭</p>
    <div class="messageBoxPage-demo">
      <div class="messageBoxPage-demo-example">
        <mz-button type="text" @click="open">点击打开 Message Box</mz-button>
      </div>
      <div class="messageBoxPage-demo-control">
        <mz-collapse accordion>
          <mz-collapse-item>
            <template slot="title"><i class="header-icon mz-icon-caret-bottom"></i><span>展示代码</span></template>
            <div>
              <pre>
                <code class="hljs language-html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
                  <span class="hljs-tag">&lt;<span class="hljs-name">mz-button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">@click</span>=<span class="hljs-string">"open"</span>&gt;</span>点击打开 Message Box<span class="hljs-tag">&lt;/<span class="hljs-name">mz-button</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

                <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
                  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
                    <span class="hljs-attr">methods</span>: {
                      open() {
                        <span class="hljs-keyword">this</span>.$alert(<span class="hljs-string">'这是一段内容'</span>, <span class="hljs-string">'标题名称'</span>, {
                          <span class="hljs-attr">confirmButtonText</span>: <span class="hljs-string">'确定'</span>,
                          <span class="hljs-attr">callback</span>: <span class="hljs-function"><span class="hljs-params">action</span> =&gt;</span> {
                            <span class="hljs-keyword">this</span>.$message({
                              <span class="hljs-attr">type</span>: <span class="hljs-string">'info'</span>,
                              <span class="hljs-attr">message</span>: <span class="hljs-string">`action: <span class="hljs-subst">${ action }</span>`</span>
                            });
                          }
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
      this.$alert('这是一段内容', '标题名称', {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'info',
            message: `action: ${ action }`
          });
        }
      });
    }
  }
}
</script>

<style lang="less">
.messageBoxPage {
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
