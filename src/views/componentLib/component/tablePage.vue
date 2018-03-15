<template lang="html">
  <section class="tablePage">
    <h2>Table表格</h2>
    <p>用于展示多条结构类似的问题，可对数据进行排序、筛选、对比或其他自定义操作</p>
    <h3>基础表格</h3>
    <p>基础的表格展示用法</p>
    <div class="tablePage-demo">
      <div class="tablePage-demo-example">
        <mz-table
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
      <div class="tablePage-demo-control">
        <mz-collapse accordion>
          <mz-collapse-item>
            <template slot="title"><i class="header-icon mz-icon-caret-bottom"></i><span>展示代码</span></template>
            <div>
              <pre>
                <code class="hljs language-html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
                  <span class="hljs-tag">&lt;<span class="hljs-name">mz-table</span>
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

                <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
                  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
                    data() {
                      <span class="hljs-keyword">return</span> {
                        <span class="hljs-attr">tableData</span>: [{
                          <span class="hljs-attr">date</span>: <span class="hljs-string">'2016-05-02'</span>,
                          <span class="hljs-attr">name</span>: <span class="hljs-string">'王小虎'</span>,
                          <span class="hljs-attr">address</span>: <span class="hljs-string">'上海市普陀区金沙江路 1518 弄'</span>
                        }, {
                          <span class="hljs-attr">date</span>: <span class="hljs-string">'2016-05-04'</span>,
                          <span class="hljs-attr">name</span>: <span class="hljs-string">'王小虎'</span>,
                          <span class="hljs-attr">address</span>: <span class="hljs-string">'上海市普陀区金沙江路 1517 弄'</span>
                        }, {
                          <span class="hljs-attr">date</span>: <span class="hljs-string">'2016-05-01'</span>,
                          <span class="hljs-attr">name</span>: <span class="hljs-string">'王小虎'</span>,
                          <span class="hljs-attr">address</span>: <span class="hljs-string">'上海市普陀区金沙江路 1519 弄'</span>
                        }, {
                          <span class="hljs-attr">date</span>: <span class="hljs-string">'2016-05-03'</span>,
                          <span class="hljs-attr">name</span>: <span class="hljs-string">'王小虎'</span>,
                          <span class="hljs-attr">address</span>: <span class="hljs-string">'上海市普陀区金沙江路 1516 弄'</span>
                        }]
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
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  }
}
</script>

<style lang="less">
.tablePage {
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
