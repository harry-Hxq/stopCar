<template>
    <div>
        <head-top></head-top>


            <card :header="{title: '持仓总值'}">
                <div slot="content" class="card-demo-flex card-demo-content01">
                    <div class="vux-1px-r">
                        <span>{{total_current_amount}}</span>
                        <br/>
                        港币
                    </div>
                    <div class="vux-1px-r">
                        <span :class="total_profit_percent|getValClass">{{total_profit}} ({{total_profit_percent}}%)</span>
                        <br/>
                        累计盈亏
                    </div>

                </div>
            </card>

            <group  v-for="item in list">
                <cell :title=item.fund_name_cn></cell>
                <cell-form-preview :list="[
                    {label: '持有单位数量',value: item.hold_num},
                    {label: '加权平均成本('+mapping.currency[item.currency]+')',value: item.weighted_average},
                    {label: '当前价格('+mapping.currency[item.currency]+')',value: item.latest_nav},
                    {label: '初始投资金额(港币)',value: item.investment_account},
                    {label: '当前持有总值(港币)',value: item.total_value},
                    {label: '损益金额(港币)',value: item.profit},
                    {label: '损益比例(%)',value: item.profit_percent},
                    ]
                ">

                </cell-form-preview>

            </group>


    </div>

</template>


<script>
    import mapping from '../../config/mapping'
    import {fundAccounts} from '../../service/getData'
    import {CellFormPreview,Divider, Card } from 'vux'

    export default {
        data () {
            return {
                mapping : mapping,
                total_profit_percent : '',
                total_profit : '',
                total_current_amount : '',
                uid : '',
                list : [],
                page: 1,
                limit: 10,
                fullpath : ''

            }
        },
        components: {
            CellFormPreview,Divider, Card
        },
        activated(){
            this.uid = this.$route.query.uid
            if (this.fullpath === this.$route.fullPath || this.fullpath === '') {
                this.fullpath = this.$route.fullPath
                return
            }
            // 参数不同，重新请求数据
            this.fullpath = this.$route.fullPath
            this.getList()
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
            this.getList()
        },

        mounted() {
//            this.getList();
            this.top = 1;
            this.bottom = 20
        },

        methods: {
            getList(){
                const reqJson = {
                    uid: this.uid,
                    page: this.page,
                    limit: this.limit,
                }
                return fundAccounts(reqJson)
                    .then((data) => {
                        if (data.ret) {
                            this.total_profit_percent = data.res.data.total_profit_percent
                            this.total_profit = data.res.data.total_profit
                            this.total_current_amount = data.res.data.total_current_amount
                            this.list = data.res.data.list
                            this.page++;
                            if (data.res.data.list.length < this.limit) {
//                                done(true)
                            }
                        } else {
                            this.$vux.alert.show({
                                title: '提示',
                                content: data.res.errorMsg,
                            })
                        }
                    })
            },

            refresh(done) {
                setTimeout(() => {
                    this.page = 1;
                    this.list = [];
                    this.getList();
                    this.top = this.top - 10;
                    done()
                }, 1500)
            },
            infinite(done) {
                console.log(1)
                if (this.bottom >= 30) {
                    setTimeout(() => {
                        done(true)
                    }, 1500)
                    return;
                }
                setTimeout(() => {
                    this.getList();
                    this.bottom = this.bottom + 10;
                    setTimeout(() => {
                        done()
                    })
                }, 1500)
            }
        }
    }
</script>

<style>
    td {
        vertical-align: middle;
    }

    .card-demo-flex {
        display: flex;
    }
    .card-demo-content01 {
        padding: 10px 0;
    }

    .card-demo-flex > div {
        flex: 1;
        text-align: center;
        font-size: 12px;
    }
    .card-demo-flex span {
        color: #f74c31;
    }

</style>
