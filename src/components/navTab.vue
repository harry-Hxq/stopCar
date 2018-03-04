<template>
  <footer>

  <tabbar v-if="isShow" :on-index-change="test()">
    <tabbar-item link="/becomeMember" >
      <img slot="icon" src="../images/icon/member.png">
      <img slot="icon-active" src="../images/icon/member_active.png">
      <span slot="label">成为会员</span>
    </tabbar-item>
    <tabbar-item link="/stopCar" >
      <img slot="icon" src="../images/icon/location.png">>
      <img slot="icon-active" src="../images/icon/location_active.png">>
      <span slot="label">停车位置</span>
    </tabbar-item>
    <tabbar-item link="uc" >
      <img slot="icon" src="../images/icon/ucenter.png">>
      <img slot="icon-active" src="../images/icon/ucenter_active.png">>
      <span slot="label">个人中心</span>
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
  },
    methods: {
        test(){
            console.log(111)
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
