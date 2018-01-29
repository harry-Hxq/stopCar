<template>
    <div>
        <head-top></head-top>
        <div class="vux-demo">
            <img class="logo" src="../../images/liecheng_logo.png">
            <h1>猎诚ERP</h1>
        </div>
        <group>
            <cell v-if="agentInfo.fund_asset_level === 3" title="ERP开户" link="/openErp" is-link></cell>
            <cell title="基金开户" link="/openFund" is-link></cell>
            <cell title="我的业绩" link="/performance" is-link></cell>
        </group>
    </div>
</template>


<script>
    import {mapState} from 'vuex'
    import {getStore} from '../../config/mUtils'
    export default {
        data () {
            return {
                agents: {}
            }
        },
        components: {},
        created() {
            if(getStore('tpSessionId') && !this.agentInfo.phone) {
                App.getUserInfo();
            }
            console.log(this.agentInfo.phone)

        },

        computed:{
            ...mapState([
                'agentInfo',
            ])
        },
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
