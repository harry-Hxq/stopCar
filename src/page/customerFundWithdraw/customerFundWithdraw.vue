<template>

    <div class="content">
        <head-top ref="headtop"></head-top>
        <div v-show="activeStep === 0">
            <divider>1 选择持有币种（多选）</divider>
            <checker v-model="from_currency" type="checkbox" default-item-class="checker-item"
                     selected-item-class="checker-item-selected">
                <checker-item v-for="item in cash_account" :key="item.currency" v-if="item.balance > 0" :value="item.currency"><i
                        class="md_flag" :class="item.currency"></i> {{mapping.currencyCnName[item.currency]}} <span class="currency-money">{{item.balance}}</span>
                </checker-item>
            </checker>
            <box gap="10px 10px">
                <x-button type="primary" action-type="button" @click.native="next1">下一步</x-button>
            </box>
        </div>

        <div  v-show="activeStep === 1" style="text-align: center">
            <divider>2 选择接受资金的账户（单选）</divider>
            <checker v-model="to_currency" type="radio" default-item-class="checker-item-radio"
                     selected-item-class="checker-item-selected-radio">
                <checker-item v-for="item in bank_list" :key="item.cash_type" :value="item.cash_type"><i
                        class="md_flag" :class="item.cash_type"></i><br> {{mapping.currencyCnName[item.cash_type]}}
                </checker-item>
            </checker>
            <box gap="10px 10px">
                <x-button type="primary" action-type="button" @click.native="next2">下一步</x-button>
            </box>
        </div>

        <div class="" v-show="activeStep === 2">
            <divider>3 填写提现金额</divider>

            <group>

                <x-input :title="mapping.currencyCnName[item]" placeholder="请输入提现金额" v-for="item in from_currency" type="text" v-model="covertObj[item]" text-align="right" ></x-input>
            </group>
            <box gap="10px 10px">
                <x-button type="primary" action-type="button" @click.native="showTradePassword">确认提现</x-button>
            </box>
        </div>
    </div>
</template>


<script>
    import mapping from '../../config/mapping'
    import {cashAccount,banks,withdraw} from '../../service/getData'
    import {Checker, CheckerItem, Divider,Step, StepItem } from 'vux'
    import Group from "../../../node_modules/vux/src/components/group/index";
    import validator from '../../plugins/validator'

    export default {
        data () {
            return {
                activeStep:0,
                mapping: mapping,
                from_currency: [],
                to_currency: '',
                predict:this.value_cny*1.5+this.value_sud*2.5,
                value_sud:0,
                value_cny:0,
                uid : '',
                cash_account : [],
                bank_list : '',
                fullpath : '',
                covertObj: {
                    USD: '',
                    EUR: '',
                    AUD: '',
                    HKD: '',
                    GBP: '',
                    CNY: '',
                    JPY: '',
                    SGD: '',
                    CHF: '',
                },  // 提现金额对象
                trade_password : ''
            }
        },
        components: {Checker, CheckerItem, Divider,Step, StepItem},
        activated(){
            if(this.fullpath === this.$route.fullPath || this.fullpath === '') {
                this.fullpath = this.$route.fullPath
                return
            }
            // 参数不同，重新请求数据
            this.uid = this.$route.query.uid
            this.fullpath = this.$route.fullPath
        },
        created() {
            this.uid = this.$route.query.uid
            this.GetCashAccount()
            this.GetBanks()
        },

        mounted() {
            this.$refs.headtop.rightUrl = '/customerFundWithdrawLog?uid='+this.uid
            this.$refs.headtop.rightTitle = '提现记录'
        },

        methods: {

            submit() {

                let reqJson = {
                    uid: this.uid,
                    covert_currency_to : this.to_currency,
                    trade_password  : this.trade_password ,
                }
                reqJson = Object.assign(reqJson,this.covertObj)
                console.log(reqJson);
                let that = this;
                withdraw(reqJson)
                    .then((data) => {
                        if(data.ret) {
                            that.$vux.alert.show({
                                content: '提交审核中，三个工作日左右',
                                onHide () {
                                    that.$router.go(-1)
                                }
                            })
                        }else {
                            that.$vux.alert.show({
                                title: '提交失败',
                                content: data.res.errorMsg,
                            })
                        }
                    })
            },

            next1(){
                if(this.from_currency.length < 1){
                    this.$vux.alert.show({
                        title: '提示',
                        content: '请选择要提现的金额',
                    })
                    return
                }
                this.activeStep++
            },
            next2(){
                if(!this.to_currency){
                    this.$vux.alert.show({
                        title: '提示',
                        content: '请选择银行账户',
                    })
                    return
                }
                this.activeStep++
            },

            //获取现金账户信息
            GetCashAccount(){
                const reqJson = {
                   uid : this.uid,
                   limit : 9,
                }
                let that = this;
                cashAccount (reqJson)
                    .then((data => {
                        if(data.ret) {
                            this.cash_account = data.res.data

                            //判断账户余额是否为零，
                            let account_total = 0;
                            let account_len = this.cash_account.length;
                            for (let i=0 ; i < account_len; i++){
                                if(this.cash_account[i].balance > 0){
                                    account_total = 1;
                                }
                            }
                            console.log(account_total)
                            if(account_total === 0){
                                that.$vux.alert.show({
                                    content: '您的账户余额不足，请先入金',
                                    onHide () {
                                        that.$router.replace('/customerFundDeposit?uid='+that.uid)
                                    }
                                })
                            }

                        }
                    }))
            },
            //获取银行卡信息
            GetBanks(){
               const reqJson = {
                   uid : this.uid,
                   limit : 9,
               }
                banks (reqJson)
                    .then((data => {
                        if(data.ret) {
                            this.bank_list = data.res.data.list
                        }
                    }))
            },
            // 下一步
            next(){
                this.activeStep++
            },

            //输入交易密码
            showTradePassword () {
                const _this = this
                _this.trade_password = '';
                this.$vux.confirm.prompt('', {
                    title: '交易密码',
                    inputAttrs : {
                        type:'password',
                        style:"text-align:center",
                        maxlength:6,
                    },
                    onShow () {
                        console.log('promt show')
//                        _this.$vux.confirm.setInputValue('set input value')
                    },
                    onHide () {
                        console.log('prompt hide')
                    },
                    onCancel () {
                        console.log('prompt cancel')
                    },
                    onConfirm (msg) {
                        _this.trade_password = msg;
                        _this.submit()
                    }
                })
            }


        }
    }
</script>

<style lang="scss">
    .content{
        padding: 10px;
    }
    .checkbox-content {

    }
    .currency-money{
        float: right;
        margin-right: 10px;
        margin-top: 8px;
        font-size: 1.5rem;
    }
    .checker-item {
        width: 100%;
        height: 40px;
        line-height: 26px;
        border-radius: 4px;
        border: 1px solid #ccc;
        background-color: #fff;
        margin-right: 6px;
        margin-top: 6px;
    }

    .checker-item-selected {
        background: #ffffff url('../../images/active.png') no-repeat right bottom;
        border-color: #ff4a00;
    }
    .checker-item-radio {
        width: 30%;
        height: 69px;
        line-height: 34px;
        border-radius: 4px;
        border: 1px solid #ccc;
        background-color: #fff;
        margin-right: 6px;
        margin-top: 6px;
    }

    .checker-item-selected-radio {
        background: #ffffff url('../../images/active.png') no-repeat right bottom;
        border-color: #ff4a00;
    }

    // 币种国旗
    // -------------------------
    $menuList: 'USD' 'HKD' 'CNY' 'AUD' 'JPY' 'GBP' 'EUR' 'SGD' 'CHF';
    .md_flag {
        display: inline-block;
        width: 2rem;
        height: 2rem;
        vertical-align: middle;
        margin-left: 6px;
        @each $var in $menuList {
            &.#{$var} {
                background: url('../../images/flag/#{$var}.png') 0 0 no-repeat;
                background-size: cover;
                margin-top: 5px;
            }
        }
    }


</style>
