<template lang="html">
  <section class="treePage">
    <h2>Tree树形控件</h2>
    <p>用清晰的层级结构展示信息，可展开或折叠</p>
    <h3>基础用法</h3>
    <p>基础的树形结构展示</p>
    <div class="treePage-demo">
      <div class="treePage-demo-example">
        <mz-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></mz-tree>
      </div>
      <div class="treePage-demo-control">
        <mz-collapse accordion>
          <mz-collapse-item>
            <template slot="title"><i class="header-icon mz-icon-caret-bottom"></i><span>展示代码</span></template>
            <div>
              <pre>
                <code class="hljs language-html"><span class="hljs-tag">&lt;<span class="hljs-name">mz-tree</span> <span class="hljs-attr">:data</span>=<span class="hljs-string">"data"</span> <span class="hljs-attr">:props</span>=<span class="hljs-string">"defaultProps"</span> <span class="hljs-attr">@node-click</span>=<span class="hljs-string">"handleNodeClick"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">mz-tree</span>&gt;</span>
                  <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
                    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
                      data() {
                        <span class="hljs-keyword">return</span> {
                          <span class="hljs-attr">data</span>: [{
                            <span class="hljs-attr">label</span>: <span class="hljs-string">'一级 1'</span>,
                            <span class="hljs-attr">children</span>: [{
                              <span class="hljs-attr">label</span>: <span class="hljs-string">'二级 1-1'</span>,
                              <span class="hljs-attr">children</span>: [{
                                <span class="hljs-attr">label</span>: <span class="hljs-string">'三级 1-1-1'</span>
                              }]
                            }]
                          }, {
                            <span class="hljs-attr">label</span>: <span class="hljs-string">'一级 2'</span>,
                            <span class="hljs-attr">children</span>: [{
                              <span class="hljs-attr">label</span>: <span class="hljs-string">'二级 2-1'</span>,
                              <span class="hljs-attr">children</span>: [{
                                <span class="hljs-attr">label</span>: <span class="hljs-string">'三级 2-1-1'</span>
                              }]
                            }, {
                              <span class="hljs-attr">label</span>: <span class="hljs-string">'二级 2-2'</span>,
                              <span class="hljs-attr">children</span>: [{
                                <span class="hljs-attr">label</span>: <span class="hljs-string">'三级 2-2-1'</span>
                              }]
                            }]
                          }, {
                            <span class="hljs-attr">label</span>: <span class="hljs-string">'一级 3'</span>,
                            <span class="hljs-attr">children</span>: [{
                              <span class="hljs-attr">label</span>: <span class="hljs-string">'二级 3-1'</span>,
                              <span class="hljs-attr">children</span>: [{
                                <span class="hljs-attr">label</span>: <span class="hljs-string">'三级 3-1-1'</span>
                              }]
                            }, {
                              <span class="hljs-attr">label</span>: <span class="hljs-string">'二级 3-2'</span>,
                              <span class="hljs-attr">children</span>: [{
                                <span class="hljs-attr">label</span>: <span class="hljs-string">'三级 3-2-1'</span>
                              }]
                            }]
                          }],
                          <span class="hljs-attr">defaultProps</span>: {
                            <span class="hljs-attr">children</span>: <span class="hljs-string">'children'</span>,
                            <span class="hljs-attr">label</span>: <span class="hljs-string">'label'</span>
                          }
                        };
                      },
                      <span class="hljs-attr">methods</span>: {
                        handleNodeClick(data) {
                          <span class="hljs-built_in">console</span>.log(data);
                        }
                      }
                    };
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
      data: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    };
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
    }
  }
};
</script>

<style lang="less">
.treePage {
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
