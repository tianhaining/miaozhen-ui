<template lang="html">
  <section class="layoutPage">
    <h2>Lauout布局</h2>
    <p>通过基础的24分栏，迅速简便地创建布局</p>
    <h3>基础布局</h3>
    <p>使用单一分栏创建基础的栅格布局</p>
    <div class="layoutPage-demo">
      <div class="layoutPage-demo-example">
        <mz-row>
          <mz-col :span="24"><div class="grid-content bg-purple-dark"></div></mz-col>
        </mz-row>
        <mz-row>
          <mz-col :span="12"><div class="grid-content bg-purple"></div></mz-col>
          <mz-col :span="12"><div class="grid-content bg-purple-light"></div></mz-col>
        </mz-row>
        <mz-row>
          <mz-col :span="8"><div class="grid-content bg-purple"></div></mz-col>
          <mz-col :span="8"><div class="grid-content bg-purple-light"></div></mz-col>
          <mz-col :span="8"><div class="grid-content bg-purple"></div></mz-col>
        </mz-row>
        <mz-row>
          <mz-col :span="6"><div class="grid-content bg-purple"></div></mz-col>
          <mz-col :span="6"><div class="grid-content bg-purple-light"></div></mz-col>
          <mz-col :span="6"><div class="grid-content bg-purple"></div></mz-col>
          <mz-col :span="6"><div class="grid-content bg-purple-light"></div></mz-col>
        </mz-row>
        <mz-row>
          <mz-col :span="4"><div class="grid-content bg-purple"></div></mz-col>
          <mz-col :span="4"><div class="grid-content bg-purple-light"></div></mz-col>
          <mz-col :span="4"><div class="grid-content bg-purple"></div></mz-col>
          <mz-col :span="4"><div class="grid-content bg-purple-light"></div></mz-col>
          <mz-col :span="4"><div class="grid-content bg-purple"></div></mz-col>
          <mz-col :span="4"><div class="grid-content bg-purple-light"></div></mz-col>
        </mz-row>
      </div>
      <div class="layoutPage-demo-control">
        <mz-collapse @change="handleChange" accordion>
          <mz-collapse-item>
            <template slot="title"><i class="header-icon mz-icon-caret-bottom"></i><span>展示代码</span></template>
            <div>
              <pre>
                <code>
                  <span>&lt;<span>mz-row</span>&gt;</span>
                    <span>&lt;<span>mz-col</span> <span>:span</span>=<span>"24"</span>&gt;</span><span>&lt;<span>div</span> <span>class</span>=<span>"grid-content bg-purple-dark"</span>&gt;</span><span>&lt;/<span>div</span>&gt;</span><span>&lt;/<span>mz-col</span>&gt;</span>
                  <span>&lt;/<span>mz-row</span>&gt;</span>
                  <span>&lt;<span>style</span>&gt;</span><span class="undefined">
                    .mz-row {
                      margin-bottom: 20px;
                      &amp;:last-child {
                        margin-bottom: 0;
                      }
                    }
                    .mz-col {
                      border-radius: 4px;
                    }
                    .bg-purple-dark {
                      background: #99a9bf;
                    }
                    .bg-purple {
                      background: #d3dce6;
                    }
                    .bg-purple-light {
                      background: #e5e9f2;
                    }
                    .grid-content {
                      border-radius: 4px;
                      min-height: 36px;
                    }
                    .row-bg {
                      padding: 10px 0;
                      background-color: #f9fafc;
                    }
                  </span><span>&lt;/<span>style</span>&gt;</span>
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
.layoutPage {
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

  .mz-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .mz-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
}
</style>
