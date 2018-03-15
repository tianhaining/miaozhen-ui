<template lang="html">
  <section class="navMenuPage">
    <h2>NavMenu导航菜单</h2>
    <p>为网站提供导航功能的菜单</p>
    <h3>顶栏</h3>
    <p>适用于广泛的基础用法</p>
    <div class="navMenuPage-demo">
      <div class="navMenuPage-demo-example">
        <mz-menu :default-active="activeIndex" class="mz-menu-demo" mode="horizontal" @select="handleSelect">
          <mz-menu-item index="1">处理中心</mz-menu-item>
          <mz-submenu index="2">
            <template slot="title">我的工作台</template>
            <mz-menu-item index="2-1">选项1</mz-menu-item>
            <mz-menu-item index="2-2">选项2</mz-menu-item>
            <mz-menu-item index="2-3">选项3</mz-menu-item>
            <mz-submenu index="2-4">
              <template slot="title">选项4</template>
              <mz-menu-item index="2-4-1">选项1</mz-menu-item>
              <mz-menu-item index="2-4-2">选项2</mz-menu-item>
              <mz-menu-item index="2-4-3">选项3</mz-menu-item>
            </mz-submenu>
          </mz-submenu>
          <mz-menu-item index="3" disabled>消息中心</mz-menu-item>
          <mz-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></mz-menu-item>
        </mz-menu>
        <div class="line"></div>
        <mz-menu
          :default-active="activeIndex2"
          class="mz-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <mz-menu-item index="1">处理中心</mz-menu-item>
          <mz-submenu index="2">
            <template slot="title">我的工作台</template>
            <mz-menu-item index="2-1">选项1</mz-menu-item>
            <mz-menu-item index="2-2">选项2</mz-menu-item>
            <mz-menu-item index="2-3">选项3</mz-menu-item>
            <mz-submenu index="2-4">
              <template slot="title">选项4</template>
              <mz-menu-item index="2-4-1">选项1</mz-menu-item>
              <mz-menu-item index="2-4-2">选项2</mz-menu-item>
              <mz-menu-item index="2-4-3">选项3</mz-menu-item>
            </mz-submenu>
          </mz-submenu>
          <mz-menu-item index="3" disabled>消息中心</mz-menu-item>
          <mz-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></mz-menu-item>
        </mz-menu>
      </div>
      <div class="navMenuPage-demo-control">
        <mz-collapse accordion>
          <mz-collapse-item>
            <template slot="title"><i class="header-icon mz-icon-caret-bottom"></i><span>展示代码</span></template>
            <div>
              <pre>
                <code class="hljs language-html"><span class="hljs-tag">&lt;<span class="hljs-name">mz-menu</span> <span class="hljs-attr">:default-active</span>=<span class="hljs-string">"activeIndex"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mz-menu-demo"</span> <span class="hljs-attr">mode</span>=<span class="hljs-string">"horizontal"</span> <span class="hljs-attr">@select</span>=<span class="hljs-string">"handleSelect"</span>&gt;</span>
                  <span class="hljs-tag">&lt;<span class="hljs-name">mz-menu-item</span> <span class="hljs-attr">index</span>=<span class="hljs-string">"1"</span>&gt;</span>处理中心<span class="hljs-tag">&lt;/<span class="hljs-name">mz-menu-item</span>&gt;</span>
                  <span class="hljs-tag">&lt;<span class="hljs-name">mz-submenu</span> <span class="hljs-attr">index</span>=<span class="hljs-string">"2"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"title"</span>&gt;</span>我的工作台<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">mz-menu-item</span> <span class="hljs-attr">index</span>=<span class="hljs-string">"2-1"</span>&gt;</span>选项1<span class="hljs-tag">&lt;/<span class="hljs-name">mz-menu-item</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">mz-menu-item</span> <span class="hljs-attr">index</span>=<span class="hljs-string">"2-2"</span>&gt;</span>选项2<span class="hljs-tag">&lt;/<span class="hljs-name">mz-menu-item</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">mz-menu-item</span> <span class="hljs-attr">index</span>=<span class="hljs-string">"2-3"</span>&gt;</span>选项3<span class="hljs-tag">&lt;/<span class="hljs-name">mz-menu-item</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">mz-submenu</span> <span class="hljs-attr">index</span>=<span class="hljs-string">"2-4"</span>&gt;</span>
                      <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"title"</span>&gt;</span>选项4<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
                      <span class="hljs-tag">&lt;<span class="hljs-name">mz-menu-item</span> <span class="hljs-attr">index</span>=<span class="hljs-string">"2-4-1"</span>&gt;</span>选项1<span class="hljs-tag">&lt;/<span class="hljs-name">mz-menu-item</span>&gt;</span>
                      <span class="hljs-tag">&lt;<span class="hljs-name">mz-menu-item</span> <span class="hljs-attr">index</span>=<span class="hljs-string">"2-4-2"</span>&gt;</span>选项2<span class="hljs-tag">&lt;/<span class="hljs-name">mz-menu-item</span>&gt;</span>
                      <span class="hljs-tag">&lt;<span class="hljs-name">mz-menu-item</span> <span class="hljs-attr">index</span>=<span class="hljs-string">"2-4-3"</span>&gt;</span>选项3<span class="hljs-tag">&lt;/<span class="hljs-name">mz-menu-item</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">mz-submenu</span>&gt;</span>
                  <span class="hljs-tag">&lt;/<span class="hljs-name">mz-submenu</span>&gt;</span>
                  <span class="hljs-tag">&lt;<span class="hljs-name">mz-menu-item</span> <span class="hljs-attr">index</span>=<span class="hljs-string">"3"</span> <span class="hljs-attr">disabled</span>&gt;</span>消息中心<span class="hljs-tag">&lt;/<span class="hljs-name">mz-menu-item</span>&gt;</span>
                  <span class="hljs-tag">&lt;<span class="hljs-name">mz-menu-item</span> <span class="hljs-attr">index</span>=<span class="hljs-string">"4"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://www.ele.me"</span> <span class="hljs-attr">target</span>=<span class="hljs-string">"_blank"</span>&gt;</span>订单管理<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">mz-menu-item</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">mz-menu</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"line"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">mz-menu</span>
                  <span class="hljs-attr">:default-active</span>=<span class="hljs-string">"activeIndex2"</span>
                  <span class="hljs-attr">class</span>=<span class="hljs-string">"mz-menu-demo"</span>
                  <span class="hljs-attr">mode</span>=<span class="hljs-string">"horizontal"</span>
                  <span class="hljs-attr">@select</span>=<span class="hljs-string">"handleSelect"</span>
                  <span class="hljs-attr">background-color</span>=<span class="hljs-string">"#545c64"</span>
                  <span class="hljs-attr">text-color</span>=<span class="hljs-string">"#fff"</span>
                  <span class="hljs-attr">active-text-color</span>=<span class="hljs-string">"#ffd04b"</span>&gt;</span>
                  <span class="hljs-tag">&lt;<span class="hljs-name">mz-menu-item</span> <span class="hljs-attr">index</span>=<span class="hljs-string">"1"</span>&gt;</span>处理中心<span class="hljs-tag">&lt;/<span class="hljs-name">mz-menu-item</span>&gt;</span>
                  <span class="hljs-tag">&lt;<span class="hljs-name">mz-submenu</span> <span class="hljs-attr">index</span>=<span class="hljs-string">"2"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"title"</span>&gt;</span>我的工作台<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">mz-menu-item</span> <span class="hljs-attr">index</span>=<span class="hljs-string">"2-1"</span>&gt;</span>选项1<span class="hljs-tag">&lt;/<span class="hljs-name">mz-menu-item</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">mz-menu-item</span> <span class="hljs-attr">index</span>=<span class="hljs-string">"2-2"</span>&gt;</span>选项2<span class="hljs-tag">&lt;/<span class="hljs-name">mz-menu-item</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">mz-menu-item</span> <span class="hljs-attr">index</span>=<span class="hljs-string">"2-3"</span>&gt;</span>选项3<span class="hljs-tag">&lt;/<span class="hljs-name">mz-menu-item</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">mz-submenu</span> <span class="hljs-attr">index</span>=<span class="hljs-string">"2-4"</span>&gt;</span>
                      <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"title"</span>&gt;</span>选项4<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
                      <span class="hljs-tag">&lt;<span class="hljs-name">mz-menu-item</span> <span class="hljs-attr">index</span>=<span class="hljs-string">"2-4-1"</span>&gt;</span>选项1<span class="hljs-tag">&lt;/<span class="hljs-name">mz-menu-item</span>&gt;</span>
                      <span class="hljs-tag">&lt;<span class="hljs-name">mz-menu-item</span> <span class="hljs-attr">index</span>=<span class="hljs-string">"2-4-2"</span>&gt;</span>选项2<span class="hljs-tag">&lt;/<span class="hljs-name">mz-menu-item</span>&gt;</span>
                      <span class="hljs-tag">&lt;<span class="hljs-name">mz-menu-item</span> <span class="hljs-attr">index</span>=<span class="hljs-string">"2-4-3"</span>&gt;</span>选项3<span class="hljs-tag">&lt;/<span class="hljs-name">mz-menu-item</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">mz-submenu</span>&gt;</span>
                  <span class="hljs-tag">&lt;/<span class="hljs-name">mz-submenu</span>&gt;</span>
                  <span class="hljs-tag">&lt;<span class="hljs-name">mz-menu-item</span> <span class="hljs-attr">index</span>=<span class="hljs-string">"3"</span> <span class="hljs-attr">disabled</span>&gt;</span>消息中心<span class="hljs-tag">&lt;/<span class="hljs-name">mz-menu-item</span>&gt;</span>
                  <span class="hljs-tag">&lt;<span class="hljs-name">mz-menu-item</span> <span class="hljs-attr">index</span>=<span class="hljs-string">"4"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://www.ele.me"</span> <span class="hljs-attr">target</span>=<span class="hljs-string">"_blank"</span>&gt;</span>订单管理<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">mz-menu-item</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">mz-menu</span>&gt;</span>

                <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
                  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
                    data() {
                      <span class="hljs-keyword">return</span> {
                        <span class="hljs-attr">activeIndex</span>: <span class="hljs-string">'1'</span>,
                        <span class="hljs-attr">activeIndex2</span>: <span class="hljs-string">'1'</span>
                      };
                    },
                    <span class="hljs-attr">methods</span>: {
                      handleSelect(key, keyPath) {
                        <span class="hljs-built_in">console</span>.log(key, keyPath);
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
      activeIndex: '1',
      activeIndex2: '1'
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style lang="less">
.navMenuPage {
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
