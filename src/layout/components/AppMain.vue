<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 30px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding:20px;
  margin: 20px 11px;
  background: #fff;
}

.fixed-header+.app-main {
  // padding-top:80px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 80px);
  }

  .fixed-header+.app-main {
    // padding-top: 80px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
  @media screen and (min-device-width:1024px) and (max-device-width: 1399px) {
   .fixed-header+.app-main{
        padding-top: 40px; //全局没有设置高度
        font-size: 12px;
      }

   }
    @media screen and (min-device-width:1400px) {

     .fixed-header+.app-main{
        padding-top: 80px; //全局没有设置高度
      }
   }

</style>
