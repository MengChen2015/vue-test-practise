<template>
  <div class="card-module">
    <div
      class="card-module_title clearfix"
      @click="handleChange"
    >
      <div class="card-module_title_text">{{ title }}</div>
      <div class="card-right">
        <el-button v-if="buttonText" type="primary" @click="buttonHandle">{{ buttonText }}</el-button>
        <i
          v-if="collapse"
          :class="{'is-active': isActive}"
          class="card-module_title_right el-icon-arrow-right"
        />
      </div>
    </div>
    <el-collapse-transition>
      <div
        v-show="isActive"
        class="card-module_content"
      >
        <slot/>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>

/**
 * @autor zhuzeliang
 * @updateDate  2018-10-15
 * @param
 *  collapse 是否存在折叠面板效果
 *  open 是否打开面板
 *  title 面板标题
 *  button-text 按钮内容
 *
 * @Events:
 *  @button-handle  按钮触发事件
 *
 *  用法
*       <card-module
          collapse
          open
          title="房间便利设施"
          button-text="新增"
          @button-handle="handleAdd"
        >
 */
export default {
  props: {
    title: {
      type: String,
      default: '标题'
    },
    collapse: {
      type: Boolean,
      default: false
    },
    open: {
      type: Boolean,
      default: true
    },
    buttonText: {
      type: [String, Boolean],
      default() {
        return this.buttonText
      }
    }
  },
  data() {
    return {
      isActive: this.open
    }
  },
  methods: {
    handleChange() {
      if (this.collapse) {
        this.isActive = !this.isActive
      }
    },
    buttonHandle() {
      this.$emit('button-handle')
    }
  }
}
</script>
<style scoped lang="scss">
  .card-module {
    margin-bottom: 20px;
    .card-module_title {
      height: 48px;
      line-height: 48px;
      background: #eeeeee;
      color: #303133;
      cursor: pointer;
      font-size: 13px;
      font-weight: 500;
      padding: 0 20px;
      .card-module_title_text {
        float: left;
        font-size: 16px;
        font-weight: normal;
      }
      .card-right{
        float:right;
      }
      .card-module_title_right {
        transition: transform 0.3s;
        line-height: 48px;
        &.is-active {
          transform: rotate(90deg);
        }
      }
    }
    .card-module_content {
      padding: 15px 20px;
    }
  }
</style>

