<template>
    <div>
        <head-top ref="headtop"></head-top>

        <!--<h1>会员福利</h1>-->

        <div class="memberContent1">
            <ul>
                <li>停车无忧会员的年服务费用为118一年。（付费当日开始计时，年周期为365天）</li>
                <li>车主在停车期间若无交警贴罚单，则不提醒、不计数、也不收费，但是又实时看护车主可安心停放 。</li>
                <li>无限使用无忧停车次数，系统只按提醒次数计费。</li>
                <li>若一年内提醒次数少于50次，则每次按2元收费，剩余费用可直接点击退款。超过50次则年费抵除，不再另收费。</li>
                <li>费用的结算周期为365天。</li>
            </ul>
        </div>


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
    .memberContent1 ul{
        list-style: square url(../../images/icon/right.png);
    }
    .memberContent1 ul li{
        margin-left: 29px;
        margin-top: 11px;
        font-size: 1.01rem;
    }
</style>
