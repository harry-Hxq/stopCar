<template>

    <div>
        <head-top></head-top>
        <flow>
            <flow-state title="选择基金" :is-done="activeStep>=0"></flow-state>
            <flow-line :is-done="activeStep>0" :line-span="40"></flow-line>

            <flow-state title="选择币种" :is-done="activeStep>=1"></flow-state>
            <flow-line :is-done="activeStep>1" :line-span="40"></flow-line>

            <flow-state title="填写认购金额" :is-done="activeStep>=2"></flow-state>

        </flow>
        <div>
            <div class="content">
                <div class="content-item" v-show="activeStep === 0">

                    <search
                            @result-click="resultClick"
                            @on-change="getResult"
                            :results="results"
                            v-model="value"
                            position="absolute"
                            top="146px"
                            @on-focus="onFocus"
                            @on-cancel="onCancel"
                            @on-submit="onSubmit"
                            ref="search"></search>


                    <group v-show="fund_base_info.fund_name_cn != undefined">
                        <cell :title="fund_base_info.fund_name_cn"></cell>
                        <cell-form-preview :list="[{label: '认购费率',value: fund_base_info.rate+'%'},{label: '最低认购额度('+mapping.currencyCnName[fund_base_info.currency]+')',value: fund_base_info.min_buy}]"></cell-form-preview>
                    </group>

                    <box gap="10px 10px">
                        <x-button type="primary" @click.native="next1" v-show="fund_base_info.fund_name_cn != undefined">下一步</x-button>
                    </box>

                </div>
                <div class="content-item" v-show="activeStep === 1">
                    <checker v-model="pur_currency" type="checkbox" default-item-class="checker-item" selected-item-class="checker-item-selected">
                        <checker-item v-for="(item,index) in cash_account"  :value="item.currency" :key="index"><i
                                class="md_flag" :class="item.currency"></i> {{mapping.currencyCnName[item.currency]}} <span class="currency-money">{{item.balance}}</span>
                        </checker-item>
                    </checker>
                    <box gap="10px 10px">
                        <x-button type="primary" @click.native="next2">下一步</x-button>
                    </box>
                </div>
                <div class="content-item" v-show="activeStep === 2">

                    <x-input :title="mapping.currencyCnName[item]" v-for="item in pur_currency" type="text" placeholder="请填写认购金额" v-model="covertObj[item]" text-align="right" ></x-input>
                    <box gap="10px 10px">
                        <x-button type="primary" @click.native="showTradePassword">完成</x-button>
                    </box>
                </div>

                
            </div>
        </div>

    </div>
</template>

<script>
    import {Flow, FlowState, FlowLine, PopupRadio,Search,CellFormPreview,Checker, CheckerItem} from 'vux'
    import {mapState, mapMutations, mapActions} from 'vuex'
    import validator from '../../plugins/validator'
    import mapping from '../../config/mapping'
    import {fundSearch,purchase,fundBaseInfo,cashAccount,openAccount, getCustomers} from '../../service/getData'


    export default {
        data () {
            return {
                mapping: mapping,
                activeStep: 0,

                fund_name_cn : '',
                fund_id : '',
                page : 1,
                limit : 20,
                results: [],
                value: '',
                uid : '',
                fund_base_info:{},
                pur_currency:[],
                cash_account : [],
                trade_password : '',
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


            }
        },
        components: {
            Flow, FlowState, FlowLine, PopupRadio,Search,CellFormPreview,Checker, CheckerItem
        },
        created() {

            // 判断是否是新开户
            if(this.$route.query.uid){
                var that = this;
                that.uid = that.$route.query.uid
                const reqJson = {
                    uid:that.uid
                }
                getCustomers(reqJson)
                    .then((data) => {
                        if(data.ret) {
                            if(data.res.data.is_opener === 3 || data.res.data.is_opener === 0){
                                this.$vux.alert.show({
                                    title:'提示',
                                    content: '此用户正在开户审核中',
                                    onHide () {
                                        that.$router.go(-1)
                                    }
                                })
                            }

                        }else {
                            this.$vux.alert.show({
                                title:'提示',
                                content: data.res.errorMsg,
                                onHide () {
                                    that.$router.go(-1)
                                }
                            })
                        }
                    })

            }

            this.GetCashAccount()
        },

        methods: {

            submit(){
                let reqJson = {
                    uid : this.uid,
                    matrice_id  : this.fund_base_info.matrice_id,
                    trade_password  : this.trade_password,
                }
                reqJson = Object.assign(reqJson,this.covertObj)
                console.log(reqJson);
                let that = this;
                return purchase(reqJson)
                    .then((data) => {
                        if(data.ret){
                            that.$vux.alert.show({
                                content: '提交审核中，三个工作日左右',
                                onHide () {
                                    that.$router.go(-1)
                                }
                            })
                        }else{
                            that.$vux.alert.show({
                                title: '提交失败',
                                content: data.res.errorMsg,
                            })
                        }
                    })
            },

            setFocus () {
                this.$refs.search.setFocus()
            },
            resultClick (item) {
                console.log(item.id)
                const reqJson = {
                    id : item.id,
                    uid : this.uid,
                }
                return fundBaseInfo(reqJson)
                    .then((data) => {
                         if(data.ret){
                            this.fund_base_info = data.res.data
                         }
                    })

            },
            getResult (val) {
                console.log('on-change', val)
                const reqJson = {
                    page : this.page,
                    limit : this.limit,
                    fund_name_cn : val,
                }
                let that =this;
                return fundSearch(reqJson)
                    .then((data) => {
                         if(data.ret){
                             that.results = []
                             that.list = data.res.data.list;
                             for (let i=0;i<that.list.length;i++){
                                 that.results.push({
                                     title: that.list[i].fund_name_cn,
                                     id: that.list[i].id
                                 })
                             }
                             console.log(11,that.results)
                         }
                    })

            },
            onSubmit () {
                this.$refs.search.setBlur()
                this.$vux.toast.show({
                    type: 'text',
                    position: 'top',
                    text: 'on submit'
                })
            },
            onFocus () {
                console.log('on focus')
            },
            onCancel () {
                console.log('on cancel')
            },

            //获取现金账户信息
            GetCashAccount(){
                const reqJson = {
                    uid : this.uid,
                    limit : 9,
                }
                cashAccount (reqJson)
                    .then((data => {
                        if(data.ret) {
                            this.cash_account = data.res.data
                        }
                    }))
            },

            next1(){
                this.activeStep++
            },
            next2(){
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
                        if(_this.trade_password){
                            _this.submit()
                        }
                        _this.$vux.alert.show({
                            title: '提示',
                            content: '请填写交易密码',
                        })
                        return
                    }
                })
            }


        }
    }
</script>

<style lang="scss">
    .open_idcard_wrap {
        display: inline-block;
        position: relative;
        border-radius: .1rem;
        text-align: center;
        box-sizing: border-box;
        overflow: hidden;
    }

    .upload_img {
        width: 17rem;
    }

    .md_file_input {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        font-size: 100px;
        opacity: 0;
        z-index: 5;
    }

    .upload_ico {
        display: block;
        position: absolute;
        left: 50%;
        top: 50%;
        width: 40px;
        height: 40px;
        margin: -20px 0 0 -20px;
        background-image: url('../../images/op_upload.png');
        background-size: 40px;
    }

    .op_sign_modal {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background:#fff;
        z-index: 3000;
    }
    .op_sign_modal .pad {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 30px;
    }
    .op_sign_modal .pad canvas {
        width: 100%;
        height: 100%;
    }
    .op_sign_modal .tool {
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        height: 30px;
        background:#242526;
    }
    .op_sign_img {
        padding: 0 15px;
    }
    .op_sign_img img {
        border-radius: 5px;
        background: #fff;
    }

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


