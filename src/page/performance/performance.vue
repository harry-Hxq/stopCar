<template>
    <div>
        <head-top></head-top>
        <card :header="{title: '我的总业绩'}">
            <div slot="content" class="card-demo-flex card-demo-content01">
                <div class="vux-1px-r">
                    <span>{{total_list.open_num}} 人</span>
                    <br/>
                    开户总数
                </div>
                <div class="vux-1px-r">
                    <span>{{total_list.deposit_num}} 人</span>
                    <br/>
                    入金总数
                </div>
            </div>
            <div slot="content" class="card-demo-flex card-demo-content01">

                <div class="vux-1px-r">
                    <span>{{total_list.deal_num}} 人</span>
                    <br/>
                    成交客户总数
                </div>
                <div class="vux-1px-r">
                    <span>{{total_list.deal_total}} 人民币</span>
                    <br/>
                    成交总额
                </div>
            </div>
        </card>
        <card :header="{title: '今日业绩'}">
            <div slot="content" class="card-demo-flex card-demo-content01">
                <div class="vux-1px-r">
                    <span>{{today_list.today_register_num}} 人</span>
                    <br/>
                    注册
                </div>
                <div class="vux-1px-r">
                    <span>{{today_list.today_submit_open_num}} 人</span>
                    <br/>
                    提交开户
                </div>
                <div class="vux-1px-r">
                    <span>{{today_list.today_success_open_num}} 人</span>
                    <br/>
                    开户成功
                </div>
            </div>
            <div slot="content" class="card-demo-flex card-demo-content01">

                <div class="vux-1px-r">
                    <span>{{today_list.today_submit_deposit_num}} 人</span>
                    <br/>
                    提交入金
                </div>
                <div class="vux-1px-r">
                    <span>{{today_list.today_submit_purchase_num}} 人</span>
                    <br/>
                    提交认购
                </div>
                <div class="vux-1px-r">
                    <span>{{today_list.today_submit_purchase_total}} 人民币</span>
                    <br/>
                    认购总额
                </div>
            </div>
        </card>



    </div>

</template>


<script>
    import {mapState, mapMutations, mapActions} from 'vuex'
    import {GetPerformanceData} from '../../service/getData'
    import {getStore, setStore, removeStore} from '../../config/mUtils'
    import {Tab, TabItem, Sticky,Swiper, SwiperItem, Divider, Card } from 'vux'
    import Group from "../../../node_modules/vux/src/components/group/index";

    export default {
        data () {
            return {
                index : 0,
                fullpath : '',
                uid: '',
                totalAccount : {},
                today_list : {},
                total_list : {}

            }
        },
        components: {
            Tab, TabItem, Sticky,Swiper, SwiperItem, Divider, Card
        },

        created() {
            this.GetPerformanceData()
        },

        mounted() {
            this.top = 1;
            this.bottom = 20
        },

        methods: {
            GetPerformanceData(){

                return GetPerformanceData()
                    .then((data) => {
                        if (data.ret) {
                            this.today_list = data.res.data.today_list
                            this.total_list = data.res.data.total_list
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
