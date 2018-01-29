<template>
    <div>
        <head-top ref="headtop"></head-top>

        <group v-for="item in list">
            <cell title="车牌" :value="item.car_num" ></cell>
            <cell-form-preview :list="[
                    {label: '停车位置',value: item.location},
                    {label: '时间',value: formatTime(item.create_time)}
                    ]">
            </cell-form-preview>
        </group>

    </div>
</template>


<script>
    import {mapState} from 'vuex'
    import {formatDate,formatTime,getStore} from '../../config/mUtils'
    import {XTable, LoadMore,CellFormPreview, Checker, CheckerItem,ButtonTab, ButtonTabItem, TransferDom, Popup} from 'vux'

    export default {
        data () {
            return {
                list: [
                    {
                        'car_num' : '闽F5525B',
                        'create_time' : 1517196378,
                        'location' : '龙岩市，登高西路，某某街道34号门口',
                    },{
                        'car_num' : '闽F5525B',
                        'create_time' : 1517196378,
                        'location' : '龙岩市，登高西路，某某街道34号门口',
                    },{
                        'car_num' : '闽F5525B',
                        'create_time' : 1517196378,
                        'location' : '龙岩市，登高西路，某某街道34号门口',
                    }
                ],
            }
        },
        components: {XTable, LoadMore,CellFormPreview, Checker, CheckerItem,ButtonTab, ButtonTabItem, TransferDom, Popup},
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
            formatTime,
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
