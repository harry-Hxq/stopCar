<template>
    <div>
        <head-top></head-top>
        <group>
            <cell v-if="agentInfo.fund_asset_level === 3" title="ERP用户" link="/customerErp" is-link></cell>
            <cell title="基金用户" link="/customerFund" is-link></cell>
        </group>
    </div>
</template>


<script>
    import {mapState} from 'vuex'
    import {getStore} from '../../config/mUtils'
    export default {
        data () {
            return {

            }
        },
        components: {},
        created() {
            if(getStore('tpSessionId') && !this.agentInfo.phone) {
                App.getUserInfo();
            }
        },
        computed:{
            ...mapState([
                'agentInfo',
            ])
        },

        methods: {

        }
    }
</script>

<style>

</style>
