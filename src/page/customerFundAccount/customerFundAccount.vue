<template>
    <div>
        <head-top></head-top>
        <card :header="{title: '我的总账户'}">
            <div slot="content" class="card-demo-flex card-demo-content01">
                <div class="vux-1px-r">
                    <span>{{totalAccount.total_usd|formatCurrency}}</span>
                    <br/>
                    美元
                </div>
                <div class="vux-1px-r">
                    <span>{{totalAccount.total_cny|formatCurrency}}</span>
                    <br/>
                    人民币
                </div>
                <div class="vux-1px-r">
                    <span>{{totalAccount.total_hkd|formatCurrency}}</span>
                    <br/>
                    港币
                </div>
            </div>
        </card>
        <group>
            <cell title="入金"  is-link  :link="{path:'/customerFundDeposit',query:{uid:this.uid}}"></cell>
            <cell title="提现"  is-link  :link="{path:'/customerFundWithdraw',query:{uid:this.uid}}"></cell>
            <cell title="银行卡"  is-link  :link="{path:'/customerFundBank',query:{uid:this.uid}}"></cell>
            <cell title="币种兑换"  is-link  :link="{path:'/customerFundExchange',query:{uid:this.uid}}"></cell>
        </group>


    </div>

</template>


<script>
    import {mapState, mapMutations, mapActions} from 'vuex'
    import {totalAccounts} from '../../service/getData'
    import {getStore, setStore, removeStore,formatCurrency} from '../../config/mUtils'
    import {Tab, TabItem, Sticky,Swiper, SwiperItem, Divider, Card } from 'vux'
    import Group from "../../../node_modules/vux/src/components/group/index";

    export default {
        data () {
            return {
                index : 0,
                fullpath : '',
                uid: '',
                totalAccount : {}

            }
        },
        components: {
            Tab, TabItem, Sticky,Swiper, SwiperItem, Divider, Card
        },

        activated(){
            this.uid = this.$route.query.uid
            if (this.fullpath === this.$route.fullPath || this.fullpath === '') {
                this.fullpath = this.$route.fullPath
                return
            }
            // 参数不同，重新请求数据
            this.fullpath = this.$route.fullPath
            this.getTotalAccounts()
        },

        created() {
            this.uid = this.$route.query.uid
            if(!this.uid){
            let that = this
            this.$vux.alert.show({
                    content: '系统错误',
                    onHide () {
                        that.$router.go(-1)
                    }
                })
            }
            this.getTotalAccounts()
        },

        mounted() {
            this.top = 1;
            this.bottom = 20
        },

        methods: {
            formatCurrency,
            getTotalAccounts(){
                const reqJson = {
                    uid: this.uid,
                }
                return totalAccounts(reqJson)
                    .then((data) => {
                        if (data.ret) {
                            this.totalAccount = data.res.data
                        } else {
                            this.$vux.alert.show({
                                title: '提示',
                                content: data.res.errorMsg,
                            })
                        }
                    })
            },
        }
    }
</script>

<style>
    .card-demo-flex {
        display: flex;
    }
    .card-demo-content01 {
        padding: 10px 0;
    }
    .card-padding {
        padding: 15px;
    }
    .card-demo-flex > div {
        flex: 1;
        text-align: center;
        font-size: 12px;
    }
    .card-demo-flex span {
        color: #f74c31;
    }
    .flex-demo {
        text-align: center;
        color: #fff;
        background-color: #20b907;
        border-radius: 4px;
        background-clip: padding-box;
    }
</style>
