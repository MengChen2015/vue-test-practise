<template>
  <el-breadcrumb
    class="app-breadcrumb"
    separator="/"
  >
    <transition-group name="breadcrumb">
      <template v-if="levelList.length > 1">
        <el-breadcrumb-item
          v-for="(item,index) in levelList"
          v-if="item.meta.title"
          :key="item.path"
        >
          <span
            v-if="!item.meta.needRedirect || index === levelList.length-1"
            class="no-redirect"
          >{{ item.meta.title }}</span>
          <router-link
            v-else
            :to="item.redirect||item.path"
          >{{ item.meta.title }}</router-link>
        </el-breadcrumb-item>
      </template>
      <template v-else>
        <el-breadcrumb-item
          v-if="$route.name === 'dashboard'"
          key="/dashboard"
        >
          您上次登录的时间是：<span class="last-login-time">{{ lastLoginTime }}</span>
        </el-breadcrumb-item>
      </template>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      levelList: null
    }
  },
  computed: {
    ...mapGetters(['lastLoginTime'])
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.name)
      const first = matched[0]
      if (first && first.name !== 'dashboard') {
        matched = [{ path: '/', redirect: '/dashboard', meta: { title: '首页', needRedirect: true }}].concat(matched)
      }
      this.levelList = matched
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;
    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
  .last-login-time {
    color: #00002a;
  }
</style>
