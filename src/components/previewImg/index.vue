<template>
  <div class="preview-img">
    <div class="slot" @click="handleCheckDetail">
      <slot name="target"/>
    </div>
    <el-dialog :visible.sync="dialogVisible">
      <el-dialog :visible.sync="dialogPreviewImg" append-to-body>
        <img :src="previewImgUrl" width="100%">
      </el-dialog>
      <div v-if="fileList.length > 0" class="carousel-box">
        <el-carousel
          :autoplay="false"
          arrow="always"
          height="250px"
        >
          <el-carousel-item
            v-for="(item,i) in fileList"
            :key="i"
          >
            <div class="img-box">
              <img :src="item" class="img-view">
              <div class="actions">
                <i class="action-icon el-icon-zoom-in" @click="handlePreviewImg(item)"/>
                <i v-if="del" class="action-icon el-icon-delete" @click="handleDel(i)"/>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div v-else class="no-data">暂无图片数据</div>
      <slot name="content"/>
      <div v-if="btns" slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleOk">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

/**
 * @autor zhuzeliang
 * @updateDate  2018-10-12
 *
 * @param
 *  btns     是否需要底部按钮
 *  del      是否显示删除按钮
 *  fileList 图片数组列表，需对数据处理有对应的url
 *
 * @Events:
 *  loadingHide()      删除图片成功隐藏loading方法 父组件通过$refs删除成功后调用子组件方法
 *  @delete(item,i)    删除图片request请求 父组件调用(参数 item：图片对象，i：对应索引 )
 *  @Ok()              底部确定按钮事件处理，此方法需传入btns
 *
 * @Slot:
 *    target      入口dom元素
 *    content     预览图片内容区域
 *
 * 用法
 *    <preview-img ref="previewImg" :file-list="fileList" del @delete="handleDel" @ok="handleOk">
        <el-button
          slot="target"
          size="small"
          type="success"
        >查看详情</el-button>
      </preview-img>
 *
 */
export default {
  props: {
    fileList: {
      type: Array,
      default() {
        return []
      }
    },
    btns: {
      type: Boolean,
      default: false
    },
    del: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      dialogPreviewImg: false,
      previewImgUrl: '',
      loading: false
    }
  },
  methods: {
    handleCheckDetail() {
      this.dialogVisible = true
    },
    handleDel(i) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit('delete', i, this.fileList)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleOk() {
      this.$emit('ok')
      this.dialogVisible = false
    },
    loadingHide() {
      this.loading = false
    },
    handlePreviewImg(url) {
      this.previewImgUrl = url
      this.dialogPreviewImg = true
    }
  }
}
</script>
<style scoped lang="scss">
.preview-img{
  display: inline-block;
  .img-box{
    height: 100%;
    position: relative;
    .img-view{
      width: 100%;
      height: 100%;
    }
    .actions{
      position: absolute;
      right: 0;
      top: 5px;
      .action-icon{
        font-size: 20px;
        margin-right: 6px;
        cursor: pointer;
      }
    }
  }
  .no-data{
    color: #909399;
    text-align: center;
  }
}
</style>

