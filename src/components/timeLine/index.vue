<template>
  <div class="block-warp">
    <div :style="{'background': iconColor, 'visibility': isShowIcon?'visible':'hidden'}" class="line-icon">
      <slot name="icon"/>
    </div>
    <div :style="{'flex': `0 0 ${titleWidth}px`}" class="line-time">
      <slot name="title"/>
    </div>
    <div class="content">
      <slot name="content"/>
    </div>
  </div>
</template>

<script>
/*
** @param isShowIcon 是否显示时间轴icon 默认为false不显示
** @param iconColor 时间轴icon背景色 默认#67c23a
** @param titleWidth 时间轴标题宽度 默认为100不显示 (单位px)
** solt: icon, title, content
 */
export default {
  props: {
    isShowIcon: {
      type: Boolean,
      default: false
    },
    iconColor: {
      type: String,
      default: '#67c23a'
    },
    titleWidth: {
      type: Number,
      default: 100
    }
  },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
.block-warp{
  display: flex;
  margin-left: 30px;
  border-left: 2px solid gray;
  position: relative;
  align-items: flex-start;
  padding-bottom: 20px;
  .line-icon{
    display: block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    transform: translateX(-55%);
  }
  .line-time{
    flex: 0 0 100px;
  }
  .content{
    flex: 1 1 auto;
    // padding: 15px;
  }
}

</style>

