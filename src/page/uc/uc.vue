<template>
    <div>
        <head-top ref="headtop"></head-top>
        <div class="vux-demo">
            <img class="logo" src="../../images/liecheng_logo.png">
            <h3>昵称</h3>
        </div>

        <group>
            <cell title="我的车牌"  value="闽F52545B" ></cell>
            <cell title="账户信息"  link="/account" is-link></cell>
            <cell title="手机号码"  link="/setRate" is-link></cell>
        </group>

        <group>
            <cell title="停车记录"  link="/stopRecord" is-link ></cell>
        </group>
        <group>
            <cell title="帮助中心"  link="/help" is-link ></cell>
        </group>
        <group>
            <cell title="联系客服"  link="/contact" is-link ></cell>
        </group>

    </div>
</template>


<script>
    import {mapState} from 'vuex'
    import {getStore} from '../../config/mUtils'

    export default {
        data () {
            return {
                logged: '',
            }
        },
        components: {},
        computed: {
            ...mapState([
                'agentInfo',
            ]),
        },
        created() {
            if(getStore('tpSessionId') && !this.agentInfo.phone) {
                App.getUserInfo();
            }
        },
        activated(){
            this.logged = getStore('tpSessionId')
        },
        mounted() {
//            this.$refs.headtop.rightUrl = 'https://fund.liechengcf.com/login?phone='+this.agentInfo.phone
//            this.$refs.headtop.loginFund = true
        },
        methods: {
            logout() {
                App.LOGOUT()
                this.logged = false
            },
        }
    }
</script>

<style>
    .vux-demo {
        text-align: center;
    }

    .logo {
        width: 100px;
        height: 100px
    }
</style>
