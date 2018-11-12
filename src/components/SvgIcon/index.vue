<template>
  <!-- <svg
    v-if="imgType == 'svg'"
    :class="svgClass"
    aria-hidden="true"
  >
    <use :xlink:href="iconName" />
  </svg> -->
  <em
    :class="iconClass"
    class="icon-bg iconfont"
  />
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    // iconName() {
    //   return `#icon-${this.iconClass}`
    // },
    // imgType() {
    //   const iconNameArr = this.iconClass.split('.')
    //   return iconNameArr[iconNameArr.length - 1]
    // },
    // svgClass() {
    //   if (this.className) {
    //     return 'svg-icon ' + this.className
    //   } else {
    //     return 'svg-icon'
    //   }
    // },
    // imgIcon() {
    //   let imgIcon
    //   try {
    //     imgIcon = require('@/assets/img/sidebarIcon/' + this.iconClass)
    //     return imgIcon
    //   } catch (err) {
    //     return false
    //   }
    // },
  },
  mounted() {
  }
}
</script>

<style scoped>
  .svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
  .icon-bg {
    display: inline-block;
    margin-right: 10px;
    background: transparent center no-repeat;
    background-size: contain;
  }
</style>
