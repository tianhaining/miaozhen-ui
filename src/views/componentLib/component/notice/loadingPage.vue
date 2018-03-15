<template lang="html">
  <section class="loadingPage">
    <h2>Loading加载</h2>
    <p>加载数据时显示动效</p>
    <h3>区域加载</h3>
    <p>在表格等容器中加载数据时显示</p>
    <div class="loadingPage-demo">
      <div class="loadingPage-demo-example">
        <mz-table
          v-loading="loading"
          :data="tableData"
          style="width: 100%">
          <mz-table-column
            prop="date"
            label="日期"
            width="180">
          </mz-table-column>
          <mz-table-column
            prop="name"
            label="姓名"
            width="180">
          </mz-table-column>
          <mz-table-column
            prop="address"
            label="地址">
          </mz-table-column>
        </mz-table>
      </div>
      <div class="loadingPage-demo-control">
        <mz-collapse accordion>
          <mz-collapse-item>
            <template slot="title"><i class="header-icon mz-icon-caret-bottom"></i><span>展示代码</span></template>
            <div>
              <pre>
                <code class="hljs language-html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
                  <span class="hljs-tag">&lt;<span class="hljs-name">mz-table</span>
                    <span class="hljs-attr">v-loading</span>=<span class="hljs-string">"loading"</span>
                    <span class="hljs-attr">:data</span>=<span class="hljs-string">"tableData"</span>
                    <span class="hljs-attr">style</span>=<span class="hljs-string">"width: 100%"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">mz-table-column</span>
                      <span class="hljs-attr">prop</span>=<span class="hljs-string">"date"</span>
                      <span class="hljs-attr">label</span>=<span class="hljs-string">"日期"</span>
                      <span class="hljs-attr">width</span>=<span class="hljs-string">"180"</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">mz-table-column</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">mz-table-column</span>
                      <span class="hljs-attr">prop</span>=<span class="hljs-string">"name"</span>
                      <span class="hljs-attr">label</span>=<span class="hljs-string">"姓名"</span>
                      <span class="hljs-attr">width</span>=<span class="hljs-string">"180"</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">mz-table-column</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">mz-table-column</span>
                      <span class="hljs-attr">prop</span>=<span class="hljs-string">"address"</span>
                      <span class="hljs-attr">label</span>=<span class="hljs-string">"地址"</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">mz-table-column</span>&gt;</span>
                  <span class="hljs-tag">&lt;/<span class="hljs-name">mz-table</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

                <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
                  <span class="hljs-selector-tag">body</span> {
                    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
                  }
                </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

                <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
                  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
                    data() {
                      <span class="hljs-keyword">return</span> {
                        <span class="hljs-attr">tableData</span>: [{
                          <span class="hljs-attr">date</span>: <span class="hljs-string">'2016-05-03'</span>,
                          <span class="hljs-attr">name</span>: <span class="hljs-string">'王小虎'</span>,
                          <span class="hljs-attr">address</span>: <span class="hljs-string">'上海市普陀区金沙江路 1518 弄'</span>
                        }, {
                          <span class="hljs-attr">date</span>: <span class="hljs-string">'2016-05-02'</span>,
                          <span class="hljs-attr">name</span>: <span class="hljs-string">'王小虎'</span>,
                          <span class="hljs-attr">address</span>: <span class="hljs-string">'上海市普陀区金沙江路 1518 弄'</span>
                        }, {
                          <span class="hljs-attr">date</span>: <span class="hljs-string">'2016-05-04'</span>,
                          <span class="hljs-attr">name</span>: <span class="hljs-string">'王小虎'</span>,
                          <span class="hljs-attr">address</span>: <span class="hljs-string">'上海市普陀区金沙江路 1518 弄'</span>
                        }],
                        <span class="hljs-attr">loading</span>: <span class="hljs-literal">true</span>
                      };
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
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      loading: true
    };
  }
};
</script>

<style lang="less">
.loadingPage {
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
