<template>
  <div class="log-record">
    <el-container>
      <el-header>操作日志</el-header>
      <el-main>
        <el-table
          :data="logs"
          border
          style="width: 100%">
          <el-table-column
            v-for="column in gTableColumns"
            :key="column.prop"
            :prop="column.prop"
            :label="column.label"/>
        </el-table>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import * as config from './config'
export default {

  data() {
    return {
      gTableColumns: config.gTableColumns,
      logs: [
        {
          date: '2018-9',
          name: '李四(lisi)',
          source: 'APP',
          content: '提交了 协议评估'
        },
        {
          date: '2018-10',
          name: '王八(lisi)',
          source: 'PC',
          content: '将 协议前评估 中 地毯更换 5 修改为 4  '
        }
      ]

    }
  },
  computed: {

  },
  mounted() {
    console.log(this.$route)
  },
  methods: {

  }

}
</script>
<style lang="scss">
.log-record{
 .el-header{
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;

  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  .log-record{
    font-size: 12px;

  }
</style>
