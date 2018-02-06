<template>
  <footer>
  <!-- <tabbar>
    <tabbar-item>
      <img slot="icon" src="https://o84lhz5xo.qnssl.com/master/src/assets/demo/icon_nav_button.png">
      <span slot="label">Wechat</span>
    </tabbar-item>
    <tabbar-item show-dot>
      <img slot="icon" src="https://o84lhz5xo.qnssl.com/master/src/assets/demo/icon_nav_msg.png">
      <span slot="label">Message</span>
    </tabbar-item>
    <tabbar-item selected>
      <img slot="icon" src="https://o84lhz5xo.qnssl.com/master/src/assets/demo/icon_nav_article.png">
      <span slot="label">Explore</span>
    </tabbar-item>
    <tabbar-item>
      <img slot="icon" src="https://o84lhz5xo.qnssl.com/master/src/assets/demo/icon_nav_cell.png">
      <span slot="label">News</span>
    </tabbar-item>
  </tabbar> -->

  <tabbar v-if="isShow">
    <tabbar-item link="/becomeMember">
      <img slot="icon" src="https://o84lhz5xo.qnssl.com/master/src/assets/demo/icon_nav_msg.png">
      <span slot="label">成为会员</span>
    </tabbar-item>
    <tabbar-item link="/stopCar">
      <img slot="icon" src="https://o84lhz5xo.qnssl.com/master/src/assets/demo/icon_nav_article.png">
      <span slot="label">停车</span>
    </tabbar-item>
    <tabbar-item link="uc">
      <img slot="icon" src="https://o84lhz5xo.qnssl.com/master/src/assets/demo/icon_nav_button.png">
      <span slot="label">我的</span>
    </tabbar-item>
  </tabbar>
</footer>
</template>

<script>
import { Tabbar, TabbarItem } from 'vux'
import {mapState, mapMutations, mapActions} from 'vuex'

export default {
  // name: 'tabbar',
  data () {
    return {
    }
  },
  components: {
    Tabbar,
    TabbarItem,
  },
  computed: {
    ...mapState([
        'footerShow',
    ]),
    isShow() {
      return !this.$route.meta.hideTab && this.footerShow
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
