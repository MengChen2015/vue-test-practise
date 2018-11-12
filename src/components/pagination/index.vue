<template>
  <div v-if="total > 0">
    <el-pagination
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      :total="total"
      background
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
/** @param
 *  currentPage 当前页
 *  total 总页数
 *  pageSize 每页条数 默认15条
 *  pageSizes 可选条数每页条数 默认[10, 15, 50, 100, 1000]
 * @event
 *  size-change 每页显示条数发生变化 返回参数当前显示条数
 *  current-change 当前页数发生变化 返回参数当前页码
 *
 */
export default {
  props: {
    currentPage: {
      type: Number,
      validator: function(value) {
        return value > 0
      },
      default: 1
    },
    total: {
      type: Number,
      default: 30
    },
    pageSize: {
      type: Number,
      default: 15
    },
    pageSizes: {
      type: Array,
      default: function() {
        return [10, 15, 50, 100, 1000]
      }
    }
  },
  data() {
    return {

    }
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('size-change', val)
    },
    handleCurrentChange(val) {
      this.$emit('current-change', val)
    }
  }
}
</script>
<style lang="scss">
</style>

