<template>
    <div>
        <head-top ref="headtop"></head-top>

        <divider>收费标准</divider>
        <div slot="content" class="card-padding">
            <p style="font-size:14px;line-height:1.5;">会员年费为118元一年，低于50次提醒按2元一次收费，没有提醒不收费。在停车期间若无交警贴罚单，不提醒，也不收费，无限使用次数，我们主要是按提醒次数来收费</p>
        </div>
        <box gap="10px 10px">
            <x-button type="primary" @click.native="showTradePassword">成为会员</x-button>
        </box>
        <nav-tab></nav-tab>

    </div>
</template>


<script>
    import {mapState} from 'vuex'
    import { Divider, Card } from 'vux'
    import {getStore} from '../../config/mUtils'
    import navTab from '../../components/navTab'

    export default {
        data () {
            return {
                logged: '',
            }
        },
        components: { Divider, Card,navTab},
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

</style>
