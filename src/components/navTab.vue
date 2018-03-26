<template>
    <footer>

        <tabbar v-if="isShow">
            <tabbar-item link="/explain" >
                <img slot="icon" src="../images/icon/explain.png">
                <img slot="icon-active"  src="../images/icon/explain_active.png">
                <span slot="label" >使用说明</span>
            </tabbar-item>
            <tabbar-item link="/routeList" >
                <img slot="icon" src="../images/icon/location.png">>
                <img slot="icon-active" src="../images/icon/location_active_gree.png">>
                <span slot="label" >交通管制</span>
            </tabbar-item>
            <tabbar-item link="uc" >
                <img slot="icon"  src="../images/icon/member.png">>
                <img slot="icon-active"  src="../images/icon/member_active_gree.png">>
                <span slot="label" >会员中心</span>
            </tabbar-item>
        </tabbar>
    </footer>
</template>



<script>
    import {Tabbar, TabbarItem} from 'vux'
    import {mapState, mapMutations, mapActions} from 'vuex'

    export default {
        // name: 'tabbar',
        data () {
            return {
                currentPath: ''



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
        activated(){
        },
        created() {

        },
        methods: {
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
 .active_label{
     color : #1066bf
 }


</style>
