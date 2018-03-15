<template lang="html">
  <section class="tabsPage">
    <h2>Tabs标签页</h2>
    <p>分隔内容上有关联但属于不同类别的数据集合</p>
    <h3>基础用法</h3>
    <p>基础的、简洁的标签页</p>
    <div class="tabsPage-demo">
      <div class="tabsPage-demo-example">
        <mz-tabs v-model="activeName" @tab-click="handleClick">
          <mz-tab-pane label="用户管理" name="first">用户管理</mz-tab-pane>
          <mz-tab-pane label="配置管理" name="second">配置管理</mz-tab-pane>
          <mz-tab-pane label="角色管理" name="third">角色管理</mz-tab-pane>
          <mz-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</mz-tab-pane>
        </mz-tabs>
      </div>
      <div class="tabsPage-demo-control">
        <mz-collapse accordion>
          <mz-collapse-item>
            <template slot="title"><i class="header-icon mz-icon-caret-bottom"></i><span>展示代码</span></template>
            <div>
              <pre>
                <code class="hljs language-html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
                  <span class="hljs-tag">&lt;<span class="hljs-name">mz-tabs</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"activeName"</span> <span class="hljs-attr">@tab-click</span>=<span class="hljs-string">"handleClick"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">mz-tab-pane</span> <span class="hljs-attr">label</span>=<span class="hljs-string">"用户管理"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"first"</span>&gt;</span>用户管理<span class="hljs-tag">&lt;/<span class="hljs-name">mz-tab-pane</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">mz-tab-pane</span> <span class="hljs-attr">label</span>=<span class="hljs-string">"配置管理"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"second"</span>&gt;</span>配置管理<span class="hljs-tag">&lt;/<span class="hljs-name">mz-tab-pane</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">mz-tab-pane</span> <span class="hljs-attr">label</span>=<span class="hljs-string">"角色管理"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"third"</span>&gt;</span>角色管理<span class="hljs-tag">&lt;/<span class="hljs-name">mz-tab-pane</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">mz-tab-pane</span> <span class="hljs-attr">label</span>=<span class="hljs-string">"定时任务补偿"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"fourth"</span>&gt;</span>定时任务补偿<span class="hljs-tag">&lt;/<span class="hljs-name">mz-tab-pane</span>&gt;</span>
                  <span class="hljs-tag">&lt;/<span class="hljs-name">mz-tabs</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
                  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
                    data() {
                      <span class="hljs-keyword">return</span> {
                        <span class="hljs-attr">activeName</span>: <span class="hljs-string">'second'</span>
                      };
                    },
                    <span class="hljs-attr">methods</span>: {
                      handleClick(tab, event) {
                        <span class="hljs-built_in">console</span>.log(tab, event);
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
      activeName: 'second'
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>

<style lang="less">
.tabsPage {
  color: #5e6d82;
  &-demo {
    border: 1px solid #ebebeb;
    border-radius: 3px;
    &-example {
      padding: 2rem;
    }
    .mz-alert{
      margin: 20px 0;
    }
    .mz-alert:first-child {
      margin: 0;
    }
  }
  .mz-collapse-item__header{
    text-align: center
  }
}
</style>
