<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <!-- <img v-if="logo" :src="logo" class="sidebar-logo"> -->
        <h1 class="sidebar-title">1TinyPoint</h1>
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <!-- <img v-if="logo" :src="logo" class="sidebar-logo"> -->
        <h1 class="sidebar-title">1TinyPoint</h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
import defaultSettings from '@/settings'
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      title: defaultSettings.title,
      logo: 'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png'
    }
  }
}
</script>

<style lang="scss" scoped>

  /*媒体查询*/

  @media screen and (min-device-width:1024px) and (max-device-width: 1399px) {
    .sidebar-logo-container{  height: 50px; line-height: 50px; }
    .sidebar-title{font-size:30px ; }
   }

  @media screen and (min-device-width:1400px) {

    .sidebar-title{font-size:36px ; }
   }

</style>
