<template>
    <div>
        <head-top ref="headtop"></head-top>

        <divider>申明</divider>
        <div slot="content" class="card-padding">
            <p style="font-size:14px;line-height:1.5;">&nbsp;&nbsp;&nbsp;会员的费用为118元，成为后本司一年内需提供大于20次的交警正在贴罚单的通知。若小于20次，则按每次0.5元算，余额可直接点击退款。</p>
        </div>

    </div>
</template>


<script>
    import {mapState} from 'vuex'
    import { Divider, Card } from 'vux'
    import {getStore} from '../../config/mUtils'

    export default {
        data () {
            return {
                logged: '',
            }
        },
        components: { Divider, Card},
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
